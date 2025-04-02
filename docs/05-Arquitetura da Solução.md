# Arquitetura da Solução

<span style="color:red">Pré-requisitos: <a href="3-Projeto de Interface.md"> Projeto de Interface</a></span>

Definição de como o software é estruturado em termos dos componentes que fazem parte da solução e do ambiente de hospedagem da aplicação.

![Arquitetura da Solução](img/02-mob-arch.png)

## Diagrama de Classes

O diagrama de classes ilustra graficamente como será a estrutura do software, e como cada uma das classes da sua estrutura estarão interligadas. Essas classes servem de modelo para materializar os objetos que executarão na memória.

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Classes”.

> - [Diagramas de Classes - Documentação da IBM](https://www.ibm.com/docs/pt-br/rational-soft-arch/9.6.1?topic=diagrams-class)
> - [O que é um diagrama de classe UML? | Lucidchart](https://www.lucidchart.com/pages/pt/o-que-e-diagrama-de-classe-uml)

## Modelo ER

O Modelo ER representa através de um diagrama como as entidades (coisas, objetos) se relacionam entre si na aplicação interativa.]

As referências abaixo irão auxiliá-lo na geração do artefato “Modelo ER”.

> - [Como fazer um diagrama entidade relacionamento | Lucidchart](https://www.lucidchart.com/pages/pt/como-fazer-um-diagrama-entidade-relacionamento)

## Esquema Relacional

O Esquema Relacional corresponde à representação dos dados em tabelas juntamente com as restrições de integridade e chave primária.
 
As referências abaixo irão auxiliá-lo na geração do artefato “Esquema Relacional”.

> - [Criando um modelo relacional - Documentação da IBM](https://www.ibm.com/docs/pt-br/cognos-analytics/10.2.2?topic=designer-creating-relational-model)

## Modelo Físico

Entregar um arquivo banco.sql contendo os scripts de criação das tabelas do banco de dados. Este arquivo deverá ser incluído dentro da pasta src\bd.

## Tecnologias Utilizadas

Descreva aqui qual(is) tecnologias você vai usar para resolver o seu problema, ou seja, implementar a sua solução. Liste todas as tecnologias envolvidas, linguagens a serem utilizadas, serviços web, frameworks, bibliotecas, IDEs de desenvolvimento, e ferramentas.

Apresente também uma figura explicando como as tecnologias estão relacionadas ou como uma interação do usuário com o sistema vai ser conduzida, por onde ela passa até retornar uma resposta ao usuário.

 <!--  ## Hospedagem

Explique como a hospedagem e o lançamento da plataforma foi feita.

> **Links Úteis**:
>
> - [Website com GitHub Pages](https://pages.github.com/)
> - [Programação colaborativa com Repl.it](https://repl.it/)
> - [Getting Started with Heroku](https://devcenter.heroku.com/start)
> - [Publicando Seu Site No Heroku](http://pythonclub.com.br/publicando-seu-hello-world-no-heroku.html) -->

## Qualidade de Software

A qualidade de software pode ser definida como um conjunto de características que garantem que um produto atenda às expectativas dos usuários e stakeholders. Para assegurar um alto nível de qualidade no desenvolvimento do Wally, um aplicativo de gestão financeira, utilizamos como base a norma internacional **ISO/IEC 25010**, que define características e subcaracterísticas essenciais para um software confiável, eficiente e intuitivo. As subcaracterísticas selecionadas e suas respectivas justificativas são apresentadas a seguir:

**1. Funcionalidade**

- **Adequação Funcional:** O Wally deve atender plenamente às necessidades dos usuários, garantindo que todas as funcionalidades de gestão financeira sejam implementadas corretamente e de forma eficiente.

- **Precisão:** Os cálculos financeiros realizados pelo app devem ser exatos, evitando erros que possam comprometer a confiabilidade das informações.

- **Segurança:** Como o aplicativo lida com dados financeiros sensíveis, é essencial garantir proteção contra acessos não autorizados e vazamento de informações.

**2. Confiabilidade**

- **Maturidade:** O Wally deve ser testado rigorosamente para minimizar falhas e evitar interrupções no serviço.

- **Disponibilidade:** O aplicativo precisa garantir um tempo de atividade elevado para que os usuários possam acessá-lo sempre que necessário.

- **Tolerância a Falhas:** Em caso de falhas ou erros, o sistema deve ser capaz de se recuperar rapidamente, minimizando impactos para o usuário.

**3. Usabilidade**

- **Apreensibilidade:** A interface do Wally deve ser intuitiva, facilitando o aprendizado e a navegação para usuários com diferentes níveis de experiência.

- **Operacionalidade:** O aplicativo deve proporcionar uma experiência fluida, garantindo interações simples e eficientes.

- **Acessibilidade:** Deve-se garantir que o app seja utilizável por pessoas com diferentes necessidades, incluindo suporte para acessibilidade digital.

**4. Eficiência de Desempenho**

- **Tempo de Resposta:** O Wally deve apresentar respostas rápidas nas interações, evitando lentidões que possam prejudicar a experiência do usuário.

- **Utilização de Recursos:** A aplicação deve ser otimizada para consumir o mínimo de recursos do dispositivo, garantindo um funcionamento eficiente sem sobrecarga de processamento ou memória.

**5. Manutenibilidade**

- **Modularidade:** A estrutura do código deve ser organizada de forma modular, permitindo a implementação e atualização de funcionalidades sem comprometer o restante do sistema.

- **Reusabilidade:** O código deve ser escrito de maneira reutilizável, facilitando a expansão futura do aplicativo.

- **Analisabilidade:** O sistema deve permitir diagnósticos rápidos para identificar falhas e otimizar o processo de correção de erros.

**6. Portabilidade**

- **Adaptabilidade:** O Wally deve ser compatível com diferentes dispositivos móveis e sistemas operacionais, proporcionando uma experiência consistente.

- **Instalabilidade:** A instalação e atualização do aplicativo devem ser simples e diretas, minimizando dificuldades para os usuários.

**Métricas para Avaliação da Qualidade**

Para garantir que as subcaracterísticas selecionadas sejam atendidas, algumas métricas serão utilizadas:

- *Índice de satisfação do usuário:* Coletada por meio de feedbacks e avaliações na loja de aplicativos.
- *Taxa de erros funcionais e falhas:* Avalia a frequência de falhas críticas e erros reportados pelos usuários.
- *Tempo médio de resposta:* Mede o tempo necessário para carregar telas e processar ações dos usuários.
- *Tempo médio entre falhas (MTBF):* Verifica a estabilidade do sistema ao longo do tempo.
- *Índice de usabilidade (SUS - System Usability Scale):* Avaliação da experiência do usuário com base em testes práticos e feedbacks.
- *Número de incidentes de segurança:* Registra tentativas de acesso não autorizado e vulnerabilidades identificadas.
- *Tempo médio de recuperação:* Mede o tempo necessário para restaurar o sistema após uma falha.
- *Consumo de Recursos:* Monitoramento da utilização e memória do dispositivo.
- *Taxa de Acessibilidade:* Percentual de conformidade com diretrizes de acessibilidade.

Ao adotar essas práticas e a implementação e monitoramento contínuo dessas métricas, o Wally garantirá um alto padrão de qualidade, proporcionando aos usuários uma experiência confiável, segura e eficiente na gestão financeira.








