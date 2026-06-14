# 💈 Barbearia Schedule - Backend API

Este é o módulo de **Backend** do projeto Barbearia Schedule. Ele consiste em uma API REST desenvolvida com **Spring Boot** para gerenciar agendamentos, usuários e serviços.

---

## 📝 Sobre o Módulo
A API é responsável por toda a lógica de negócio, persistência de dados e segurança do sistema. Ela foi construída seguindo os princípios de uma arquitetura limpa e escalável, utilizando autenticação JWT e controle de acesso baseado em regras (RBAC).

## 🚀 Tecnologias e Dependências

- **Java 21** & **Spring Boot 4.0.3**
- **Spring Security** com **JWT** (java-jwt)
- **Spring Data JPA** & **Hibernate**
- **PostgreSQL** (Banco principal) & **H2** (Testes)
- **Docker** para orquestração do banco de dados
- **SpringDoc OpenAPI (Swagger)** para documentação

---

## 🏗️ Estrutura do Projeto

- `src/main/java`: Contém o código fonte da aplicação.
  - `config`: Configurações de segurança, beans e sementes de dados.
  - `entities`: Modelos JPA e DTOs.
  - `resources`: Controllers REST que expõem os endpoints.
  - `services`: Camada de serviço com a lógica de negócio.
- `src/main/resources`: Arquivos de configuração (`application.properties`) e scripts.

---

## ⚙️ Configuração e Execução

### 1. Variáveis de Ambiente
Este módulo requer um arquivo `.env` na raiz da pasta `schedule-back` (ou variáveis de ambiente configuradas) com as seguintes chaves:

```env
ADMIN_USER=admin_username
ADMIN_PASSWORD=admin_password
JWT_SECRET=sua_chave_secreta_aqui
```

### 2. Banco de Dados (Docker)
Suba o container do PostgreSQL utilizando o arquivo `docker-compose.yaml` presente nesta pasta:
```bash
docker-compose up -d
```

### 3. Execução
Execute a aplicação utilizando o Maven Wrapper:
```bash
./mvnw spring-boot:run
```

A API estará disponível em `http://localhost:8080`.

---

## 📖 Documentação da API
Com a aplicação rodando, acesse a documentação interativa via Swagger UI:
👉 [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)

---

## 🛠️ Endpoints Principais

| Método | Endpoint | Descrição |
| :--- | :--- | :--- |
| `POST` | `/auth/logins` | Login e geração de Token JWT |
| `POST` | `/auth/register` | Registro de novos usuários/barbeiros |
| `POST` | `/bookings` | Criação de novo agendamento |
| `GET` | `/bookings/history` | Histórico de agendamentos por telefone |
| `PATCH` | `/bookings/{id}/status` | Atualização de status de agendamento |
| `GET` | `/barbers` | Listagem e gestão de barbeiros |

---

## 🔙 Voltar para o Root
[Clique aqui para voltar ao README principal do projeto.](../README.md)
