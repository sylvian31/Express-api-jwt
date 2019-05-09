const AuthentificationController = require('../controllers/authentification-controller')
require('../services/passport')
const passport = require('passport')

const requireToken = passport.authenticate('jwt', { session: false });
const requireValidCredentials = passport.authenticate('local', { session: false });

module.exports = (server) => {


    server.post('/signup', AuthentificationController.signup);

    server.get('/ressourceSecret', requireToken, function (req, res) {
        res.send({ code: 42 });
    })

    server.post('/signin', requireValidCredentials, AuthentificationController.signin);

}