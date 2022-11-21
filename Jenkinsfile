pipeline {
  environment {
    dockerimagename = "mvdijk01/quantifiedstudent"
  }

  agent any

  stages {
    stage('Build Image') {
      steps {
        script {
          dockerImage = docker.build dockerimagename
        }
      }
    }

    stage('Pushing Image') {
      environment {
        registryCredential = 'dockerhubqs'
      }
      steps {
          script {
            docker.withRegistry('https://registry.hub.docker.com', registryCredential) {
              dockerImage.push("latest")
            }
          }
      }
    }

    stage('Deploy to Kubernetes Cluster') {
      steps {
        sh "/usr/local/bin/kubectl rollout restart deployment/qsapi-deployment"
      }
    }
  }
}
