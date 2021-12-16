# Création d'une interface Web pour notre bibliothèque

## Description

Nous utilisons `angular` pour fabriquer notre client web. Angular est un framework javascript utilisé dans les SPA (Single Page Appication). Le principe d'une SPA est d'effectuer des manipulations du DOM (notre page internet) directement côté client (le navigateur) au lieu de recharger des pages entières. Cela permet donc une navigation plus fluide et surtout beaucoup plus rapide. En effet, une fois "l'application" web chargée, les seuls échanges avec le serveur sont les données dynamiques. Tout le reste (l'architecture des pages, les styles, les animations, la navigation entre les composants...) est statique, n'est chargé qu'une seule fois et peut-être mis en cache.

C'est là que notre API RESTful intervient. En effet, c'est au travers d'elle que la récupération des données va se faire. Le format de données JSON étant nativement compris par le javascript, il suffit de faire un simple appel HTTP sur l'URL voulue pour récupérer les données. Le corps (body) du message reçu constitue directement l'objet que nous allons utiliser dans l'application.

## Test du projet

Nous allons nous servir de l'API créée précédemment. Assurez-vous que l'API est toujours active puis ouvrez une autre console et lancez les commandes suivantes

``` sh
npm install
npm start
```

Votre site web est démarré. Il ne vous reste plus qu'à vous rendre sur la page indiqué dans la console <localhost:4200>. Lorsque vous modifiez un fichier, l'application sera automatiquement mise à jour et la page de votre navigateur sera également rafraichie.

Regardez comment le site est composé. Essayez par exemple d'emprunter un livre.

Regardez également les échanges réseaux dans votre console (filtrez sur les évènements de type XHR pour voir plus facilement les appels à l'API). Attention, tout n'est pas encore implémenté. Seuls les livres sont vraiment chargés.

## Organisation du projet

### Composants

Angular s'articule autour de composants. Chaque composant représente un bout de notre page. Chaque composant est composé de 3 fichiers

- un fichier `.ts`. C'est le code javascript de l'application. Cette extension représente en fait des fichiers TypeScript. C'est un langage créé par Microsoft et utilisé notamment dans Angular qui est du javascript auquel on a ajouté du typage statique. Ce code est transformé en javascript avant d'être envoyé au navigateur.
- un fichier `.html`. Il contient la strcture HTML du composant. Ce n'est en fait pas un simple fichier HTML. En effet, différentes instructions Angular peuvent être utilisées en plus du HTML standard. `*ngFor="let book of books"` permet par exemple d'itérer sur tous les objets du tableau `books`.
- un fichier `.css` qui contient les styles CSS du composant. Ici nos styles sont tous vides. Nous avons utilisé le framework CSS `bootstrap` pour les styles de notre mini-site afin s'accélérer le temps de développement de celui-ci.

Notre application contient 4 composants situés dans le dossier `src/app`.

- le composant principal `app` qui contient le corps de la page. Vous pouvez noter le code html `<router-outlet></router-outlet>` qui est un composant natif angular permettant de gérer la navigation entre les composants via URL. Il est possible de faire sans mais dans ce cas, impossible de naviguer via URL dans votre site web (par ex, mettre en favori une page précise ou revenir à la page précédente). Un routing existe entre les URL et les composants et se trouve dans le fichier `route.ts`.
- `book-list` représente la liste des livres de la page principale
- `book-loan` est le composant atteint lors de l'appui sur un bouton `loan`
- `user-selection` est le composant s'affichant dans la pop-up de la page d'emprunt

### Services

Des services sont utilisés par les différents composants afin de réaliser différents types d'action. Les services que nous avons créés sont des services d'accès au données. Ils sont présents dans le dossier `src/app/services`.

Commencez par ouvrir le service `book.service.ts` qui contient une implémentation complète de nos services REST. Notez d'abord les deux méthodes publiques `get` et `getAll` qui seront utilisées par nos composants. Elles utilisent le service `http`fourni par Angular, font un appel HTTP via la méthode `get` sur l'URL définie puis ensuite transforment le résultat en un objet `Book` ou un tableau d'objet `Book`.

Le type de retour des fonctions n'est pas `Book[]` ou `Book` mais `Observable<XXX>`. Les appels HTTP sont asynchrones et renvoient un objet "observable" (de al librairie `rxjs`). Lorsque la réponse est reçue, différentes opérations peuvent être chaînées à cet observable. Si vous êtes curieux, allez voir dans le composant `book-list`: dans le fichier `.ts`, nous stockons cet observable dans la variable `books$`. Celle-ci est ensuite utilisée dans le fichier `.html` via l'instruction `*ngIf="books$ | async as books"`. Cette instruction permet de ne pas afficher l'élément tant que l'évènement asynchrone n'est pas fini. Une fois celui-ci fini, on récupère le résultat (un `Book[]`) dans la variable `books` qui est utilisé dans la suite du HTML.

Regardez maintenant les autres services. Ils ne sont pas implémentés !! On utilise une fonction utilitaire pour créer un observable à partir d'objets statiques. A vous de jouer

## Implémentation

### User

Commencez par le service des utilisateurs (`user.service.ts`). Insiprez-vous du service de livre pour implémenter le `getAll`.

Vérifiez en créant des utilisateurs via Postman que ceux-ci sont bien récupérés.

### Copy

Continuez avec le service des exemplaires (`copy.service.ts`). Insiprez-vous du service de livre (notamment du `get` pour la construction de l'URL à partir de la variable d'entrée) pour implémenter le `getAvailable`.

Attention !! Nous ne voulons pas tous les exemplaires mais seulement ceux disponibles.

Vérifiez que celui fonctionne correctement en ajoutant des examplaires via Postman et en rechargeant les pages.

### Loan

Toutes les opérations précédentes étaient de la lecture de données. Cette fois-ci nous voulons utiliser la méthode HTTP POST. Cela se fait via l'utilisation de `this.http.post` à la place du code `of({})` actuellement utilisé. La méthode prend en paramètre une URL comme précédemment ainsi qu'un objet qui correspond au corps de notre requête. Testez d'abord un appel POST via Postman pour vérifier le format du corps à envoyer. Il a 4 paramètres obligatoires.

Notez également que le type de retour est `Observable<void>`. Nous ne nous occupons pas de la réponse ici (on pourrait récupérer l'emprunt créé pour l'afficher). Pour obtenir le bon type de retour pour la fonction nous utilisons la fonction `map(() => null)` qui renvoie `null` quelque soit la réponse.

Si vous avez du mal à faire fonctionner le post, ouvrez votre console pour observer la réponse de l'appel HTTP. Si vous avez conservé la partie `catchError((err) => { console.log(err); return null; })`, vous pouvez également voir l'erreur directement dans la console.

Testez maintenant votre application. Une fois un livre emprunté, quand vous retournez sur celui-ci, l'exemplaire doit avoir disparu.

### Gestion des exemplaires disponibles dans la page principale

Dans l'exercice précédent, nous avons emprunté tous les exemplaires d'un livre. Pourtant sur la page d'acceuil, il est toujours possible d'emprunter ce livre.

Dans le fichier `book-list.component.html`, notez le code `[ngClass]="{'disabled': book.copies.length === 0}"` dans le lien `Burrow` (élément de type `a`). Ce code signifie en angular: ajoute la classe CSS disabled si le nombre d'exemplaires du livre est 0.

Revenez maintenant dans `book-list.component.ts`. Le code `tap(this.addCopies.bind(this))` indique d'appeler la fonction `addCopies` avec les livres reçus avant de finir l'évènement. La fonction ajoute une copie fictive sur chaque livre. Essayez de remplacer la ligne `book.copies = [ new Copy('', '') ];` par `book.copies = [ ];`. Nous remplissons les copies avec un tableau d'exemplaire vide. Tous les boutons `Burrow` doivent être désactivés.

Supprimez maintenant cette ligne et décommentez les lignes suivantes.

``` js
this.copyService.getAvailable(book.id)
  .pipe(
    map(copies => book.copies = copies)
  )
  .subscribe();
```

On récupère les exemplaires disponibles pour chaque livres puis on ajoute ces exemplaires à l'objet `book`. Notez que cette implémentation n'est pas très efficace d'un point de vue réseau. En effet, nous devons faire un appel réseau supplémentaire pour chaque livre afin de récupérer ses examplaires. Si cette liste était longue, nous aurions énormémet d'appels concurrents, ce qui ralentirait grandement la vitesse de chargement de la page. C'est ce qu'on appelle l'under-fetching (nous ne récupérons pas toutes les informations nécessaires sur la ressource `books` en un seul appel).

Note: l'appel à la fonction `.subscribe()` est nécessaire ici pour déclancher la requête HTTP. Précédemment c'était le code `| async` dans les fichiers HTML qui le faisait pour nous.

### Liste des emprunts

#### Création du composant

A vous de créer votre propre page. Commencez par générer votre composant. Le client Angular permet la génération automatique de certains composants. Utilisez la commande ci-dessous depuis la racine du dossier `/projet/client`:

``` sh
npm run ng generate component loanList
```

Votre nouveau composant a été ajouté dans votre dossier `app`. Le fichier `app.module.ts` a également été modifié pour intégrer la déclaration de votre nouveau composant. Modifier maintenant le fichier `routes.ts` pour que l'URL `loans` pointe vers votre nouveau composant. Essayez alors de cliquer sur le lien `Loans` dans la barre de navigation. Vous devez arriver sur une page indiquant `loan-list works!`.

#### Modification du service

Modifiez le service `loan` pour ajouter les 2 opérations suivantes

- `getAll` pour récupérer tous les emprunts
- `return` pour rendre un emprunt (utilisez la méthode DELETE pour supprimer l'emprunt)

Note: vous devrez créer un nouveau modèle de données `Loan` dans le dossier `model`.

#### Controlleur du composant

Dans le fichier `loan-list.component.ts` du composant, inspirez-vous du composant `book-list` pour récupérer la liste des emprunts et exposer une méthode permettant de rendre un emprunt.

Note: n'oubliez pas d'ajouter un `.subscribe()` après avoir appelé la méthode `return` sinon la requête HTTP n'est pas déclanchée (voir la méthode `onClosed` du fichier `book-loan.component.ts`)

#### Template du composant

Enfin dans le fichier `.html` du composant, affichez la liste des emprunts de la même façon que la liste de livres précédemment crée. Pour chaque emprunt, affichez les IDs de l'utilisateur et du livre et exposez un bouton `Return` pour rendre le livre (utilisez le template angular `(click)` pour appeler la fonction du controlleur).

#### Finalisation du composant

Utilisez enfin les services `user` et `book` dans votre composant pour ne plus afficher les IDs mais les noms de l'emprunteur et du livre.

Encore une fois, nous avond de l'under-fetching pusique nous devons faire 2 appels HTTP pour chaque emprunt.
