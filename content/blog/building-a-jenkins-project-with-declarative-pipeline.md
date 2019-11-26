# Building a Jenkins project with a declarative Jenkinsfile

I've used Jenkins for a while with the UI-based configuration, but checking
things into source control and having them versioned is something that really
appeals to me. To that end, I decided to check out declarative pipelines in the
form of a Jenkinsfile.


## So what's a Jenkinsfile?

Well, according to [the
docs](https://jenkins.io/doc/book/pipeline/jenkinsfile/), a jenkinsfile is "a
text file that contains the definition of a Jenkins Pipeline". So, it's a text
file that contains all those steps we'd previously do in the Jenkins UI - test,
build, deploy - that sort of thing.

The docs also mention that there are two forms of Jenkinsfile currently supported:
[declarative and scripted](https://jenkins.io/doc/book/pipeline/syntax/). I'll
be using declarative, as it seems to be more suited to a simple continuous
delivery project like this one. Also, most example code I've seen is in this
style, so if I need to look something up or need a reference implementation of
a plugin, I'll likely have a better time.


## Setting up in Jenkins

 To keep things simple, I decided to go with a static site
deploying via the [SSH Publisher Jenkins plugin](https://plugins.jenkins.io/publish-over-ssh). If you're following along, you'll need to have a named config already set up.

First, we'll need to create the project in Jenkins so we can see the effects of
our Jenkinsfile. This is the same as a UI based project, except that you
choose pipeline for the type after you've given the project a name.

!["Jenkins > New Item"](/images/blog-images/create-item.png)
*Jenkins > New Item*

Once that's done, we're presented with the configure page for the job. If you
want to configure webhooks or SCM polling, you could do that now. Otherwise
you'll be able to configure it later or just manually build. I'm just going to
skip down to the "Pipeline" section:

!["Jenkins > New Item > Configure#Pipeline"](/images/blog-images/pipeline-config.png)
*Jenkins > New Item > Configure#Pipeline*

Here, we'll add the SCM details - repository, any credentials we need, which
branches to build and so on. The important thing here is that your "Script Path"
points to your Jenkinsfile relative to the project root - for example, my git
repository for this project has a Jenkinsfile at it's root, so that path is just
"Jenkinsfile" for me - which is the default. You can also enter your pipeline
script directly here, but since that forgoes the benefits of checking the file
into SCM, I don't expect to use that feature very often.

Anyway, now that's entered there's not much else to do on the Jenkins side but
hit save and go to the project page.

!["Freshly created project page"](/images/blog-images/project-created.png)
*Freshly created project page*


## The Jenkinsfile

Now we've got our project set up in Jenkins, it's time to add our Jenkinsfile.
In the example config above, I set my Jenkinsfile to be in the root of the
project, called Jenkinsfile - so we'll open up that file and get started.

From the [pipeline syntax
docs](https://jenkins.io/doc/book/pipeline/syntax/#declarative-sections) and
[examples](https://jenkins.io/doc/pipeline/tour/hello-world/), we can see that
a declarative Jenkinsfile can take the following form:

```groovy
pipeline {
    agent { 
      docker { 
        image 'node:6.3' 
      } 
    }
    stages {
        stage('build') {
            steps {
                sh 'npm --version'
            }
        }
    }
}
```

* An outer pipeline block
* The agent with which we'll execute our pipeline
* A stage block, containing named stages 
* Steps inside the stages, which are the "things to do"

The outer pipeline block is simply a required wrapping block according to the
docs, so not much to note there. Maybe this will be important for some advanced
usage in the future?


## Agents

The agent used in the examples is the docker agent, which comes with a little
bit of set up overhead if you manage your own Jenkins instance in a docker
container. There are [other agent options](https://jenkins.io/doc/book/pipeline/syntax/#agent), 
[blueocean](https://hub.docker.com/r/jenkins/blueocean) apparently works well,
you could use docker-in-docker, or you could use [my
docker image](https://hub.docker.com/repository/docker/leakypixel/jenkins-docker) which also
contains docker and adds the jenkins user to the docker group on the host
machine if you use the example docker-compose entry.

If you're using the docker agent like me, you'll need to ensure everything you
require to build the git project exists in the image you specify. For example,
if you have npm packages installed from github, you'll need to have git in the
container image even though it's installed already on the host because our
_commands in the stage section are run on the agent_ (in this case, a docker
container). The git project I'm building here requires exactly that: git to
build, so my agent section looks like this: 

```groovy
agent {
  docker {
    image 'leakypixel/node-alpine-git'
  }
}
```

You can also [use a dockerfile as your
agent](https://jenkins.io/doc/book/pipeline/docker/#dockerfile), but that's not
something I want to do here because I'm using docker hub's repository links
feature to rebuild my container when the base image updates. If the
build fails because of an upstream change, my last good image will remain and my
builds will not fail. If I use a dockerfile directly here and upstream changes
break my dockerfile, it also breaks my build when that dockerfile fails to get
built.


## Stages

The stage block is where the action happens - we define named stages ("build"
in the example) and add steps - actions to perform. In the example, the build
stage consists of one step, which uses the `sh` or shell module to execute `npm
--version`. In my pipeline, I have three stages with a single step each:

```groovy
stages {
  stage('NPM install') {
    steps {
      sh 'npm install'
    }
  }
  stage('Build') {
    steps {
      sh 'npm run build'
    }
  }
  stage('SSH transfer') {
    steps {
      sshPublisher(
        continueOnError: false, 
        failOnError: true,
          publishers: [
            sshPublisherDesc(
              configName: "your sshPublisher named config",
              verbose: true,
              transfers: [
                sshTransfer(
                  cleanRemote: true,
                  remoteDirectory: "ti-extensions",
                  sourceFiles: "output/",
                  removePrefix: "output/"
                )
              ])
          ]
      )
    }
  }
}
```

The first step simply runs `npm install` inside the container, pulling down all
the project's dependencies. Once that's done, the build stage starts - inside
the same container. I chose to have a build task here since that's fairly common
to projects I've worked on, but any shell commands supported inside the
container will work, and there's [plenty of plugins](https://plugins.jenkins.io/)
to choose from if you need anything extra.

Finally, I have the SSH transfer stage. This uses the sshPublisher plugin as
mentioned earlier to push the files from the `sourceFiles` directory to the
`remoteDirectory` on the remote as configured in the named config, cleaning out
the remote directory and removing the "output/" prefix on pushed files. You can read
about the supported options for this step [here](https://jenkins.io/doc/pipeline/steps/publish-over-ssh/).


## Building

And that's all there is to it - when you hit "build now" in Jenkins, your
project should pull, run the pipeline as defined in your Jenkinsfile and report
a success!

!["Pipeline finished!"](/images/blog-images/pipeline-finished.png)
*Pipeline finished!*

