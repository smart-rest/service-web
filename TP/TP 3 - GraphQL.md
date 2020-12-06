# GraphQL

## Découverte de l'API

GraphQL possède un service d'introspection permettant la création automatique de client pour les APIs. Nous utiliserons ici un client graphique GraphiQL mise à disposition avec GraphQL couplé avec l'API SWAPI (The Star Wars API).

Ouvrez cette [URL](http://graphql.org/swapi-graphql/) afin d'accéder au client.

## Requêtes simples

* Récupérez le titre de tous les films Star Wars
* Recupérez le nom de toutes les planètes apparaissant dans l'univers Star Wars ainsi que leur diamètre. Veillez à ne pas récupérez d'informations inutiles dans la requête (aka pas d'over-fetching)

## Requêtes complexes

* Récupérez la date de sortie (releaseDate) ainsi que la liste des producteurs (producers) du film ayant l'identifiant `ZmlsbXM6MQ==` (et uniquement pour ce film)
* Récupérez en une seule requête (aka pas d'under-fetching) les résultats des deux requêtes simples précédentes

## Requêtes sur plusieurs niveaux

* En une seule requête, récupérez le titre de tous les films ainsi que pour chacun le nom des planètes qui apparaissent dans ceux-ci
