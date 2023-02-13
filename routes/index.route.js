const userRoute = require('./user.route');

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });

    //user routes
    userRoute.getUser(app);
    userRoute.getAllUsers(app);
    userRoute.createUser(app);
    userRoute.updateUser(app);
    userRoute.deleteUser(app);
}