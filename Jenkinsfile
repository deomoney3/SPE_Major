pipeline {
    agent any
    
    stages {
        stage('Detect Changed Folders') {
            steps {
                script {
                    def commits = sh(script: "git rev-list HEAD --count", returnStdout: true).trim().toInteger()

                    if (commits < 2) {
                        echo "First commit detected. Triggering all jobs."
                        build job: 'gradeus-backend'
                        build job: 'gradeus-frontend'
                        return
                    }

                    def changeLog = sh(script: "git diff --name-only HEAD~1 HEAD", returnStdout: true).trim().split("\n")
                    def backendChanged = changeLog.any { it.startsWith("gradeus-backend/") || it.startsWith("kubeDeploy/backend-deployment.yml") || it.startsWith("kubeDeploy/backend-service.yml") || it.startsWith("gradeus-backend/backend-jenkinsfile")}
                    def frontendChanged = changeLog.any { it.startsWith("gradeus-frontend/") || it.startsWith("kubeDeploy/frontend-deployment.yml") || it.startsWith("kubeDeploy/frontend-service.yml") || it.startsWith("gradeus-frontend/frontend-jenkinsfile")}

                    echo "Changed files:\n${changeLog.join('\n')}"
                    echo "Backend changed: ${backendChanged}"
                    echo "Frontend changed: ${frontendChanged}"

                    if (backendChanged) {
                        build job: 'gradeus-backend'
                    }
                    if (frontendChanged) {
                        build job: 'gradeus-frontend'
                    }


                    if (!backendChanged && !frontendChanged) {
                        echo "No relevant changes found. Skipping downstream builds."
                    }
                }
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
        stage('Deploying Prometheus and Grafana') {
            steps {
                script {
                    // Make sure these paths match your repo structure
                    def prometheusFiles = [
                        'kubeDeploy/monitoring/prometheus/prometheus-config.yml',
                        'kubeDeploy/monitoring/prometheus/prometheus-deploy.yml',
                        'kubeDeploy/monitoring/prometheus/prometheus-rbac.yml'
                    ]

                    def grafanaFiles = [
                        'kubeDeploy/monitoring/grafana/grafana-config.yml',
                        'kubeDeploy/monitoring/grafana/grafana-pvc.yml',
                        'kubeDeploy/monitoring/grafana/grafana-deploy.yml'
                    ]

                    // Apply Prometheus YAMLs
                    for (file in prometheusFiles) {
                        sh "kubectl apply -f ${file}"
                    }

                    // Apply Grafana YAMLs
                    for (file in grafanaFiles) {
                        sh "kubectl apply -f ${file}"
                    }
                }
            }
        }
    }
}