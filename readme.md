# JSONPlaceholder - Postman & Newman

This example contains a collection and environment files, after execution the project generates the [HTML Report](https://www.npmjs.com/package/newman-reporter-htmlextra).

## Execution

Before running, set the environment variable `APP_ENV` and then run the following command:

```sh
npm run test
```

## CI

Jenkinsfile example:

```groovy
pipeline {
    agent any
    parameters{
        choice(name: 'ENVIRONMENT', choices: ['live', 'dev'], description: 'Select the environtment')
    }
    environment {
        APP_ENV = "${params.ENVIRONMENT}"
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    stages {
        stage('Prepare') {
            steps {
                git branch: 'master', url: 'https://github.com/bredah/postman-jsonplaceholder.git'
                exec('npm install')
            }
        }
        stage('Test') {
            steps {
                exec('npm test')
            }
            post {
                always {
                    publishHTML (target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: '',
                        reportFiles: 'report.html',
                        reportName: "HTML Report"
                    ])
                }
            }
        }
    }
}

def exec(cmd) {
    if (isUnix()) {
        sh cmd
    }
    else {
        bat cmd
    }
}

```
