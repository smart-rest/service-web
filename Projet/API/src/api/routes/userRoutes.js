module.exports = function(app, userController) {
    app.route('/users')
        .get(userController.getAll.bind(userController))
        .post(userController.create.bind(userController));

    app.route('/users/:userId')
        .get(userController.get.bind(userController))
        .put(userController.update.bind(userController))
        .delete(userController.delete.bind(userController));
}