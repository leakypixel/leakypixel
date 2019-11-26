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
              configName: "thule static",
              verbose: true,
              transfers: [
                sshTransfer(
                  cleanRemote: true,
                  remoteDirectory: "leakypixel.net",
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
