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
                // Executa os testes com Cypress sem cor
                sh 'npx cypress run --no-color'
            }
        }
    }
}
