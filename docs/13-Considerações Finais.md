# Considerações Finais

O **Wally** foi desenvolvido utilizando um conjunto de tecnologias modernas que buscou aliar eficiência, escalabilidade e experiência de usuário fluida. No back-end, optamos pelo **Node.js** devido à sua performance em operações assíncronas e capacidade de escalonar com facilidade. Para garantir a integridade e consistência dos dados, adotamos o **PostgreSQL**, cujas definições do modelo físico de banco de dados estão disponíveis no arquivo banco.sql, localizado em src/bd. O uso do **Docker** para containerização assegurou que os ambientes de desenvolvimento e produção permanecessem consistentes, independentemente do sistema operacional dos membros da equipe. A **Amazon Web Services (AWS)** foi escolhida como plataforma de nuvem para hospedar os serviços da aplicação.

No front-end mobile, escolhemos **React Native** em conjunto com **Expo** e **Expo Go**. Essa decisão permitiu que tanto iOS quanto Android compartilhassem a mesma base de código, acelerando o desenvolvimento e reduzindo custos de manutenção. O uso do Expo Go simplificou os testes em dispositivos reais, eliminando configurações complexas e oferecendo feedback imediato durante o ciclo de desenvolvimento. Complementarmente, o **Visual Studio Code** foi o editor de preferência do time, graças à sua interface intuitiva, integração nativa com GitHub e um rico ecossistema de extensões para **JavaScript**, **TypeScript** e React Native.

A gestão do projeto baseou-se fortemente no **GitHub**: utilizamos repositórios privados para controle de versão e branches dedicados para novas funcionalidades e correções de bugs, adotando commits frequentes para facilitar o rastreamento de mudanças. O **Quadro Kanban** do GitHub Projects forneceu uma visão clara do progresso das tarefas. Para comunicação, o **Microsoft Teams** serviu como canal oficial de reuniões, compartilhamento de arquivos e histórico de decisões, enquanto o WhatsApp operou como um meio complementar para mensagens urgentes e alinhamentos informais.

No âmbito de design e prototipagem, o **Figma** permitiu a criação colaborativa de wireframes e mockups, garantindo que todos os membros tivessem uma visão clara do layout e interações desejadas. Quando foi necessária a elaboração de diagramas de fluxo e arquitetura, recorremos ao **Lucid**, cuja intuitividade facilitou o mapeamento de processos. Para itens gráficos como logotipos e slides de apresentação, utilizamos o **Canva**, que atendeu com agilidade às demandas estéticas.

## Análise Crítica e Proposta de Melhorias

Ao longo do desenvolvimento do Wally, diversas oportunidades de aprimoramento foram identificadas, tanto no projeto arquitetural quanto no processo de análise e desenvolvimento. Apesar da arquitetura ser sólida e escalável, baseada em tecnologias consolidadas, percebeu-se a necessidade de *investir* em **testes automatizados mais robustos**, além de:
- **Expansão da Funcionalidade de Grupos:** Adicionar chat interno, notificações de pendência;
- **Dashboard Web Responsivo:** Desenvolver uma versão web com acesso ampliado para usuários e administradores;
- **Gamificação e Educação Financeira:** Incluir metas, desafios e conteúdos educativos para incentivar o uso consciente das finanças;
- **Publicação nas Lojas:** Ajustar o build para Google Play e App Store, realizando testes finais com usuários reais;
- Melhorias gerias de acordo com o feedback dos usuários. 

## Retrato Atual da Gestão do Trabalho e Contribuições no GitHub

A gestão do trabalho da equipe no projeto Wally foi visualizada e acompanhada de perto por meio do Quadro Kanban no **GitHub Projects**. Este quadro reflete de maneira clara o fluxo de trabalho ágil, com as tarefas distribuídas em colunas como "Backlog", "To Do", "In Progress" e "Done", proporcionando uma visão transparente do progresso do projeto, garantindo que todos — do planejamento à entrega — acompanhem em tempo real o avanço das atividades. 

<img width="1024" alt="image" src="https://github.com/user-attachments/assets/c19cf054-6b34-41f1-a5c5-77693b51cb2e" />

Ao longo de todas as sprints, o grupo manteve-se presente em reuniões de alinhamento, refinamento e demonstração de resultados, assegurando que decisões fossem validadas coletivamente. 

<div align="center">

<img width="568" alt="image" src="https://github.com/user-attachments/assets/ea91f974-f664-4421-9171-b650f7cc7856" />

</div>

No front-end, Danielle entregou a Tela Inicial (index.tsx – RF‑017), enquanto Vinicius desenvolveu as telas de Login (login.tsx – RF‑001), Recuperação de Senha (recuperarsenha.tsx – RF‑002) e Cadastro (cadastro.tsx – RF‑003). Estevão programou os dialogs de Adicionar Receitas e Despesas (AddTransactionDialog.tsx – RF‑005). Alexsander implementou a Tela de Perfil (perfil.tsx – RF‑004). Ariane ficou responsável pela criação de toda identidade visual e design do Wally, desde a logo até a prototipagem e interfaces. Também desenvolveu a Dashboard Principal (index.tsx, layout.tsx e seus componentes), implementando filtragem de transações, cálculos de saldo e seleção de datas (RF‑006, 007, 009 e 010), a Tela de Criação de Grupo (criar-grupo.tsx – RF‑011), a Tela do Grupo (grupo.tsx – RF‑013, RF-014) e atualização de todas as telas para as novas versões. Raphael foi o responsável pela criação, organização e manutenção do Banco de Dados do Wally. E também criou a Tela Grupos e suas funções (grupos.tsx – RF‑016), o Modal de Adicionar Membros (RF‑015) e, em conjunto com Ariane, a Tela de Adicionar Despesa de Grupo (add-despesa.tsx – RF‑012). No back-end, Raphael e Ariane desenharam e mantiveram o serviço Node.js e o modelo físico do PostgreSQL, fortalecendo toda a estrutura de autenticação e transações do Wally.

Acesse a **Programação de Funcionalidades** do Wally: [Clique aqui](https://github.com/ICEI-PUC-Minas-PMV-ADS/pmv-ads-2025-1-e3-proj-mov-t2-wally/blob/main/docs/06-Template%20Padr%C3%A3o%20da%20Aplica%C3%A7%C3%A3o.md).
