AuthentificationController = require('../controllers/authentification-controller')

module.exports = (server) => {


    server.post('/signup', AuthentificationController.signup);

}