const { getAuth } = require("firebase/auth");
const auth = getAuth();

module.exports = {
    requireUser: (req, res, next) => {
        if (auth.currentUser) {
            return next();
        }
        else {
            return res.redirect('/user/login')
        }
    },

    requireNoUser: (req, res, next) => {
        if (auth.currentUser) {
            return res.redirect('/user/perfil')
        }
        else {
            return next();
        }
    },

    changeButton: (req, res, next) => {
        if (auth.currentUser) {
            res.locals.changeButton = true;
        }
        else {
            res.locals.changeButton = false;
        }
        next();
    }
}

