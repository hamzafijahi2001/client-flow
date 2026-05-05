pipeline {
    agent{
        node {
            label 'build'
        }
    }
    stages {
        stage('[backend] setup + test') {
            steps {
                dir('backend') {
                    echo '-----------------------------Running test coverage---------------------------'
                    sh '''
                    rm -rf .venv
                    python3 -m venv .venv
                    .venv/bin/pip install --upgrade pip
                    .venv/bin/pip install -r ../requirements.txt
                    .venv/bin/python manage.py test
                    .venv/bin/coverage run manage.py test
                    .venv/bin/coverage xml -o coverage.xml
                    '''
                }
            }
        }
        stage('[frontend] test'){
            steps {
                dir('frontend') {
                    sh 'npm install'
                    sh 'npm run test:coverage'
                }
            }
        }
        stage('SonarQube analysis') {
            environment {
                scannerHome = tool 'sonar-scanner'
            }
            steps{
                withSonarQubeEnv('sonar-scanner') {
                    sh "${scannerHome}/bin/sonar-scanner"
                }
            }
        }


    }
}
