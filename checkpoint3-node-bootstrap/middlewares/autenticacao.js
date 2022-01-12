<<<<<<< HEAD
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

=======
import { getAuth } from "firebase/auth"
const auth = getAuth();

export const requireUser = (req, res, next) => {
    if (auth.currentUser) {
        return next();
    }
    else {
        return res.redirect('/user/login')
    }
}

export const requireNoUser = (req, res, next) => {
    if (auth.currentUser) {
        return res.redirect('/user/perfil')
    }
    else {
        return next();
    }
}

export const changeButton = (req, res, next) => {
    if (auth.currentUser) {
        res.locals.changeButton = true;
    }
    else {
        res.locals.changeButton = false;
    }
    next();
}


>>>>>>> 00eef85c7672fd56ab6c45e177e941100399a89e
