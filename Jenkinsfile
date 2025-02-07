pipeline {
    agent any

    environment {
        WORKSPACE_DIR = "/home/yash/home/Workspace/Redsols/MyBlog"
    }

    stages {
        stage('Checkout Code') {
            steps {
                script {
                    // Ensure the correct directory and update the repo
                    sh """
                        cd ${WORKSPACE_DIR}
                        git fetch --all
                        git reset --hard origin/main
                    """
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    sh """
                        cd ${WORKSPACE_DIR}
                        npm install
                        npm run build
                    """
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "sudo systemctl restart blog"
                }
            }
        }
    }
}