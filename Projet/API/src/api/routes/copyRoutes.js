module.exports = function(app, copyController) {
    app.route('/books/:bookId/copies')
        .get(copyController.getAll.bind(copyController))
        .post(copyController.create.bind(copyController));

    app.route('/books/:bookId/copies/:copyId')
        .get(copyController.get.bind(copyController))
        .put(copyController.update.bind(copyController))
        .delete(copyController.delete.bind(copyController));
}