pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "redsols/blog"
        DOCKER_TAG = "latest"
        REGISTRY_CREDENTIALS = "docker-credentials"
        GITHIB = "https://github.com/YashwanthVeeravalli/MyBlog.git"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git branch: 'main', url: GITHIB
                }
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh "docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ."
                }
            }
        }

        stage('Push Docker Image') {
            steps {
                script {
                    withDockerRegistry([credentialsId: REGISTRY_CREDENTIALS, url: '']) {
                        sh "docker push ${DOCKER_IMAGE}:${DOCKER_TAG}"
                    }
                }
            }
        }


        stage('Clean Up') {
            steps {
                script {
                    sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
                }
            }
        }
    }
}