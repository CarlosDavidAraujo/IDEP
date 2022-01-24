const { candidataUsuarioParaVaga, auth } = require('../functions/User');
const { consultaVagasMaisRecentes, consultaTodasVagas, paginador } = require('../functions/Vaga');

let localidades =   [
    { name: 'Acaracuzinho' },
    { name: 'Alto Alegre I' },
    { name: 'Alto Alegre II' },
    { name: 'Alto da Mangueira' },
    { name: 'Antônio Justa' },
    { name: 'Boa Esperança' },
    { name: 'Boa Vista' },
    { name: 'Cágado' },
    { name: 'Coqueiral' },
    { name: 'Centro' },
    { name: 'Cidade Nova' },
    { name: 'Distrito Industrial I' },
    { name: 'Furna da Onça' },
    { name: 'Horto' },
    { name: 'Industrial' },
    { name: 'Jaçanaú' },
    { name: 'Jardim Bandeirantes' },
    { name: 'Jardim das Maravilhas' },
    { name: 'Jari' },
    { name: 'Jenipapeiro' },
    { name: 'Jereissati' },
    { name: 'Jatobá' },
    { name: 'Luzardo Viana' },
    { name: 'Menino Jesus de Praga' },
    { name: 'Mucunã' },
    { name: 'Novo Jenipapeiro' },
    { name: 'Novo Maracanaú' },
    { name: 'Novo Oriente' },
    { name: 'Olho D’Água' },
    { name: 'Pajuçara' },
    { name: 'Pajuçara Park' },
    { name: 'Pau-Serrado' },
    { name: 'Parque Tijuca' },
    { name: 'Parque Tropical' },
    { name: 'Parque Santa Maria' },
    { name: 'Piratininga' },
    { name: 'Santo Antônio' },
    { name: 'Santo Sátiro' },
    { name: 'Timbó' },
    { name: 'Vila Buriti' }
  ]

module.exports = {
    getVagas: (req, res) => {
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, 1, 10)
            res.render('paginas/vaga/index', {localidades, paginator });
        });
    },

    postVagas: (req, res) => {
        consultaTodasVagas().then((vaga) => {
            const paginator = paginador(vaga, req.body.pagina, 10)
            res.render('paginas/vaga/index', { paginator });
        });
    },

    getHomeVagas: (req, res) => {
        consultaVagasMaisRecentes(3).then((vaga) => {
            res.render('paginas/home/index', { vaga });
        });
    },

    postHomeVagas: (req, res) => {
        const user_id = auth.currentUser.uid;
        candidataUsuarioParaVaga(req.body.vaga_id, user_id).then(() => {
            res.redirect('/user/perfil')
        })
    },

    getParceiros: (req, res) => {
        res.render('paginas/parceiros/index')
    }
}

