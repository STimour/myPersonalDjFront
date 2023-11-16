# Brief - My personal dj

## Description

Ce projet possÃ¨de deux parties Ã  dÃ©velopper en parallÃ¨le :
- un backend en utilisant strapi
- un frontend en utilisant react (avec vite)

## Installation

CrÃ©er une application strapiJS
```bash
npx create-strapi-app dj-backend --quickstart
```

CrÃ©er une application react
```bash
npm init vite@latest dj-frontend -- --template react-ts
```

## Utilisation

Lancez strapi
```bash
cd dj-backend
npm run develop
```

Lancez react
```bash
cd dj-frontend
npm run dev
```

CrÃ©ez un utilisateur admin sur strapi
Pour cela, crÃ©er un compte sur http://localhost:1337/admin

## Chanteurs

CrÃ©er un nouveau type de contenu "Chanteur" avec les champs suivants :
- Nom (texte)
- PrÃ©nom (texte)
- Date de naissance (date)

CrÃ©er un nouveau chanteur :
- Nom : "Lama"
- PrÃ©nom : "Serge"
- Date de naissance : "1943-02-11"

CrÃ©er un nouveau type de contenu "Musique" avec les champs suivants :
- Titre (texte)
- lien youtube (texte)
- Chanteur (relation vers le type de contenu "Chanteur")
- Favoris (boolÃ©en)
- Date de sortie (date)
- couleur de fond (couleur)

CrÃ©er une nouvelle musique :
- Titre : "Je suis malade"
- lien youtube : "https://www.youtube.com/watch?v=Q3Kvu6Kgp88"
- Chanteur : "Serge Lama"
- Favoris : "true"
- Date de sortie : "1973-01-01"
- couleur de fond : "#134522"

## Test de l'api

Utilisez Rest Client pour tester l'api, avec un nouveau fichier "requests.http" dans le projet client contenant les requÃªtes suivantes :

```bash
GET http://localhost:1337/chanteurs
GET http://localhost:1337/musiques
```

(Attention vous aurez besoin de gÃ©rer les droits de strapi pour accÃ©der Ã  ces donnÃ©es)

Puis ajoutez un nouvel artiste et une nouvelle musique via Rest Client
Notez les requÃªtes Ã  taper dans le fichier "requests.http" pour ajouter un nouvel artiste et une nouvelle musique

## Affichage des donnÃ©es

CrÃ©er un nouvel utilisateur dans strapi.
CrÃ©er une interface de connexion dans le projet client.
Utiliser la route d'authentification de strapi pour se connecter.

Une fois connectÃ©, afficher la liste des musiques dans le projet client.
Afficher les musiques favorites en premier.
Afficher les musiques par ordre alphabÃ©tique dans une deuxiÃ¨me partie.
Vous pouvez vous aider de la maquette (laide) fournie dans le brief.

CrÃ©er une page d'ajout de musique, accessible en cliquant sur le lien "+" en haut Ã  droite de la page d'accueil.

CrÃ©er une page modifier une musique, accessible en cliquant sur une musique dans la liste des musiques.

## Et aprÃ¨s ?

Appellez votre formateur pour lui montrer votre projet, il vous ajoutera de nouvelles fonctionnalitÃ©s Ã  implÃ©menter.