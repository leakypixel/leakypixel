def remote = [:]
remote.name = "thule"
remote.host = "leakypixel.net"
remote.allowAnyHosts = true

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
    stage("Deploy") {
      environment {
        SERVICE_CREDS = credentials('thule-deploy-ssh-key')
      }
      steps {
        script {
          stage("Push over ssh") {
            withCredentials([sshUserPrivateKey(
              credentialsId: 'thule-deploy-ssh-key',
              keyFileVariable: 'identity',
              passphraseVariable: 'passphrase',
              usernameVariable: 'userName')]) {
                  remote.user = userName
                  remote.passphrase = passphrase
                  remote.identityFile = "${SERVICE_CREDS}"
                  sshPut remote: remote, from: './output/', into: './sites/leakypixel.net'
            }
          }
        }
      }
    }
  }  
}

