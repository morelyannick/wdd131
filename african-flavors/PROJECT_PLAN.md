# African Flavors – Discover African Cuisine

## 1. Architecture complète du projet

- 4 pages HTML statiques :
  - `index.html` : page d'accueil
  - `countries.html` : page des pays et plats
  - `favorites.html` : page des favoris
  - `references.html` : page des références
- Feuilles de style :
  - `css/style.css` : styles globaux et responsive
- Scripts JavaScript :
  - `js/data.js` : données des plats et pays
  - `js/main.js` : logique d'affichage, recherche, filtrage, favoris, conversion de devises
- Images :
  - fichiers images existants dans `../images/`
  - utilisation de `loading="lazy"` sur les balises `img`
- Assets supplémentaires :
  - `README.md` : présentation du projet et instructions d’utilisation

## 2. Sitemap

1. Home
   - Header / navigation
   - Hero interactif
   - Présentation du projet
   - Plats populaires
   - Valeur culturelle
   - Formulaire de contact
   - Footer
2. Countries
   - Filtre par pays
   - Recherche de plat
   - Liste de plats par pays
   - Carte rapide des pays inclus
3. Favorites
   - Liste des plats enregistrés
   - Boutons pour supprimer
   - Message vide si aucun favori
4. References
   - Crédits images
   - Crédits textes
   - Ressources utilisées

## 3. Wireframe desktop

- Header fixe en haut avec logo + menu
- Hero en double image à droite du texte d’introduction
- Section "À propos" en deux colonnes
- Section "Plats populaires" en grille 3 colonnes
- Section "Pourquoi découvrir" avec cartes icônes
- Section formulaire de contact en deux colonnes
- Footer en bas avec liens et mentions

## 4. Wireframe mobile

- Header compact avec menu burger
- Hero en pile : texte puis visuel
- Sections en colonne pleine largeur
- Grille de plats responsive 1 colonne sur mobile
- Formulaire simple sur la largeur de l’écran
- Footer minimal avec liens empilés

## 5. Arborescence des fichiers

```
wdd131/african-flavors/
  index.html
  countries.html
  favorites.html
  references.html
  css/
    style.css
  js/
    data.js
    main.js
  PROJECT_PLAN.md
  README.md
```

## 6. Liste des composants

- `Header` / navigation principale
- `Hero` avec double image et transition 0.5s
- `Intro` projet
- `Popular dishes` cards
- `Cultural values` section
- `Contact form`
- `Country filter` / `Search bar`
- `Dish card` dynamique
- `Favorites list`
- `References list`
- `Footer`

## 7. Plan JavaScript

- `data.js`
  - Tableau `dishes` d’objets plats
  - Tableau `countries` pour le filtre et les en-têtes
- `main.js`
  - `displayDishes(dishes, container)` : affiche les cartes de plats
  - `filterDishes(country)` : filtre par pays sélectionné
  - `searchDishes(query)` : filtre par recherche textuelle
  - `convertCurrency(amount, currency)` : convertit les prix
  - `addFavorite(dishId)` : ajoute un favori et met à jour `localStorage`
  - `removeFavorite(dishId)` : retire un favori
  - `loadFavorites()` : charge les favoris au démarrage
  - `saveCurrency(currency)` : conserve la devise choisie
  - `validateContactForm(event)` : validation du formulaire
- Écoutes d’événements :
  - `click` sur boutons favoris
  - `input` sur recherche
  - `change` sur filtre pays
  - `change` sur sélection de devise
  - `submit` sur formulaire de contact

## 8. Plan responsive

- Mobile portrait : 320–480px
  - menu hamburger
  - sections en colonne
  - cartes plats 1 colonne
- Mobile paysage / petit écran : 481–767px
  - grille 2 colonnes pour certaines sections
  - images adaptatives
- Tablette : 768–1023px
  - 2 colonnes sur sections d’intro et de contact
  - carte plats 2 colonnes
- Desktop : 1024px+
  - grille 3 colonnes pour plats
  - layout large et espacé
- Accessibilité : contraste fort, police lisible, focus visible

## 9. Plan de contenu

- 10 pays sélectionnés :
  - Côte d’Ivoire
  - Nigeria
  - Ghana
  - Sénégal
  - Cameroun
  - Mali
  - Maroc
  - Kenya
  - Éthiopie
  - Afrique du Sud
- Chaque plat inclut :
  - nom, pays, origine, catégorie, histoire, description, ingrédients, saveurs, niveau d’épices, temps de préparation, prix XOF/USD/EUR, boisson, fun fact
- Sections enrichies :
  - Plats populaires mis en avant
  - Témoignage culturel sur l’authenticité
  - Formulaire avec Nom / Email / Plat favori / Message

## 10. Stratégie localStorage

- `favorites` : tableau d’identifiants de plats sauvegardés
- `selectedCurrency` : devise choisie par l’utilisateur
- `contactDraft` (optionnel) : sauvegarde temporaire du formulaire
- Chargement des données depuis `localStorage` à l’ouverture de la page
- Mise à jour de `localStorage` à chaque ajout/suppression de favori
- Affichage cohérent entre toutes les pages
