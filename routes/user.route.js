const { verifyUser } = require('../middlewares/index.middleware');
const userController = require('../controllers/user.controller');

module.exports = {
    getAllUsers(app) { app.get("/api/user", userController.getAllUsers) },
    getUser(app) { app.get('/api/user/:id', userController.getUser) },
    createUser(app) { app.post('/api/user/create', [verifyUser.checkDuplicateEmail], userController.createUser) },
    updateUser(app) { app.put('/api/user/:id/update', userController.updateUser) },
    deleteUser(app) { app.delete('/api/user/:id/delete', userController.deleteUser) }
}