# Projeto Integrado I - Levináticos

PARTICIPANTES: </br>
Carlos David Araújo Ventura </br>
Kevin Lucas Figueredo Gomes  </br>
Nillia Sousa da Silva </br>
Victor Emanuel Pegado De Lima </br>
Vinícius dos Santos Batista </br>

CLIENTE: </br>
Instituto Social para o Desenvolvimento de Potencialidades Humanas - IDEP Social

DESCRIÇÃO DO PROJETO: </br>
O IDEP é uma organização da sociedade civil - OSC, independente e sem fins lucrativos, fundada em 2012
a partir da idealização de um instituto que trabalhasse com a crença no potencial criativo e
inovador das pessoas, dando ênfase às temáticas relacionadas ao mundo do trabalho e aos
Direitos Humanos. Atualmente o Instituto trabalha principalmente com a administração de estágios e
jovens aprendizes. Nosso projeto tem como objetivo melhorar o processo de seleção
desses jovens para a entrada no mercado de trabalho, criando uma plataforma onde a
instituição possa divulgar as vagas em aberto naquele momento e os jovens possam
visualizar essas oportunidades e se inscreverem nas quais mais se identificam.

|        | Tabela de requisitos funcionais e suas respectivas classes/funções       |                                              |
|--------|--------------------------------------------------------------------------|----------------------------------------------|
| Código | Funcionalidade                                                           | Pasta/Arquivo > função                       |
| RF0001 | Cadastrar-se no sistema (Candidato)                                      | functions/User.js > cadastraUsuario          |
| RF0002 | Fazer login                                                              | functions/User.js > fazLogin                 |
| RF0003 | Fazer logout                                                             | functions/User.js > logout                   |
| RF0004 | Alterar e-mail                                                           | functions/User.js > editaPerfil              |
| RF0005 | Alterar senha                                                            | functions/User.js > resetSenha               |
| RF0006 | Visualizar vagas mais recentes na tela inicial                           | NÃO INICIADO                                 |
| RF0007 | Visualizar vagas disponíveis no sistema                                  | functions/Vaga.js > consultaVagas            |
| RF0008 | Pesquisar por vagas                                                      | NÃO INICIADO                                 |
| RF0009 | Ver detalhes das vagas                                                   | functions/Vaga.js > consultaVagas            |
| RF0010 | Candidatar-se à uma vaga  (Candidato)                                    | functions/User.js > candidataUsuarioParaVaga |
| RF0011 | Cancelar candidatura (Candidato)                                         | functions/User.js > cancelaCandidatura       |
| RF0012 | Visualizar perfil de com vagas submetidas (Candidato)                    | functions/User.js > mostraCandidatura        |
| RF0013 | Ver detalhes de progresso e informações das vagas submetidas (Candidato) | functions/User.js > mostraCandidatura        |
| RF0014 | Editar dados de cadastro (Candidato)                                     | functions/User.js > editaPerfil              |
| RF0015 | Visualizar empresas parceiras da ONG na tela inicial                     | NÃO INICIADO                                 |
| RF0016 | Visualizar informações sobre a ONG na tela inicial                       | NÃO INICIADO                                 |
| RF0017 | Visualizar descrição sobre as modalidades na tela inicial                | NÃO INICIADO                                 |
| RF0018 | Visualizar mapa com local da ONG na tela inicial (Onde estamos)          | NÃO INICIADO                                 |
| RF0019 | Adicionar vaga (ADMIN)                                                   | NÃO INICIADO                                 |
| RF0020 | Editar vaga  (ADMIN)                                                     | NÃO INICIADO                                 |
| RF0021 | Apagar vaga (ADMIN)                                                      | NÃO INICIADO                                 |
| RF0022 | Visualizar vagas fechadas (ADMIN)                                        | NÃO INICIADO                                 |
| RF0023 | Visualizar candidatos  (ADMIN)                                           | NÃO INICIADO                                 |
| RF0024 | Buscar candidatos por vaga com uso de filtro (ADMIN)                     | NÃO INICIADO                                 |
| RF0025 | Alterar status do candidato (emprega/não empregado) (ADMIN)              | NÃO INICIADO                                 |
| RF0026 | Gerar gráfico com panorama de perfil dos usuários                        | NÃO INICIADO                                 |
