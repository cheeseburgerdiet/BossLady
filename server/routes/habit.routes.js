const HabitController = require('../controllers/habit.controller');
const {authenticate} = require('../config/jwt.config');


module.exports = (app) => {
    app.get('/api/habit', HabitController.sortHabitsbyUser);
    app.post('/api/habit', authenticate, HabitController.create);
    app.get('/api/habit/:id', HabitController.viewOneHabit);
    app.put('api/habit/:id', HabitController.update);
    app.delete('/api/habit/:id', authenticate, HabitController.deleteHabit);
};