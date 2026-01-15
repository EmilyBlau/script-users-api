# Sobre o projeto

Este projeto consiste em uma aplicação Node.js que simula a sincronização de dados de usuários (RH), 
consumindo uma API externa, processando as informações recebidas, armazenando os dados em um banco local e 
gerando um relatório detalhado do processamento.

  - Busca 150 usuários da API pública RandomUser.
  - Usuários menores de 18 anos são desconsiderados.
  - Os dados são armazenados em um banco PostgreSQL.
  - Ao final do processamento, é gerado um relatório (no diretório /reportsFile) contendo:

    - Total de registros processados.
    - Quantidade de usuários criados.
    - Quantidade de usuários atualizados.
    - Quantidade de usuários ignorados.
    - Erros encontrados (se houver).

# Pré requisitos para rodar o projeto

  - Node.js versão 18 ou superior.
  - PostgreSQL.
  - Git.
  - Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

    ```dotenv
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=nome_do_banco
    DB_USER=usuario_do_banco
    DB_PASSWORD=senha_do_banco
    ```

# Como rodar o projeto

1. Clone o repositório.

```bash
git clone https://github.com/EmilyBlau/script-users-api.git
```

```bash
cd script-users-api
```

2. Instale as dependências.

```bash
npm install
```

3. Execute o projeto.

```bash
node src/server.js
```
