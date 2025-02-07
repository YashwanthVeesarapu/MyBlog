pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                // Clone the Git repository
                // go to foler where the code is cloned
                // /home/yash/home/Workspace/Redsols/MyBlog
                script {
                    sh "cd /home/yash/home/Workspace/Redsols/MyBlog"
                    sh "git fetch --all"
                }
        }

        stage('Build') {
            steps {
                // Run the build
                script {
                    sh "cd /home/yash/home/Workspace/Redsols/MyBlog"
                    sh "npm install"
                    sh "npm run build"
                }
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the application
                script {
                    sh "sudo systemctl restart blog"
                }
            }
        }
    }

}