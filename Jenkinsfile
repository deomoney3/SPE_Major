pipeline {
    agent any
    tools {
        maven 'Maven'
    }
    environment {
        frontendRepositoryName = "deomoney721/gradeus-frontend"
        backendRepositoryName = "deomoney721/gradeus-backend"
        tag = "latest"
        frontendImage = ""
        backendImage = ""
    }
    stages {
        stage('Fetch code from github') {
            steps {
                git branch: 'main',
                url: 'https://github.com/deomoney3/SPE_Major/',
                credentialsId: 'gradeus-cred'
            }
        }
        stage('Maven Building') {
            steps {
                script{
                    //sh 'mvn -f gradeus-backend clean install'
                    sh 'echo true'
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
                //  script{
                //         docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials') {
                //         backendImage.push()
                //     }
                sh 'echo true'
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
                // script{
                //     // By default, the registry will be dockerhub
                //     docker.withRegistry('https://index.docker.io/v1/', 'docker-hub-credentials'){
                //         frontendImage.push()
                //     }
                sh 'echo true'
            }
        }
        
        stage('Ansible Deployment') {
             steps {
                sh '''
                    echo "1234" > vault_pass.txt
                    sudo -u deomani /usr/bin/ansible-playbook -i ./inventory ./deploy-playbook.yml --vault-password-file vault_pass.txt
                    rm -f vault_pass.txt
                '''
            }
        }
        stage('Deploying logstash and filebeats inside the kubernetes cluster') {
            steps {
                // Use Minikube kubeconfig automatically if it's available locally
                sh '''
                    kubectl config use-context minikube
                    helm upgrade --install filebeat kubeDeploy/filebeat
                    helm upgrade --install logstash kubeDeploy/logstash
                '''
            }
        }

        stage('Adding secrets and config maps to kubernetes cluster') {
            steps {
                sh '''
                    kubectl config use-context minikube
                    kubectl apply -f kubeDeploy/mysql-root-credentials.yml
                    kubectl apply -f kubeDeploy/mysql-credentials.yml
                    kubectl apply -f kubeDeploy/mysql-configmap.yml
                '''
            }
        }

        stage('Deleting older application deployment') {
            steps {
                sh '''
                    kubectl config use-context minikube
                    kubectl delete -f kubeDeploy/mysql-deployment.yml --ignore-not-found=true
                    kubectl delete -f kubeDeploy/backend-deployment.yml --ignore-not-found=true
                    kubectl delete -f kubeDeploy/frontend-deployment.yml --ignore-not-found=true
                '''
            }
        }

        stage('Deploying application to kubernetes cluster') {
            steps {
                sh '''
                    kubectl config use-context minikube
                    kubectl apply -f kubeDeploy/mysql-service.yml
                    kubectl apply -f kubeDeploy/mysql-pvc.yml
                    kubectl apply -f kubeDeploy/mysql-deployment.yml
                    kubectl apply -f kubeDeploy/backend-service.yml
                    kubectl apply -f kubeDeploy/backend-deployment.yml
                    kubectl apply -f kubeDeploy/frontend-service.yml
                    kubectl apply -f kubeDeploy/frontend-deployment.yml
                '''
            }
        }
    }
}
