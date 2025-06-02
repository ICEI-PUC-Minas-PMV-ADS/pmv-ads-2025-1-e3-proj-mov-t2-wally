# Registro de Testes de Software

**Data do Registro:** 31/05/2025

**Versão do Software:** 4.0


| Caso de Teste                      | Requisito | Objetivo                                                     | Critérios de Aceitação                                                              | Método          | Resultado | 
| ---------------------------------- | --------- | ------------------------------------------------------------ | ----------------------------------------------------------------------------------- | --------------- | --------- | 
| CT-01 – Login                      | RF-001    | Autenticação com e-mail e senha                              | Usuário é autenticado e acessa tela inicial com permissões corretas.                | Teste funcional | O usuário consegue fazer login.|             
| CT-02 – Recuperação de Senha       | RF-002    | Envio de link e redefinição de senha                         | Link enviado ao e-mail em ≤1 min e usuário redefine senha com sucesso.              | Teste funcional |   O usuário consegue recupear senha. |             
| CT-03 – Cadastro de Usuário        | RF-003    | Registro de novo usuário                                     | Conta criada e mensagem de boas-vindas exibida.                                     | Teste funcional |   O usuário consegue se cadastrar.          |             
| CT-04 – Edição de Perfil           | RF-004    | Alterar nome, foto ou senha no perfil                        | Perfil é atualizado e permanece após logout/login.                                  | Teste funcional |  O usuário consegue modificar e salvar as alterações no perfil. |           
| CT-05 – Adicionar Transação        | RF-005    | Inclusão de receitas e despesas                              | Transação aparece no extrato com dados corretos (valor, data, nome).                | Teste funcional |     O usuário consegue adicionar transações.      |             
| CT-06 – Exibir Extrato             | RF-006    | Visualizar todas as transações do usuário                    | Todas transações cadastradas são exibidas corretamente na tela de extrato.          | Teste funcional |   O usuário consegue visualizar o extrato.   |             
| CT-07 – Filtrar Transações         | RF-007    | Filtrar por nome, valor ou tipo de transação                 | Apenas as transações que correspondem ao filtro são mostradas.                      | Teste funcional |  O usuário consegue filtrar as transações.  |            
| CT-08 – Calcular Saldo Total       | RF-008    | Cálculo automático de saldo, receitas e despesas             | Valores de saldo, receitas e despesas conferem com transações cadastradas.          | Teste funcional | O usuário visualiza corretamente. |             
| CT-09 – Seleção de Período         | RF-009    | Escolher mês e ano na tela inicial                           | Extrato e saldos exibem corretamente o período selecionado.                         | Teste funcional |  O usuário consegue realizar a ação.  |             
| CT-10 – Criar Grupo                | RF-010    | Criação de grupo para divisão de despesas                    | Grupo é criado com nome e participantes informados e listado na tela.               | Teste funcional |    O usuário consegue criar grupos.         |             
| CT-11 – Adicionar Despesa ao Grupo | RF-011    | Inclusão de despesa em grupo com divisão entre participantes | Despesa aparece no histórico do grupo com valores divididos corretamente.           | Teste funcional |  O usuário consegue adicionar despesas ao grupo.          |             
| CT-12 – Calcular Saldo Individual  | RF-012    | Cálculo de saldo para cada participante                      | Saldos individuais são calculados e exibidos corretamente após divisão de despesas. | Teste funcional |   Responsivo.        |            
| CT-13 – Histórico de Despesas      | RF-013    | Exibir histórico de despesas do grupo                        | Lista completa de despesas do grupo é apresentada.                                  | Teste funcional |    O usuário visualiza corretamente.        |             
| CT-14 – Adicionar Membros ao Grupo | RF-014    | Inclusão de novos participantes em grupo                     | Novos membros são adicionados e listados no grupo.                                  | Teste funcional |   Responsivo.             |             
| CT-15 – Listar Grupos              | RF-015    | Exibir lista de grupos do usuário                            | Todos os grupos existentes são apresentados na tela de Grupos.                      | Teste funcional |   O usuário visualiza corretamente.        |             
| CT-16 – Exibir Tela Inicial        | RF-016    | Verificar apresentação da tela inicial                       | Elementos visuais aparecem corretamente.     | Teste funcional |   O usuário visualiza corretamente.         |             


## Avaliação Geral

Os testes apresentaram boa responsividade, com a aplicação funcional e atendendo as expectativas até o momento.
