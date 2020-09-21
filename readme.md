# JSONPlaceholder - Postman & Newman

This example contains a collection and environment files, after execution the project generates two reports: HTML Report and Allure Report.

## Execution

Run the command below:

```sh
# Dev environment
npm run test:dev
# Live environment
npm run test:live
```

## CI

Jenkinsfile example:

```groovy
pipeline {
    agent any
    parameters{
        choice(name: 'ENVIRONMENT', choices: ['live', 'dev'], description: 'Select the environtment')
    }
    options {
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }
    environment {
        BUILD="${currentBuild.number}"
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
                exec("npm run test:${params.ENVIRONMENT}")
            }
            post { 
                always { 
                    publishHTML (target: [
                        allowMissing: true,
                        alwaysLinkToLastBuild: false,
                        keepAll: true,
                        reportDir: 'newman',
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