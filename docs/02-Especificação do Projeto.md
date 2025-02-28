# Especificações do Projeto

A definição do problema foi dada pela antropologia, uma técnica de observação que nos permitiu criar as personas e usuários abaixo.

## Personas

|Matilde Ribeiro|![Design sem nome](https://github.com/user-attachments/assets/986c6b9c-682d-4808-bc7f-b3d66f846824)|
|-----------------------|-|
|Idade:|59|
|Ocupação:| Servidora pública aposentada|
|Motivações| Quer uma forma mais rápida e simples de organizar suas finanças sem precisar utilizar papel|
|Frustrações| Sistemas de finanças são muito complicados de utilizar |
|Hobbies| Hidroginástica, brincar com os netos|

|Thiago Costa|![Design sem nome (1)](https://github.com/user-attachments/assets/bb09a82e-66c8-4134-8778-542d5c37bbbb)|
|-----------------------|-|
|Idade:|24|
|Ocupação:| Estagiário de agronomia|
|Motivações| Melhorar seus gastos excessivos e receber de seus amigos sem cobrar;|
|Frustrações| Não consegue desenvolver o hábito de atualizar seu planejamento financeiro no excel e constantemente toma calote de seus colegas quando dividem a conta|
|Hobbies| Ir para bares, comprar roupas on-line|

|Luiza Pereira|![Design sem nome (2)](https://github.com/user-attachments/assets/23f76acc-8397-4d71-93fe-a3778879bcd5)|
|-----------------------|-|
|Idade:|15|
|Ocupação:|Menor Aprendiz|
|Motivações| Iniciar a sua vida financeira com bons hábitos|
|Frustrações| Falta de conhecimento sobre termos financeiros e finanças no geral|
|Hobbies| Comer fast-food no seu bairro, dançar ballet|
## Histórias de Usuários

|EU COMO... `PERSONA`| QUERO/PRECISO ... `FUNCIONALIDADE`                                             |PARA ... `MOTIVO/VALOR`                 |
|--------------------|--------------------------------------------------------------------------------|----------------------------------------|
|Matilde Ribeiro| Registrar entradas e saídas usando o celular|Armazenar seus gastos em um lugar que não se deteriore|
|Matilde Ribeiro| Criar uma conta que possua minhas informações pessoais| Acessar meus dados a qualquer hora|
|Thiago Costa|Dividir a conta com mais pessoas de forma justa|Diminuir os casos em que sai lesado ao não ser pago novamente pelos seus colegas|
|Thiago Costa| Consultar meu histórico de entradas e gastos| Controlar e mapear meus gastos|
|Luiza Perreira|Criar metas financeiras|Visualizar o progresso da meta até sua materialização|
|Luiza Pereira| Mostrar gráficos financeiros | Facilitar o entendimento do balancete geral.|


## Modelagem do Processo de Negócio 

### Análise da Situação Atual

Apresente aqui os problemas existentes que viabilizam sua proposta. Apresente o modelo do sistema como ele funciona hoje. Caso sua proposta seja inovadora e não existam processos claramente definidos, apresente como as tarefas que o seu sistema pretende implementar são executadas atualmente, mesmo que não se utilize tecnologia computacional. 

### Descrição Geral da Proposta

Apresente aqui uma descrição da sua proposta abordando seus limites e suas ligações com as estratégias e objetivos do negócio. Apresente aqui as oportunidades de melhorias.

### Processo 1 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 1. Em seguida, apresente o modelo do processo 1, descrito no padrão BPMN. 

![Processo 1](img/02-bpmn-proc1.png)

### Processo 2 – NOME DO PROCESSO

Apresente aqui o nome e as oportunidades de melhorias para o processo 2. Em seguida, apresente o modelo do processo 2, descrito no padrão BPMN.

![Processo 2](img/02-bpmn-proc2.png)

## Indicadores de Desempenho

Apresente aqui os principais indicadores de desempenho e algumas metas para o processo. Atenção: as informações necessárias para gerar os indicadores devem estar contempladas no diagrama de classe. Colocar no mínimo 5 indicadores. 

Usar o seguinte modelo: 

![Indicadores de Desempenho](img/02-indic-desemp.png)
Obs.: todas as informações para gerar os indicadores devem estar no diagrama de classe a ser apresentado a posteriori. 

## Requisitos

As tabelas a seguir apresentam uma descrição detalhada dos **requisitos funcionais** e **não funcionais** que definem o escopo do projeto:

### Requisitos Funcionais

|ID    | Descrição do Requisito  | Prioridade |
|------|-----------------------------------------|----|
|RF-001| O aplicativo deve permitir que os usuários realizem login com e-mail e senha. | ALTA |
|RF-002| O aplicativo deve possibilitar a recuperação de senha. | ALTA |
|RF-003| O aplicativo deve permitir que os usuários se cadastrem fornecendo nome, e-mail e senha. | ALTA |
|RF-004| O aplicativo deve permitir que os usuários editem seu perfil (nome, foto, senha). | MÉDIA |
|RF-005| O aplicativo deve permitir que os usuários adicionem ganhos e despesas, informando valor, data, categoria e descrição. | ALTA |
|RF-006| O aplicativo deve permitir a criação e edição de categorias para transações (ex: alimentação, transporte). | ALTA |
|RF-007| O aplicativo deve exibir um extrato financeiro com todas as transações do usuário. | ALTA |
|RF-008| O aplicativo deve permitir filtrar transações por categoria, data ou valor. | MÉDIA |
|RF-009| O aplicativo deve gerar gráficos simples de gastos por categoria e evolução mensal. | ALTA |
|RF-010| O aplicativo deve permitir que os usuários definam metas financeiras e acompanhem o progresso. | BAIXA |
|RF-011| O aplicativo deve permitir a criação de grupos para divisão de despesas. | ALTA |
|RF-012| O aplicativo deve permitir que os usuários adicionem despesas ao grupo, informando valor, descrição e divisão entre participantes. | ALTA |
|RF-013| O aplicativo deve calcular automaticamente o saldo de cada participante do grupo. | ALTA |
|RF-014| O aplicativo deve permitir que os usuários marquem despesas como "pagas". | ALTA |
|RF-015| O aplicativo deve exibir um histórico de despesas do grupo. | MÉDIA |
|RF-016| O aplicativo deve permitir que os usuários escolham a moeda. | BAIXA |

### Requisitos não Funcionais

| ID      | Descrição do Requisito | Prioridade |  
|---------|------------------------------------------------------------|----------|  
| RNF-001 | O aplicativo deve ser compatível com dispositivos Android e iOS. | ALTA |  
| RNF-002 | O aplicativo deve ter uma interface simples e intuitiva, seguindo boas práticas de UX/UI. | ALTA |  
| RNF-003 | O sistema deverá ter um ótimo desempenho para lidar com vários usuários de uma única vez. | ALTA |  
| RNF-004 | (Número corrigido) A aplicação deve seguir protocolos de segurança, garantindo a proteção dos dados coletados. | ALTA |  
| RNF-005 | O aplicativo deve ser desenvolvido usando React Native para o front-end e Node.js para o back-end. | ALTA |  
| RNF-006 | (Número corrigido) O aplicativo deve ser testado em dispositivos móveis de baixo e alto desempenho. | MÉDIA |  

## Restrições

O projeto está **restrito** pelos itens apresentados na tabela a seguir:

| ID  | Restrição |  
|----|---------------------------------------------------------------|  
| 01 | O projeto deve ser entregue até o final do semestre. |  
| 02 | O front-end deve ser desenvolvido em React Native. |  
| 03 | O back-end deve ser implementado utilizando Node.js. |  
| 04 | O desenvolvimento deve ser feito com ferramentas gratuitas ou de licença acadêmica. |  
| 05 | O código deve seguir boas práticas de programação e ser bem documentado. |  
| 06 | A equipe deve colaborar ativamente em todas as etapas do projeto. |  
| 07 | O aplicativo deve estar em conformidade com a LGPD. |  
| 08 | Todo o código deve ser disponibilizado em um repositório no GitHub. |  
| 09 | O aplicativo deve funcionar offline para visualização de dados, mas requer conexão à internet para sincronização. |  

## Diagrama de Casos de Uso

O diagrama de casos de uso é o próximo passo após a elicitação de requisitos, que utiliza um modelo gráfico e uma tabela com as descrições sucintas dos casos de uso e dos atores. Ele contempla a fronteira do sistema e o detalhamento dos requisitos funcionais com a indicação dos atores, casos de uso e seus relacionamentos. 

As referências abaixo irão auxiliá-lo na geração do artefato “Diagrama de Casos de Uso”.

> **Links Úteis**:
> - [Criando Casos de Uso](https://www.ibm.com/docs/pt-br/elm/6.0?topic=requirements-creating-use-cases)
> - [Como Criar Diagrama de Caso de Uso: Tutorial Passo a Passo](https://gitmind.com/pt/fazer-diagrama-de-caso-uso.html/)
> - [Lucidchart](https://www.lucidchart.com/)
> - [Astah](https://astah.net/)
> - [Diagrams](https://app.diagrams.net/)

# Matriz de Rastreabilidade

A matriz de rastreabilidade é uma ferramenta usada para facilitar a visualização dos relacionamento entre requisitos e outros artefatos ou objetos, permitindo a rastreabilidade entre os requisitos e os objetivos de negócio. 

A matriz deve contemplar todos os elementos relevantes que fazem parte do sistema, conforme a figura meramente ilustrativa apresentada a seguir.

![Exemplo de matriz de rastreabilidade](img/02-matriz-rastreabilidade.png)

> **Links Úteis**:
> - [Artigo Engenharia de Software 13 - Rastreabilidade](https://www.devmedia.com.br/artigo-engenharia-de-software-13-rastreabilidade/12822/)
> - [Verificação da rastreabilidade de requisitos usando a integração do IBM Rational RequisitePro e do IBM ClearQuest Test Manager](https://developer.ibm.com/br/tutorials/requirementstraceabilityverificationusingrrpandcctm/)
> - [IBM Engineering Lifecycle Optimization – Publishing](https://www.ibm.com/br-pt/products/engineering-lifecycle-optimization/publishing/)


# Gerenciamento de Projeto

De acordo com o PMBoK v6 as dez áreas que constituem os pilares para gerenciar projetos, e que caracterizam a multidisciplinaridade envolvida, são: Integração, Escopo, Cronograma (Tempo), Custos, Qualidade, Recursos, Comunicações, Riscos, Aquisições, Partes Interessadas. Para desenvolver projetos um profissional deve se preocupar em gerenciar todas essas dez áreas. Elas se complementam e se relacionam, de tal forma que não se deve apenas examinar uma área de forma estanque. É preciso considerar, por exemplo, que as áreas de Escopo, Cronograma e Custos estão muito relacionadas. Assim, se eu amplio o escopo de um projeto eu posso afetar seu cronograma e seus custos.

## Gerenciamento de Tempo

Com diagramas bem organizados que permitem gerenciar o tempo nos projetos, o gerente de projetos agenda e coordena tarefas dentro de um projeto para estimar o tempo necessário de conclusão.

![Diagrama de rede simplificado notação francesa (método francês)](img/02-diagrama-rede-simplificado.png)

O gráfico de Gantt ou diagrama de Gantt também é uma ferramenta visual utilizada para controlar e gerenciar o cronograma de atividades de um projeto. Com ele, é possível listar tudo que precisa ser feito para colocar o projeto em prática, dividir em atividades e estimar o tempo necessário para executá-las.

![Gráfico de Gantt](img/02-grafico-gantt.png)

## Gerenciamento de Equipe

O gerenciamento adequado de tarefas contribuirá para que o projeto alcance altos níveis de produtividade. Por isso, é fundamental que ocorra a gestão de tarefas e de pessoas, de modo que os times envolvidos no projeto possam ser facilmente gerenciados. 

![Simple Project Timeline](img/02-project-timeline.png)

## Gestão de Orçamento

O processo de determinar o orçamento do projeto é uma tarefa que depende, além dos produtos (saídas) dos processos anteriores do gerenciamento de custos, também de produtos oferecidos por outros processos de gerenciamento, como o escopo e o tempo.

![Orçamento](img/02-orcamento.png)
