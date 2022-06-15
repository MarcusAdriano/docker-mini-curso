#### SpringBoot + MySQL + Frontend (HTML + JS) + Docker

Exemplo simples de utilização de Docker executando uma aplicação SpringBoot que acessa uma base de dados MySQL.

## Criando uma rede exclusiva

```bash
docker network create todoapp
```

## Executando um container MySQL

```bash
docker run --name mysqltodo --network todoapp -e MYSQL_ROOT_PASSWORD=senha_dificil -d mysql
```

Criando o Banco de Dados:

```bash
docker exec -it mysqltodo mysql -u root -p

create database todo_db;
```

## Executando um container Java

Gerando um executável (jar) da aplicação:

```bash
./mvnw clean install -DskipTests
```

Gerando um container docker:

```bash
docker build -t {usuario_docker_hub}/java-todo .
```

Executando o container Java que usa o Banco de Dados:

```bash
docker run -ti -m 256MB --rm -e MYSQL_HOST=mysqltodo -e MYSQL_USR=root -e MYSQL_PWD=senha_dificil -p 8081:8080 --network todoapp marcusadriano/java-todo
```

### Execução via docker-compose

```bash
docker-compose up
```


