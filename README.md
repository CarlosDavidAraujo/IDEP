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

|                                            |   Tabela de requisitos e suas respectivas funções/classes    |                                           |  
|--------------------------------------------|--------------------------------------------------------------|-------------------------------------------|
| Código                                     | Funcionalidade                                               | Local                                     |
| RF0001                                     | Acessar a página inicial                                     | controllers/vaga-controller: getHomeVagas |
| RF0002                                     | Visualizar vagas mais recentes na tela inicial               | NÃO INICIADO                              |
| RF0003                                     | Visualizar vagas disponíveis no sistema                      | controllers/vaga-controller: getVagas     |
| RF0004                                     | Ver detalhes das vagas                                       | functions/Vaga: consultaVagas             |
| RF0005                                     | Pesquisar por vagas                                          | NÃO INICIADO                              |
| RF0006                                     | Visualizar empresas parceiras da OSC na tela inicial         | NÃO INICIADO                              |
| RF0007                                     | Visualizar descrição sobre as modalidades na tela inicial    | NÃO INICIADO                              |
| RF0008                                     | Visualizar mapa com local da OSC na tela inicial             | NÃO INICIADO                              |
| RF0009                                     | Cadastrar-se no sistema (Candidato)                          | functions/User: cadastraUsuario           |
| RF0010                                     | Fazer login                                                  | functions/User: fazLogin                  |
| RF0011                                     | Fazer logout                                                 | functions/User: logout                    |
| RF0012                                     | Alterar e-mail                                               | functios/User: editaPerfil                |
| RF0013                                     | Alterar senha                                                | functions/User: resetPassowrd             |
| RF0014                                     | Candidatar-se à uma vaga                                     | functions/User: candidataUsuarioParaVaga  |
| RF0015                                     | Cancelar candidatura                                         | functions/User: cancelaCandidatura        |
| RF0016                                     | Visualizar vagas submetidas no perfil                        | functions/User: mostraCandidatura         |
| RF0017                                     | Ver detalhes de progresso e informações das vagas submetidas | functions/User: mostraCandidatura         |
| RF0018                                     | Editar dados de cadastro                                     | functions/User: editaPerfil               |
| RF0019                                     | Fazer login como administrador                               | functions/User: fazLogin                  |
| RF0020                                     | Adicionar vaga                                               | functions/Vaga: adicionaVaga              |
| RF0021                                     | Editar vagas                                                 | NÃO INICIADO                              |
| RF0022                                     | Fechar vagas                                                 | NÃO INICIADO                              |
| RF0023                                     | Visualizar vagas fechadas                                    | NÃO INICIADO                              |
| RF0024                                     | Visualizar candidatos                                        | NÃO INICIADO                              |
| RF0025                                     | Buscar candidatos por vaga com uso de filtro                 | NÃO INICIADO                              |
| RF0026                                     | Alterar status dos candidatos                                | NÃO INICIADO                              |
| RF0027                                     | Gerar gráfico com panorama de perfis dos usuários            | NÃO INICIADO                              |
