# Sobre o projeto

Este projeto consiste em uma aplicação Node.js que simula a sincronização de dados de usuários (RH), 
consumindo uma API externa, processando as informações recebidas, armazenando os dados em um banco local e 
gerando um relatório detalhado do processamento.

  - Busca 150 usuários da API pública RandomUser.
  - Usuários menores de 18 anos são desconsiderados.
  - Os dados são armazenados em um banco PostgreSQL.
  - Ao final do processamento, é gerado um relatório no diretório `/reportsFile` contendo:

    - Total de registros processados.
    - Quantidade de usuários criados.
    - Quantidade de usuários atualizados.
    - Quantidade de usuários ignorados.
    - Erros encontrados (se houver).

# Pré requisitos para rodar o projeto

Antes de executar o projeto, certifique-se de que possui:

  - Node.js versão 18 ou superior.
  - PostgreSQL.
  - Git.

Além disso, crie um arquivo `.env` na raiz do projeto com as seguintes variáveis de ambiente:

```dotenv
DB_HOST=localhost
DB_PORT=5432
DB_NAME=nome_do_banco
DB_USER=usuario_do_banco
DB_PASSWORD=senha_do_banco
```
> Os valores acima são apenas exemplos. Substitua pelas credenciais do seu ambiente local.
> O banco de dados informado deve existir previamente no PostgreSQL.

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

Após a execução, o script irá consumir a API, processar os usuários, persistir os dados no banco e gerar o relatório de processamento automaticamente.

## Considerações finais

Este projeto foi desenvolvido com foco em organização de código, boas práticas e clareza, atendendo aos requisitos técnicos e funcionais propostos no desafio.

