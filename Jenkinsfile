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
        sh "cp ./kubernetes.yml /var/lib/jenkins/kubernetes/qsapi/kubernetes.yml"
        sh "cd /var/lib/jenkins/kubernetes/qsapi/; /usr/local/bin/kubectl apply -f ."
        sh "/usr/local/bin/kubectl rollout restart deployment/qsapi-deployment -n default"
      }
    }
  }
}
