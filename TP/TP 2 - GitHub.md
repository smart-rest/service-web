# Github Public API

GitHub estun service d'hébergement de code en ligne se basant sur le CVS Git.

Utilisez la [documentation](https://developer.github.com/v3/) en ligne de l'API GitHub pour effectuer les différentes requêtes ci-dessous.

La première partie du TP peut être effectuée depuis un navigateur (requêtes GET simples) mais les parties suivantes nécessitent l'utilisation d'un client HTTP avancé permettant de spécifier des headers HTTP.

## GET simples

- Récupérer les informations de l'utilisateur `smart-rest`
- Récupérer les repositories de l'utilisateur `smart-rest`
- Récupérer les issues du repository `service-web-tp`

## Authentification

Les étapes suivantes devront être faites en étant authentifié. Utiliser les Bearer Token `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`
> astuce: Utilisez le header HTTP *Authorization* avec la valeur *Bearer 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* ou renseigner l'onglet *Authorization* avec le type *Bearer Token* et la valeur du Token.

- Récupérer les informations de l'utilisateur courant. Quel est son login ?
- Modifer la localisation de l'utilisateur courant
- Créer une nouvelle *issue* sur le projet `service-web-tp`

## Media types

> astuce: *Accept* header

- Récupérer tous les commentaires de la première *issue* du projet `service-web-tp`
- Récupérer tous les commentaires de la première *issue* du projet `service-web-tp` au format `full`
