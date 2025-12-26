pipeline {
    agent any
    
    tools {
        maven 'Maven 3.9.5'
        nodejs 'NodeJS 18'
    }
    
    environment {
        DOCKER_REGISTRY = 'your-docker-registry'
        DOCKER_CREDENTIALS_ID = 'docker-credentials'
        BACKEND_IMAGE = 'movie-booking-backend'
        FRONTEND_IMAGE = 'movie-booking-frontend'
        VERSION = "${BUILD_NUMBER}"
    }
    
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Build Backend') {
            steps {
                dir('backend') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }
        
        stage('Test Backend') {
            steps {
                dir('backend') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit 'backend/target/surefire-reports/*.xml'
                }
            }
        }
        
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }
        
        stage('Build Docker Images') {
            parallel {
                stage('Build Backend Image') {
                    steps {
                        dir('backend') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/${BACKEND_IMAGE}:${VERSION}")
                                docker.build("${DOCKER_REGISTRY}/${BACKEND_IMAGE}:latest")
                            }
                        }
                    }
                }
                stage('Build Frontend Image') {
                    steps {
                        dir('frontend') {
                            script {
                                docker.build("${DOCKER_REGISTRY}/${FRONTEND_IMAGE}:${VERSION}")
                                docker.build("${DOCKER_REGISTRY}/${FRONTEND_IMAGE}:latest")
                            }
                        }
                    }
                }
            }
        }
        
        stage('Push Docker Images') {
            steps {
                script {
                    docker.withRegistry('', "${DOCKER_CREDENTIALS_ID}") {
                        docker.image("${DOCKER_REGISTRY}/${BACKEND_IMAGE}:${VERSION}").push()
                        docker.image("${DOCKER_REGISTRY}/${BACKEND_IMAGE}:latest").push()
                        docker.image("${DOCKER_REGISTRY}/${FRONTEND_IMAGE}:${VERSION}").push()
                        docker.image("${DOCKER_REGISTRY}/${FRONTEND_IMAGE}:latest").push()
                    }
                }
            }
        }
        
        stage('Deploy to Test Environment') {
            steps {
                script {
                    sh '''
                        docker-compose down
                        docker-compose up -d
                    '''
                }
            }
        }
        
        stage('Health Check') {
            steps {
                script {
                    sh '''
                        sleep 30
                        curl -f http://localhost:8080/actuator/health || exit 1
                        curl -f http://localhost:80 || exit 1
                    '''
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline completed successfully!'
            emailext (
                subject: "SUCCESS: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' completed successfully.",
                to: 'team@example.com'
            )
        }
        failure {
            echo 'Pipeline failed!'
            emailext (
                subject: "FAILURE: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
                body: "Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' failed.",
                to: 'team@example.com'
            )
        }
        always {
            cleanWs()
        }
    }
}
