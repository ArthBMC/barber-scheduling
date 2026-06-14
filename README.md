# 💈 Barbearia Schedule - Gestão de Agendamentos

![Banner](https://img.shields.io/badge/Project-Barber--Schedule-black?style=for-the-badge&logo=spring)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Este é um projeto **Full-Stack Monorepo** desenvolvido para facilitar a gestão de uma barbearia. O sistema permite o agendamento de horários, gestão de serviços, controle de barbeiros e segurança avançada.

---

## 📂 Organização do Projeto

O ecossistema é dividido em dois módulos principais:

*   [**⚙️ Backend (Spring Boot)**](./schedule-back): API REST de alta performance, responsável pela inteligência do negócio, persistência de dados e autenticação segura.
*   [**🖥️ Frontend (React + Vite)**](./schedule-front): Interface do usuário moderna, responsiva e otimizada para uma experiência de agendamento rápida.

---

## 🛠️ Tecnologias Principais

| Módulo | Tecnologias |
| :--- | :--- |
| **Backend** | Java 21, Spring Boot 3, Spring Security, JWT, PostgreSQL, Docker, Swagger |
| **Frontend** | React, Vite, TailwindCSS, Shadcn/UI, Lucide React, React Router Dom |

---

## ✅ Implementações Atuais (Status do Projeto)

### Backend (Pronto para Uso)
- [x] **Autenticação JWT:** Login e registro seguro com tokens expiráveis.
- [x] **RBAC (Role-Based Access Control):** Diferenciação entre administradores, barbeiros e clientes.
- [x] **Gestão de Serviços:** CRUD completo de tipos de serviço (cabelo, barba, combos).
- [x] **Lógica de Agendamento:** Sistema de reserva com validação de horários retroativos e conflitos.
- [x] **Bloqueios de Agenda:** Funcionalidade para barbeiros bloquearem horários de folga ou manutenção.
- [x] **Histórico de Clientes:** Busca de histórico de agendamentos via telefone.

### Frontend (Interface Inicial)
- [x] **Landing Page:** Página inicial com Hero Section e chamada para ação.
- [x] **Catálogo Visual:** Exibição dos serviços oferecidos com preços e durações (Mock data).
- [x] **Roteamento:** Estrutura de navegação configurada para Login, Home e Serviços.
- [x] **Design System:** Implementação de Shadcn/UI e Tailwind para consistência visual.

---

## 🚀 Roadmap de Futuras Implementações

- [ ] **Integração Real (API -> Front):** Substituir os dados fictícios (mocks) pelo consumo real da API via Axios.
- [ ] **Fluxo de Agendamento:** Interface passo-a-passo (Selecionar Barbeiro -> Data -> Horário).
- [ ] **Painel Administrativo:** Dashboard para o dono da barbearia visualizar faturamento e métricas.
- [ ] **Agenda do Barbeiro:** Visualização em calendário para os barbeiros verem seus próximos cortes.
- [ ] **Notificações:** Envio de lembretes automáticos para o cliente via WhatsApp/Email.
- [ ] **PWA (Progressive Web App):** Possibilidade de instalar o sistema no celular como um aplicativo nativo.

---

## 🏁 Como Começar

1.  **Clone o repositório:** `git clone https://github.com/seu-usuario/schedule.git`
2.  **Configure o Backend:** Veja as instruções em [./schedule-back/README.md](./schedule-back/README.md).
3.  **Configure o Frontend:** Veja as instruções em [./schedule-front/README.md](./schedule-front/README.md).

---

## 📄 Licença

Este projeto está sob a licença **MIT**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---
*Desenvolvido como solução robusta para gestão de barbearias modernas.*
