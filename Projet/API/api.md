# Création d'une API de gestion de bibliothèque

## Conception de l'API

### Définition des ressources

Je veux créer une API REST pour gérer ma bibliothèque, quelles sont les ressources qui pourraient composer ma bibliothèque ?

Voici les fonctionnalités que je souhaite

- Chercher et consulter des livres
- Chaque livre peut avoir plusieurs copies
- Un utilisateur peut emprunter un livre
- Consulter la disponibilité d'un livre
- Consulter les emprunts d'un utilisateur

### Modélisation des ressources

Quelles sont les différentes URI qui vont composer mon API ?

### Définition des entités

Quel est le format de mes différentes entités ?

## Implémentation

### Récupération du projet

Ouvrir une console `Git Bash` et exécuter la commande:

``` sh
git clone https://github.com/smart-rest/service-web.git
```

Vous allez récupérer le répertoire Git qui contient le projet. Laissez la console ouverte, nous allons l'utiliser par la suite.

### Description

Nous allons utiliser NodeJS pour créer une API RESTful. NodeJS est un environnement d'exécution Javascript largement utilisé dans le monde open-source, notamment pour son écosystème de librairies permettant des développements web rapides.

La librairie `express` permet l'implémentation du serveur HTTP responsable de traiter les requêtes des clients du service.

Nous allons également utiliser la librairie `node-json-db` pour simuler une base de données. Au lieu de sauvegarder nos données dans une base de données SQL classique, cette librairie sauvegarde nos données sous la forme d'un objet Javascript stocké dans un fichier au format JSON.

### Lancement du projet

Naviguez dans le projet depuis la console `Git Bash` pour arriver dans le dossier du projet.

``` sh
cd service-web/Projet/API/
```

puis exécutez la commande suivante pour initialiser le projet

``` sh
npm install
```

`npm` (Node Package Manager) est le gestionnaire de package de NodeJS. La commande précédente va récupérer les packages nécessaires au projet sur le web. Les packages nécessaires ont été définis au préalable dans le fichier `package.json`.

Enfin exécutez la commande suivante pour lancer le serveur

``` sh
npm start
```

Ouvrez maintenant votre navigateur et naviguez sur l'adresse suivante

``` http
http://localhost:3000/books
```

Vous obtenez la collection actuelle de livres. La gestion des livres a déjà été créée pour vous afin de vous faciliter le travail. Essayez de récupérer tous les livres, puis un seul puis d'en créer un, de le modifier et de le supprimer via une requête dans Postman. Essayez également de créer un livre sans nom.

Note: Le serveur peut être arrêté dans le terminal en pressant `Ctrl+C` (cela prend parfois un peu de temps).

### Exploration du code

#### Ouverture du projet

Ouvrez maintenant le dossier du TP2 dans votre éditeur Javascript. Pour VS Code, vous pouvez par exemple exécuter la command suivante dans votre terminal Bash si celui-ci est déjà dans le dossier du projet (Ouverture de VS Code dans le dossier courant).

``` sh
Code .
```

Note: vous pouvez ouvrir un terminal directement dans Visual Studio Code. Il est possible d'utiliser le bash Git en changeant les paramètres de l'utilisateur.

Taper `Ctrl+Shift+P`, puis `Open Settings (JSON)` dans l'invite de commande. Dans le fichier JSON ouvert, ajouter la ligne ci-dessous après l'accolade d'ouverture `{`

``` json
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
```

#### Organisation

Ouvrez le dossier `src` qui contient les sources de notre serveur. Nous avons un sous-dossier `api` qui se charge des interactions HTTP avec l'extérieur et un sous-dossier `repositories` qui contient la logique des interactions avec la base de donnée (ici notre fichier JSON).

Enfin le fichier `server.js` est responsable du lancement du serveur proprement dit.

#### Repositories

Ouvrez le fichier `repositories/bookRepository.js`. Ce fichier contient la classe `BookRepository` avec des fichiers pour exécuter les différentes actions en lien avec la ressource `livre`. L'objet `db` passé en paramètre du contructeur de la classe est un objet de la librairie `node-json-db` pour lire/modifier nos données dans le fichier JSON qui nous sert de base de données.

La fonction `checkBook` permet de vérifier si un livre possède un nom avant de le créer ou de le mettre à jour.

Notez également la partie `module.exports = BookRepository;` en bas du fichier. Cette instruction permet l'export de notre classe pour être utilisée dans d'autres fichiers.

Nous importons d'ailleurs 2 librairies dans ce code.

``` js
const { v4: uuid } = require('uuid');
const _ = require('lodash');
```

La librairie `uuid` permet de générer de IDs aléatoires. Nous nous en servons ici pour générer les IDs de nos livres. Nous aurions également pu utiliser les noms de nos livres comme ID. Cependant la complexité aurait été augmentée car il aurait fallu formater ce nom (tous les charactères ne sont pas autorisés dans les URL) ainsi que gérer les cas d'erreur si l'ID existe déjà.

La librairie `lodash` contient un ensemble de fonctions utilitaires. Nous nous en servons ici pour retrouver les livres en fonction de leur ID. Dans une application plus classique, nous aurions utilisé un filtre dans une requête SQL ou via un ORM afin de récupérer, mettre à jour ou supprimer l'élément dont nous avions besoin.

#### Controllers

Naviguez maintenant dans le dossier `api/controllers`. Les controllers sont les objets qui sont responsables de traiter une requête HTTP et de renvoyer un réponse appropriée. Ouvrez le fichier `bookController.js`. Il implémente la classe `BookController` contenant des méthodes pour chacune des opérations sur la ressource `livre`. Chacune de ses méthodes prend en entrée les paramètres `req` et `res`. `req` contient les données de la requête (request) et `res` permet de définir la réponse à renvoyer (response).

- `req.params.bookId` permet de récupérer l'id du livre dans l'url de la requête ;
- `res.status(xxx)` définit le code réponse envoyé au client. L'instruction `.send(xxx)` définit le corps de la réponse. On peut noter que pour la usppression, nous ne renvoyons rien ;
- `res.location(xxx)` permet de définir le header `Location` dans la réponse après la création d'un objet. Il indique au client comment accéder à la ressource créée.

Notez également que le répertoire précédemment vu est injecté dans le constructeur du controller. Il permet de réaliser les opérations voulues par le controller.

#### Routes

Dans le fichier `bookRoutes.js`, les URL vers les ressources sont définies ainsi que les actions possibles sur ces ressources. On peut voir que les action GET et POST sont définies sur la ressource `/books`. Notez que cette fois, ce n'est pas une classe que nous exportons depuis le fichier mais simplement une fonction. Cette fonction sera donc directement utilisable dans un autre fichier. Elle prend en paramètre `app` qui est notre serveur `express` et le controlleur définit précédemment.

Notez l'URL utilisé pour la ressource "livre individuel": `/books/:bookId`. `:bookId` vient préciser que cette partie de l'URL est dynamique. Cela définit un paramètre qui est ensuite utilisable dans le controlleur: le fameux `req.params.bookId`. Attention !!! Le nom du paramètre dans cette URL doit être identique avec celui récupéré dans le controlleur (`bookId` ici). En effet, nous pourrions avoir des URL avec plusieurs paramètres.

Pour chaque action, on précise quelle fonction est utlisée pour traiter la requête et créer la réponse. Les fonctions que nous renseignons ici sont les fonction du `bookController`: `bookController.getAll`, `bookController.update`. Notez qu'il est nécessaire d'ajouter `.bind(bookController)` après chacune des méthodes. Nous ne rentrerons pas ici en détail sur les raisons de cette syntaxe (lié au fonctionnement du `this` en javascript). Vous devrez utiliser la même syntaxe dans la suite du projet donc faites attention à ne pas l'oublier dans la suite.

#### server.js

Ouvrez le fichier `server.js`. Il contient la logique pour démarrer notre code. Il commence par un série d'instruction d'import. Nous importons tous les fichiers que nous avons créé précédemment ainsi que les librairies dont nous aurons besoin.

Création de la "base de données" depuis le fichier `library.json` puis création de notre répertoire et de notre controlleur de livre.

``` js
const db = new JsonDB("./data/library", true, true);
const bookRepository = new BookRepository(db);
const bookController = new BookController(bookRepository);
```

Configuration de nos routes HTTP: `bookRoutes(app, bookController);`

Pour la gestion des erreurs, nous renvoyons le code 403 et le message d'erreur si l'erreur a été marquée comme étant une erreur client. Lorsque nous levons une erreur de type `ValidationError`, le client sera alors informé que sa requête est incorrecte.

Sinon nous renvoyons une erreur 500 en masquant le véritable message. Ce type d'erreur est anormal et sous-entend un bug dans notre code.

``` js
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
```

Les autres lignes du fichier peuvent être ignorées. Elles créent le serveur `express`, le configurent pour interpréter le contenu des requêtes comme étant du JSON et enfin elles démarrent le serveur sur le port 3000;

### Gestion des utilisateurs

Essayez de faire une requête GET et POST sur l'URL `localhost:3000/users`. L'implémentation n'est pas finie !!! A vous de jouer.

Avant de commencer, si votre serveur est toujours lancé, arrêtez le. Vous allez ensuite le relancer avec la commande `npm run dev`. Cette commande lance le serveur comme précédemment mais ajoute également un "watcher" sur votre code. A chaque modification de celui-ci, le serveur sera relancé. Cela permet à votre serveur d'être tout le temps à jour avec vos dernières modifications.

#### Repository

Créez un fichier `userRepository.js` dans le dossier repositories. Implémentez les fonctionnalités nécessaires en vous inspirant de `bookRepository.js`. Dans la base de données, les utilisateurs devront être créés dans `/users` au lieu de `/books`. Vous pouvez également vérifier que les utilisateurs ont bien un nom (`name`) ainsi qu'un age (`age`).

#### Controller

Créez un fichier `userController.js` dans le dossier controllers. Implémenter les fonctionnalités en vous inspirant de `bookController.js` et en utilisant le répertoire d'utilisateurs.

#### Routes

Modifiez le fichier `userRoutes.js` dans le dossier routes. L'API doit gérer les opérations définies précédemment en se servant du controlleur d'utilisateurs.

#### server.js

Importez les fonctionnalités ci-dessus.

``` js
const UserController = require('./api/controllers/userController');
const UserRepository = require('./repositories/userRepository');
```

Créez vos objets.

``` js
const userRepository = new UserRepository(db);
const userController = new UserController(userRepository);
```

Et enfin, modifiez la ligne qui configure les routes en vous servant de ce controlleur.

#### Utilisation

Utilisez Postman pour créer votre utilisateur. Il devra avoir les propriétés `name`, `age`.

### Gestion des exemplaires

#### Repository

Modifiez le fichier `copyRepository.js` dans le dossier repositories. **Les exemplaires sont liés à un livre**. Toutes les fonctions créées précédemment pour les autres répertoires devront cette fois-ci prendre en paramètre également un `bookId` afin de pouvoir récupérer, modifier, ajouter les exemplaires d'un livre donné.

Une copie doit avoir la propriété `submissionDate`.

Les chemins à utiliser avec `node-json-db` devront avoir cette forme:

- `/books[bookIndex]/copies`
- `/books[bookIndex]/copies[]`
- `/books[bookIndex]/copies[copyIndex]`

La fonction `getIdPath` a déjà été créée pour vous faciliter le travail.

#### Controller

Créez le fichier `copyController.js` dans le dossier controllers. Implémentez les fonctionnalités en vous inspirant des controlleurs précédents. Notez que dans vos routes, vous devrez prévoir 2 paramètres: `bookId` et `copyId`.

#### Routes

Créez le fichier `copyRoutes.js` dans le dossier routes. L'API doit gérer les opérations définies précédemment (attention aux paramètres `bookId` et `copyId`).

Les URLs devront avoir la forme suivante: `/books/:bookId/copies/:copyId`

#### server.js

Implémentez les fonctionnalités nécessaires dans le fichier principal. Attention, le `CopyRepository` nécessite un `BookRepository` en paramètre de son constructeur.

#### Utilisation

Utilisez Postman pour créer 2 exemplaires au livre 1984. Ils devront avoir la propriété suivante `submissionDate`.

## Gestion des emprunts

A vous de jouer pour implémenter les fonctionnalités liées à la gestion des emprunts via l'URL `/loans`. Un emprunt doit avoir en paramètre un exemplaire de livre (celu-ci doit être disponible) ainsi qu'un utilisateur. Nous sauvegarderons cet emprunt de la même façon qu'un livre ou qu'un utilisateur.

Voici quelques conseils.

- L'objet emprunt devra contenir les 3 propriétés `copyId`, `userId`, `loanDate`
- Il est inutile de prévoit une mise à jour d'un emprunt
- Vous devez vérifier que l'utilisateur existe
- Vous devez vérifier que la copie existe
- Vous devez vérifier que cette copie n'est pas déjà empruntée. Nous pourront utiliser la commande suivante de lodash (vous devez charger tous les emprunt d'abord)

``` js
if (_.some(loans, { copyId: loan.copyId })) { 
    throw new ValidationError('This copy is already loaned.');
}
```

Essayez enfin d'implémenter les ressources suivantes `GET /users/{id}/loans`, `GET /books/{id}/availableCopies`. Ces ressources sont en lecture seule. Elle pointe en fait vers la ressource `loan` avec un filtre sur le user ou sur le livre.

Conseils:

- les routes peuvent êtres définies soit dans `userRoutes` et `bookRoutes`, soit dans `loanRoutes`
- ajoutez le `copyRepository` au constructeur du `loanRepository` et définissez deux nouvelles fontions dans cette classe pour effectuer les deux chargement
- La liste des emprunts d'un utilisateur peut se récupérer comme ceci (après avoir charger la totalité des emprunts et en ayant un variable nommée `userId`)

``` js
_.filter(loans, { userId });
```

- pour la liste des copies disponibles pour un livre, veuillez d'abord charger la liste de toutes les copies du livre puis la liste des tous les emprunts puis exécutez

``` js
_.filter(copies, ({ id }) => !_.some(loans, { copyId: id }));
```
