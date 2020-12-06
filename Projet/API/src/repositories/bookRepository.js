const { v4: uuid } = require('uuid');
const _ = require('lodash');
const ValidationError = require('./validationError');

const checkBook = function(book) {
    if (!book.name) {
        throw new ValidationError('The book must have a name.');
    }
}

class BookRepository {
    constructor(db) {
        this.db = db;
    }

    getAll() {
        return this.db.getData("/books");
    }

    add(book) {
        checkBook(book); 
        book.id = uuid();
        book.copies = []; // initialize empty copy array
        this.db.push("/books[]", book);

        return book;
    }

    get(id) {
        const books = this.getAll();
        return _.find(books, { id });
    }

    update(id, book) {
        if (book.id !== id) {
            throw new ValidationError('You cannot change the identifier.');
        }

        checkBook(book); 
        const path = this.getIdPath(id);
        if (path == null) {
            throw new ValidationError('This book does not exists');
        }

        this.db.push(path, book);

        return book;
    }

    delete(id) {
        const path = this.getIdPath(id);
        if (path != null) {
            this.db.delete(path);
        }
        
    }

    getIdPath(id) {
        const books = this.getAll();
        const index = _.findIndex(books, { id });
        if (index == -1) {
            return null;
        }

        return '/books[' + index + ']';
    }
}

module.exports = BookRepository;