const ValidationError = require("./validationError");

class CopyRepository {
    constructor(db, bookRepository) {
        this.db = db;
        this.bookRepository = bookRepository;
    }

    getAll(bookId) {
        const bookPath = this.bookRepository.getIdPath(bookId);
        if (bookPath == null) {
            throw new ValidationError('This book does not exists')
        }

        return this.db.getData(bookPath + '/copies');
    }

    getIdPath(bookId, id) {
        const copies = this.getAll(bookId);
        const index = _.findIndex(copies, { id });
        if (index == -1) {
            return null;
        }

        const bookPath = this.bookRepository.getIdPath(bookId);
        return bookPath +'/copies[' + index + ']';
    }

    add(bookId) {
        copy.id = uuid();
        copy.submissionDate = new Date().toDateString(); // Today
        this.db.push("/books[" + bookId + "]/copies", copy);

        console.log(copy);

        return copy;
    }
    
    get(bookId) {
        const copies = this.getAll();
        return _.find(copies, { bookId });
    }

    update(bookId, copy) {
        if (copy.id !== bookId)
            throw new ValidationError('You cannot change the id.');

        const path = this.getIdPath(bookId);
        if (path == null) 
            throw new ValidationError('This copy does not exists');    
        
        this.db.push(path, copy);
    }

    delete(bookId) {
        const path = this.getIdPath(bookId);
        if (path != null)
            this.db.delete(path);
    }
}

module.exports = CopyRepository;