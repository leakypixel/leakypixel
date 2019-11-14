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
        stage('Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}

