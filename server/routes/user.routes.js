const UserController = require('../controllers/user.controller');
const {authenticate} = require('../config/jwt.config');

module.exports = (app) => {
    app.post('/api/user/register',  UserController.register);
    app.post('/api/user/login', UserController.login);
    app.post('/api/user/logout', UserController.logout);
    app.get('/api/user/loggedin', authenticate, UserController.loggedIn);
    app.get('/api/user/:id', authenticate, UserController.getUser);
    app.get('/api/user/:id/habits', authenticate, UserController.getUserHabits)
};