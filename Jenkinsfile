def remote = [:]
remote.name = "thule"
remote.host = "leakypixel.net"
remote.allowAnyHosts = true
remote.fileTransfer = "scp"
pipeline {
  agent {
    docker {
      image 'leakypixel/node-alpine-git'
    }
  }
  environment {
    CI = 'true'
  }
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
          continueOnError: false, failOnError: true,
          publishers: [
            sshPublisherDesc(
              configName: "leakypixel.net",
              verbose: true,
              transfers: [
                sshTransfer(
                  cleanRemote: true,
                  sourceFiles: "output/",
                  removePrefix: "output/"
                )
              ])
          ]
        )
      }
    }
  } 
}
