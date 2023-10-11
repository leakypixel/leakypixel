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
                  sourceFiles: "index.html",
                )
              ])
          ]
        )
      }
    }
  } 
}
