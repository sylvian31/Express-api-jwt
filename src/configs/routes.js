UserController = require('../controllers/user-controller')

module.exports = (server) => {

    server.get('/', UserController.readAll);

}