module.exports = function(app, bookController) {
    app.route('/books')
        .get(bookController.getAll.bind(bookController))
        .post(bookController.create.bind(bookController));
    
    app.route('/books/:bookId')
        .get(bookController.get.bind(bookController))
        .put(bookController.update.bind(bookController))
        .delete(bookController.delete.bind(bookController));
}