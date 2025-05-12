# Instruções de utilização

O Wally é um **aplicativo mobile** desenvolvido para auxiliar usuários no controle de suas finanças pessoais e de grupos compartilhados,
oferecendo uma experiência simples, intuitiva e repleta de recursos de análise.

## Instruções de Acesso:

`🔗 Link de Acesso:`

**Documentação da API:** http://ec2-18-231-92-232.sa-east-1.compute.amazonaws.com:3333/wally/documentation

**API URL:** http://ec2-18-231-92-232.sa-east-1.compute.amazonaws.com:3333/wally

`🔐 Credenciais de Acesso (Administrador):`

**E-mail:** admin@email.com

**Senha:** wallyadm

## ▶️ Como Rodar o App no Simulador com Expo

Siga os passos abaixo para executar o Wally em um emulador ou dispositivo físico via Expo:

### 1. Pré-requisitos:

- **Node.js** instalado (versão recomendada: 18+)

- **Expo CLI** instalado globalmente:

`npm install -g expo-cli`

**Emulador Android** (AVD) ou **Simulador iOS** (Xcode) configurado ou o app **Expo Go** no seu smartphone.

### 2. Passos:

**Clone** o repositório oficial:

`git clone https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-wally.git`

**Navegue** até a pasta do projeto mobile:

`cd wally`

**Instale** as dependências:

`npm install`

**Inicie** o servidor Expo:

`npx expo start`

**Abra** o app:

- No navegador de dev que abrirá após `expo start`, escaneie o **QR Code** com o **Expo Go** no celular.
- No **emulador Android**, pressione `a` no terminal.
- No **simulador iOS** (macOS + Xcode), pressione `i`.

## Tecnologias Utilizadas

### Front-end (Mobile)

- **React Native:** estrutura principal para criação de interfaces nativas multiplataforma (iOS e Android).

- **Expo:** framework que acelera o desenvolvimento e facilita o deploy, com ferramentas de build, gerenciamento de ativos e hot-reloading.

- **TypeScript:** adiciona tipagem estática ao JavaScript, melhorando a robustez do código e a produtividade durante o desenvolvimento.

### Back-end

- **Node.js:** runtime JavaScript orientado a eventos, responsável por executar a lógica de aplicação no servidor.

- **Fastify:** framework web de alta performance sobre Node.js, que oferece roteamento rápido e plugin-architecture para escalabilidade.

### Banco de Dados

- **PostgreSQL:** sistema de gerenciamento de banco relacional, usado para armazenar transações, usuários, grupos e configurações, garantindo integridade e suporte a consultas complexas.

### Infraestrutura / Deploy

- **AWS (Amazon Web Services)**: é uma plataforma de serviços em nuvem usada para hospedar e escalar o back-end do aplicativo. Ela permite armazenar dados, rodar o servidor, salvar arquivos e manter o sistema disponível com segurança, sem precisar se preocupar com servidores físicos.


<!-- ## Histórico de versões

### [0.1.0] - DD/MM/AAAA
#### Adicionado
- Adicionado ... --!>
