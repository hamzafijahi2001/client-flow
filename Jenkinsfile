def venv = '/home/ubuntu/venv'
pipeline {
    agent any
    stages {
        stage('[backend] venv'){
            steps {
                echo "--------------Activating the virtual env--------------"
                sh 'source ${venv}/bin/activate'
                echo "----------------Installing python requirements-----------"
                sh 'python -m pip install -r requirements.txt'
            }
        }
        stage('[backend] test') {
            steps {
                echo '-----------------------------Test started---------------------------'
                sh 'cd backend'
                sh 'python manage.py makemigrations'
                sh 'python manage.py migrate'
                sh 'python manage.py test'
                sh 'cd ..'
            }
        }
        stage('[frontend] test'){
            steps {
                sh 'cd frontend && npm install'
                sh 'npm run test'
            }
        }


    }
}
