const AuthentificationController = require('../controllers/authentification-controller')
require('../services/passport')
const passport = require('passport')

const requireToken = passport.authenticate('jwt');


module.exports = (server) => {


    server.post('/signup', AuthentificationController.signup);

    server.get('/secure', requireToken, function (req, res) {
        res.send({ message: "Requete sécurisé YEAHHHH !!!!" });
    })

    server.post('/signin', AuthentificationController.signin);

}