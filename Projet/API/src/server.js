// Import des librairies
const express = require('express');
const cors = require('cors');
const { JsonDB } = require('node-json-db');
const bodyParser = require('body-parser');

// Import de nos objets
const bookRoutes = require('./api/routes/bookRoutes');
const userRoutes = require('./api/routes/userRoutes');

const BookController = require('./api/controllers/bookController');

const BookRepository = require('./repositories/bookRepository');

// Création de nos objets
const db = new JsonDB("./data/library", true, true);
const bookRepository = new BookRepository(db);
const bookController = new BookController(bookRepository);
/* A compléter */

// Création du serveur
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuration des routes
bookRoutes(app, bookController);
userRoutes(app, null /* A modifier */);
/* A compléter */


function errorHandler(err, req, res, next) {
    console.error(err);
    if (err.isClientError) {
        res.status(403).send({ message: err.message });
    }
    else {
        res.status(500).send({ message: 'Something went wrong' });
    }
}
app.use(errorHandler);
// Démarrage du serveur
app.listen(3000);
console.log('Library API started on port: 3000.');

