pipeline {
    agent any

    environment {
        NO_COLOR = '1' // Desativa a cor no Cypress
    }

    stages {
        stage('Clonar Repositório') {
            steps {
                // Clona o repositório a partir da branch main
                git branch: 'main', url: 'https://github.com/eulucasilva/teste-e2e-ebac'
            }
        }

        stage('Instalar Dependências') {
            steps {
                // Instala as dependências do projeto
                sh 'npm install'
            }
        }

        stage('Executar Testes') {
            steps {
                script {
                    // Executa os testes com Cypress em modo headless
                    sh 'npx cypress run --headless'
                }
            }
        }
    }

    post {
        always {
            // Publica os logs do Cypress (se houver)
            archiveArtifacts artifacts: '**/*.log', allowEmptyArchive: true
        }
    }
}
