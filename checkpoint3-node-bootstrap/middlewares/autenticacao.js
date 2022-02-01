const { getAuth } = require("firebase/auth");
const auth = getAuth();
const { consultaDadosDoUsuario } = require('../functions/User')

module.exports = {
    requireUser: (req, res, next) => {
        if (auth.currentUser) {
            next();
        }
        else {
            res.redirect('/user/login')
        }
    },

    requireNoUser: (req, res, next) => {
        if (!auth.currentUser) {
            next();
        }
        else if (auth.currentUser && auth.currentUser.email == 'admin@gmail.com') {
            res.redirect('/admin/vagas')
        }
        else if (auth.currentUser && auth.currentUser.email != 'admin@gmail.com') {
            res.redirect('/user/perfil')
        }
    },

    requireAdmin: (req, res, next) => {
        if (auth.currentUser && auth.currentUser.email == 'admin@gmail.com') {
            next();
        } else {
            res.status(403).send('Não autorizado');
        }
    },

    requireNoAdmin: (req, res, next) => {
        if (auth.currentUser && auth.currentUser.email == 'admin@gmail.com') {
            res.redirect('/admin/vagas');
        } else if (!auth.currentUser || auth.currentUser && auth.currentUser.email != 'admin@gmail.com') {
            next();
        }
    },

    changeButton: (req, res, next) => {
        if (auth.currentUser) {
            res.locals.changeButton = true;
            consultaDadosDoUsuario().then((doc) => {
                res.locals.profileImg = doc.img_perfil;
            });
        }
        else {
            res.locals.changeButton = false;
        }
        next();
    },

    adminLogoutButton: (req, res, next) => {
        if (auth.currentUser && auth.currentUser.email == 'admin@gmail.com') {
            res.locals.adminLogoutButton = true;
        }
        else {
            res.locals.adminLogoutButton = false;
        }
        next();
    }
}

