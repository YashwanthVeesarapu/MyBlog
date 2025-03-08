pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "redsols/blog"
        DOCKER_TAG = "latest"
        REGISTRY_CREDENTIALS = "docker-credentials"
        GITHIB = "https://github.com/YashwanthVeesarapu/MyBlog.git"
        PORT1 = "3011"
        PORT2 = "3012"
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
        stage('Determine Active Container') {
            steps {
                script {
                    def isRunning = sh(script: "docker ps --filter 'name=${CONTAINER1}' --format '{{.Names}}'", returnStdout: true).trim()
                    env.ACTIVE_CONTAINER = isRunning == CONTAINER1 ? CONTAINER1 : CONTAINER2
                    env.NEW_CONTAINER = env.ACTIVE_CONTAINER == CONTAINER1 ? CONTAINER2 : CONTAINER1
                    env.NEW_PORT = env.NEW_CONTAINER == CONTAINER1 ? PORT1 : PORT2
                    echo "Active: ${env.ACTIVE_CONTAINER}, Deploying: ${env.NEW_CONTAINER} on port ${env.NEW_PORT}"
                }
            }
        }

        stage('Deploy New Container') {
            steps {
                sh """
                    docker stop ${NEW_CONTAINER} || true
                    docker rm ${NEW_CONTAINER} || true
                    docker run -d --name ${NEW_CONTAINER} -p ${NEW_PORT}:3011 ${DOCKER_IMAGE}:${DOCKER_TAG}
                """
            }
        }

        stage('Verify New Container') {
            steps {
                script {
                    sleep 5
                    def healthCheck = sh(script: "curl -s -o /dev/null -w '%{http_code}' http://127.0.0.1:${NEW_PORT}", returnStdout: true).trim()
                    if (healthCheck != "200") {
                        error("New container failed health check! Deployment aborted.")
                    }
                }
            }
        }

        stage('Remove Old Container') {
            steps {
                sh """
                    docker stop ${ACTIVE_CONTAINER} || true
                    docker rm ${ACTIVE_CONTAINER} || true
                """
            }
        }

    
    }
}