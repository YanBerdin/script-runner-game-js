# `Script Runner`

## `Descriptif de l'application`

**Script Runner** est un jeu de programmation qui permet aux utilisateurs de s'initier à la programmation en s'amusant.  Le but du jeu est de déplacer un curseur rouge sur une grille, de la case "Start" à la case "End", en utilisant ces instructions. L'application inclut également une fonctionnalité pour positionner aléatoirement le point de départ et le point d'arrivée sur la grille.

**3 instructions** :

- **Turn Left**
- **Turn Right**
- **Move Forward**

![Slide](docs/slide-decomposer.png)

### `Technologies utilisées`

- **HTML** : Structure de base de l'application.
- **CSS** : Mise en forme et style de l'application, y compris un fichier de réinitialisation CSS pour une apparence cohérente sur tous les navigateurs.
- **JavaScript** : Logique de l'application, y compris l'interprétation des instructions, la gestion des événements et la manipulation du DOM.
- **DOMPurify** : Bibliothèque utilisée pour assainir les entrées utilisateur et prévenir les attaques XSS.

## `Défis et Solutions Apportées`

1. **Interprétation des Instructions** :
   - **Défi** : Créer un interpréteur pour un langage simple avec seulement trois instructions.
   - **Solution** : Utilisation de la méthode `trim()` pour nettoyer les entrées utilisateur et d'une boucle pour traiter chaque ligne de code une par une.

2. **Performance** :
   - **Défi** : Assurer une performance fluide lors de l'exécution des instructions.
   - **Solution** : Utilisation de `window.setTimeout()` pour introduire des délais entre les instructions, permettant une exécution fluide et visible.
  
3. **Gestion des Erreurs** :
   - **Défi** : Gérer les erreurs de syntaxe et les instructions invalides.
   - **Solution** : Implémentation de messages d'erreur clairs et d'une validation des entrées utilisateur avant l'exécution.

4. **Affichage Dynamique de la Grille** :
   - **Défi** : Mettre à jour dynamiquement la grille en fonction des instructions exécutées.
   - **Solution** : Utilisation de JavaScript pour manipuler le DOM et mettre à jour les classes CSS des cellules de la grille.

5. **Position Aléatoire des Points de Départ et d'Arrivée** :
   - **Défi** : Implémenter une fonctionnalité pour positionner aléatoirement le point de départ et le point d'arrivée sur la grille.
   - **Solution** : Décommenter et activer le code existant pour générer des positions aléatoires.

## `Mesures de Sécurité`

1. **Validation des Entrées** :
   - Toutes les entrées utilisateur sont validées pour s'assurer qu'elles correspondent aux instructions attendues ("Turn Left", "Turn Right", "Move Forward").

2. **Assainissement des Entrées** :
   - Utilisation de DOMPurify pour assainir les entrées utilisateur et prévenir les attaques XSS.

3. **En-têtes de Sécurité** :
   - **Content Security Policy (CSP)** : Pour empêcher les attaques de type Cross-Site Scripting (XSS).
   - **X-Content-Type-Options** : Pour empêcher le navigateur d'interpréter les fichiers comme un autre type MIME.
   - **Strict-Transport-Security (HSTS)** : Pour forcer les connexions HTTPS.

## `Instructions`

1. Clonez le dépôt.
2. Ouvrez le fichier `index.html` dans votre navigateur.
