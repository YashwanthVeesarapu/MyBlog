pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "redsols/blog"
        DOCKER_TAG = "latest"
        REGISTRY_CREDENTIALS = "docker-credentials"
        GITHIB = "https://github.com/YashwanthVeesarapu/MyBlog.git"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    git branch: 'main', credentialsId: 'eff5d436-cb19-40a4-aa3c-e7df06f08652', url: GITHIB

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


        // stage('Clean Up') {
        //     steps {
        //         script {
        //             sh "docker rmi ${DOCKER_IMAGE}:${DOCKER_TAG} || true"
        //         }
        //     }
        // }
    }
}