def venv = '/home/ubuntu/venv'
pipeline {
    agent{
        node {
            label 'build'
        }
    }
    stages {
        stage('[backend] Installing packages'){
            steps {
                echo "----------------Installing python requirements-----------"
                sh "${venv}/bin/pip install -r requirements.txt"
            }
        }
        stage('[backend] run tests') {
            steps {
                echo '-----------------------------Test started---------------------------'
                sh "${venv}/bin/pip backend/manage.py makemigrations"
                sh "${venv}/bin/pip backend/manage.py migrate"
                sh "${venv}/bin/pip backend/manage.py test"
            }
        }
        stage('[backend] coverage') {
            steps {
                echo '-----------------------------Running coverage---------------------------'
                sh "${venv}/bin/coverage backend/manage.py test"
                sh "${venv}/bin/coverage xml -o backend/coverage.xml"
                sh "${venv}/bin/pip backend/manage.py test"
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


    }
}
