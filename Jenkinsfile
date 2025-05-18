pipeline {
    agent any
    tools {
        maven 'Maven'
    }
    environment {
        frontendRepositoryName = "deomani/gradeus-frontend"
        backendRepositoryName = "deomani/gradeus-backend"
        tag = "latest"
        frontendImage = ""
        backendImage = ""
    }
    stages {
        stage('Fetch code from github') {
            steps {
                git branch: 'master',
                url: 'https://github.com/deomani/gradeUs',
                credentialsId: 'gradeus-cred'
            }
        }
        stage('Maven Building') {
            steps {
                script{
                    sh 'mvn -f gradeus-backend clean install'
                }
            }
        }
        stage('Docker image creation for backend') {
            steps {
                script{
                    backendImage = docker.build(backendRepositoryName + ":" + tag, "./gradeus-backend")
                }
            }
        }
        stage('Dockerhub backend image push') {
            steps {
                script{
                    // By default, the registry will be dockerhub
                    docker.withRegistry('', 'dockerhub-credentials'){
                        backendImage.push()
                    }
                }
            }
        }
        stage('Docker image creation for frontend') {
            steps {
                script{
                    frontendImage = docker.build(frontendRepositoryName + ":" + tag, "./gradeus-frontend")
                }
            }
        }
        stage('Dockerhub frontend image push') {
            steps {
                script{
                    // By default, the registry will be dockerhub
                    docker.withRegistry('', 'dockerhub-credentials'){
                        frontendImage.push()
                    }
                }
            }
        }
        
        stage('Ansible Deployment') {
            steps {
              ansiblePlaybook installation: 'Ansible', playbook: 'deploy-playbook.yml'
            }
        }

        stage('Deploying logstash and filebeats inside the kubernetes cluster') {
            steps {
                withKubeConfig([credentialsId: 'aksConfig', serverUrl: 'https://gradeus-dns-9q6us9tx.hcp.eastus.azmk8s.io']) {
                    sh 'helm upgrade --install filebeat kubeDeploy/filebeat'
                    sh 'helm upgrade --install logstash kubeDeploy/logstash'
                }
            }
        }

        stage('Adding secrets and config maps to kubernetes cluster') {
            steps {
                withKubeConfig([credentialsId: 'aksConfig', serverUrl: 'https://gradeus-dns-9q6us9tx.hcp.eastus.azmk8s.io']) {
                    sh 'kubectl apply -f kubeDeploy/mysql-root-credentials.yml'
                    sh 'kubectl apply -f kubeDeploy/mysql-credentials.yml'
                    sh 'kubectl apply -f kubeDeploy/mysql-configmap.yml'
                }
            }
        }

        stage('Deleting older application deployment') {
            steps {
                withKubeConfig([credentialsId: 'aksConfig', serverUrl: 'https://gradeus-dns-9q6us9tx.hcp.eastus.azmk8s.io']) {
                    sh 'kubectl delete -f kubeDeploy/mysql-deployment.yml --ignore-not-found=true'
                    sh 'kubectl delete -f kubeDeploy/backend-deployment.yml --ignore-not-found=true'
                    sh 'kubectl delete -f kubeDeploy/frontend-deployment.yml --ignore-not-found=true'
                }
            }
        }

        stage('Deploying application to kubernetes cluster') {
            steps {
                withKubeConfig([credentialsId: 'aksConfig', serverUrl: 'https://gradeus-dns-9q6us9tx.hcp.eastus.azmk8s.io']) {
                    sh 'kubectl apply -f kubeDeploy/mysql-service.yml'
                    sh 'kubectl apply -f kubeDeploy/mysql-pvc.yml'
                    sh 'kubectl apply -f kubeDeploy/mysql-deployment.yml'
                    sh 'kubectl apply -f kubeDeploy/backend-service.yml'
                    sh 'kubectl apply -f kubeDeploy/backend-deployment.yml'
                    sh 'kubectl apply -f kubeDeploy/frontend-service.yml'
                    sh 'kubectl apply -f kubeDeploy/frontend-deployment.yml'
                }
            }
        }
    }
}
