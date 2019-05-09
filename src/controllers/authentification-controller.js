const User = require('../models/user');
const lodash = require('lodash');
const jwt = require('jwt-simple')
const config = require('../config/config')

function getToken(user) {
    const timeStamp = new Date().getTime();
    return jwt.encode({
        sub: user.id,
        iat: timeStamp
    }, config.secret)
}

module.exports = {
    readAll(req, res, next) {
        res.send("salut");
    },

    readUser(req, res) {
        const { id } = req.params;
        User.findById(id).then((user) => {
            res.send(user)
        })
    },

    signup(req, res, next) {
        const { email, password } = req.body;
        User.findOne({ email: email }, function (err, existingUser) {
            if (err) { // remplace le catch
                return next(err);
            }
            if (existingUser) {
                return res.status(422).send({ error: "Email already used" }) //422 code error already exist
            }
            if (!lodash.isEmpty(email) && !lodash.isEmpty(password)) {
                const user = new User({
                    email: email,
                    password: password
                })

                user.save(function (err) {
                    if (err) {
                        return next(err);
                    }
                    res.json({ token: getToken(user) });
                })
            } else {
                return res.status(422).send({ error: "Mot de passe ou email vide" })
            }
        })
    },

    signin(req, res, next) {
        res.json({ token: getToken(req.user) });
    },

    delete(req, res, next) {
        const { id } = req.body;
        User.findByIdAndDelete(id).then((user) => {
            res.send({ result: "ok" });
        })
    }
}