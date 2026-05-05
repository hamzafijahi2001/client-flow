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
        stage('[backend] Code Quality (Python)') {
            steps {
                dir('backend') {
                    sh '''
                    echo "Installing Python tools..."
                    .venv/bin/pip install --no-cache-dir ruff bandit

                    echo "Running Ruff..."
                    .venv/bin/ruff check . > ruff-report.txt || true

                    echo "Running Bandit..."
                    .venv/bin/bandit -r . -f json -o bandit-report.json || true
                    '''
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'backend/*.txt, backend/*.json', fingerprint: true
                }
            }
        }

        stage('[frontend] Code Quality (React)') {
            steps {
                dir('frontend') {
                    sh '''
                    echo "Installing Node dependencies..."
                    npm install

                    echo "Running ESLint..."
                    npx eslint . > eslint-report.txt || true
                    '''
                }
            }
            post {
                always {
                    archiveArtifacts artifacts: 'frontend/*.txt', fingerprint: true
                }
            }
        }

    


    }
}
