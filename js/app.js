const app = {
  nbRows: 4,
  nbCols: 6,

  start: {
    row: 1,
    col: 1,
  },
  end: {
    row: 6,
    col: 6,
  },

  current: null,

  //TODO delay: 500,

  init: function () {
    console.log("init");

    app.randomStart();
    app.randomEnd();
    app.initGame();
    // app.turnLeft();
    // app.moveForward();
    // app.turnRight();
    app.drawBoard();
    //  app.moveForward();

    // au click sur le bouton "Lancer le script" => exécuter `handleLaunchScriptButton()
    document
      .getElementById("launchScript")
      .addEventListener("click", app.handleLaunchScriptButton);
  },

  randomStart: function () {
    app.start.row = 1;
    app.start.col = 1;
    // app.start.row = Math.floor(Math.random() * Math.floor(app.nbRows)) + 1;
    // app.start.col = Math.floor(Math.random() * Math.floor(app.nbCols)) + 1;
  },
  randomEnd: function () {
    app.end.row = 4;
    app.end.col = 6;
    // app.end.row = Math.floor(Math.random() * Math.floor(app.nbRows)) + 1;
    // app.end.col = Math.floor(Math.random() * Math.floor(app.nbCols)) + 1;
  },

  initGame: function () {
    app.current = {
      row: app.start.row,
      col: app.start.col,
    };
    app.direction = "right"; // top, right, bottom, left
  },

  // Lancer l'interprétation du script au click sur le bouton "Lancer le script"
  handleLaunchScriptButton: function () {
    console.log("bouton cliqué");

    let errorMessage = "";

    // Récupérer saisie utilisateur
    //? split("\n")  divise la string en un Array de sous-chaînes,
    // avec retour de ligne ("\n") comme séparateur
    // 1 ligne de commande = 1 ligne dans le tableau
    // let codeLines = document.getElementById("userCode").value.split("\n");
    let userCode = document.getElementById("userCode").value;
    //? Filter aussi les lignes vides
    let codeLines = userCode.split("\n").filter((line) => line.trim() !== "");

    // Vérifier si le tableau de lignes de code est vide
    if (codeLines.length === 0) {
      console.log("Le script est vide. Empêcher la soumission.");
      // alert("Saisir un script avant de lancer !");
      errorMessage += "Saisir un script avant de lancer !";
      document.getElementById("errorMessages").textContent =
        " Le script ne peut être vide avant de lancer ! ";
      return; // Ne pas soumettre le formulaire
    }

    // Initialiser le jeu et afficher le plateau
    app.initGame();
    app.drawBoard();
    document.getElementById("errorMessages").textContent = "";

    //? La fonction JS `window.setTimeout()` => Définit une fonction à exécuter après un délai en millisecondes
    // la fonction anonyme passée en paramètre de window.setTimeout()
    //  sera exécutée après un délai de 500 millisecondes
    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
      console.log("timeOut handleLaunchScriptButton() terminé");
    }, 500); //TODO app.delay
  },

  //? La fonction codeLineLoop() prend 2 paramètres :
  //  un tableau de lignes de code et un index.
  codeLineLoop: function (codeLines, index) {
    let errorMessage = "";

    //? Récupérer la ligne de code actuelle
    //? à partir du tableau de lignes de code en utilisant l’index fourni.
    // Getting currentLine
    // let currentLine = codeLines[index];
    // console.log(currentLine);

    let currentLine = codeLines[index].trim();
    console.log(currentLine);

    let continueReading = app.interpretLine(currentLine);

    if (continueReading) {
      app.drawBoard();
      // Ensuite, elle incrémente l’index pour passer à la ligne suivante.
      // Increment
      index++;

      //? Si la fin du tableau de lignes de code n’est pas atteinte,
      if (index < codeLines.length) {
        //? la fonction appelle app.codeLineLoop() avec un délai de 1000 ms
        //? Permet d’interpréter chaque ligne de code une par une
        //? avec 1 sec d'intervalle
        window.setTimeout(function () {
          app.codeLineLoop(codeLines, index);
        }, 500); //TODO app.delay
        //? Si la fin du tableau de lignes de code est atteinte,
        //? la fonction appelle checkSuccess() après un délai d’1 seconde.
      } else {
        window.setTimeout(function () {
          app.checkSuccess();
        }, 500); //TODO app.delay
      }
    } else {
      // alert("Game over...");
      errorMessage += "Game over...";
      console.log(errorMessage);
      document.getElementById("errorMessages").textContent += "  Game Over...";
    }
  },

  interpretLine: function (line) {
    console.log("interpretLine() appelé");
    console.log(line);

    let errorMessage = "";

    if (line == "turn left") {
      app.turnLeft();
    } else if (line == "turn right") {
      app.turnRight();
    } else if (line == "move forward") {
      let moveOk = app.moveForward();
      if (!moveOk) {
        // alert("BRAIN ERROR ! Hors limites ...");
        errorMessage += "FATAL ERROR ! Hors limites ...";
        console.log(errorMessage);
        document.getElementById("errorMessages").textContent +=
          "  FATAL ERROR ! Hors limites ...  ";
        return false;
      }
    } else {
      // alert('MEGA ERROR ! Commande inconnue "' + line + '"');
      errorMessage += 'SYNTAX ERROR ! Commande inconnue "' + line + '"';
      console.log(errorMessage);
      document.getElementById("errorMessages").textContent +=
        '  SYNTAX ERROR ! Commande inconnue "' + line + '"';
      return false;
    }

    return true;
  },

  //? Cette fonction permet d’interpréter chaque ligne de code d’un tableau
  //? une par une avec un délai d’une seconde entre chaque ligne
  //? et d’appeler checkSuccess() à la fin .

  // Display if the game is won or not
  checkSuccess: function () {
    console.log("checkSuccess() appelé");
    if (app.current.row == app.end.row && app.current.col == app.end.col) {
      // alert("Gagné !");
      document.getElementById("errorMessages").textContent = "  Gagné !  ";
      console.log("Gagné !");
    }
  },

  // Assemblage de la grille de jeu
  drawBoard: function () {
    console.log("Hello drawboard()");
    // Récupérer <div> déstinée à afficher le Board
    const boardElement = document.querySelector("#board");
    // Efface le contenu précédent
    boardElement.innerHTML = "";
    // console.log(boardElement);

    let rawDiv;
    let divCell;

    // Pour chaque ligne (x4), un élément <div> est créé
    // <div class="cellRow" id="raw1"></div>
    for (let i = 1; i <= app.nbRows; i++) {
      rawDiv = document.createElement("div");
      rawDiv.classList.add("cellRow");
      // Attriubuer id raw1 raw2 raw3 raw4
      rawDiv.id = "raw" + i;

      console.log(rawDiv);

      // Pour chaque <div> crée y insérer 6 cellules
      // <div class="cell"><div>
      for (let index = 1; index <= app.nbCols; index++) {
        divCell = document.createElement("div");
        divCell.classList.add("cell");
        divCell.classList.add("cell" + index);

        // if start
        if (i == app.start.row && index == app.start.col) {
          divCell.classList.add("cellStart");
        }
        // if end
        if (i == app.end.row && index == app.end.col) {
          divCell.classList.add("cellEnd");
        }
        // if current
        if (i == app.current.row && index == app.current.col) {
          // current
          divCell.classList.add("cellCurrent");

          // direction
          divCell.classList.add("cellCurrent-" + app.direction);
        }

        rawDiv.append(divCell);
      }
      boardElement.append(rawDiv);
    }
  },

  // Avancer en fonction de l'orientaton du curseur
  moveForward: function () {
    // case départ divStart
    switch (app.direction) {
      case "left":
        // Colonne de la position actuelle décrémentée de 1
        app.current.col--;
        break;
      case "right":
        // Colonne de la position actuelle incrémentée
        app.current.col++;
        break;
      case "top":
        // Ligne de la position actuelle décrémentée
        app.current.row--;
        break;
      case "bottom":
        // Ligne de la position actuelle incrémentée
        app.current.row++;
        break;
      default:
        console.log("direction unknown : " + app.direction);
    }

    // Hors limite => return false
    // 1ere ligne
    if (app.current.row < 1) {
      // Ligne réinitialisée à 1
      app.current.row = 1;
      console.log("out 1");
      return false;
    }
    // derniere ligne
    else if (app.current.row > app.nbRows) {
      // ligne réinitialisée au nbr de lignes maximum valide
      app.current.row = app.nbRows;
      console.log("out 2");
      return false;
    }
    // 1ere colonne
    else if (app.current.col < 1) {
      // Colonne réinitialisée à 1
      app.current.col = 1;
      console.log("out 3");
      return false;
    }
    // Derniere colonne
    else if (app.current.col > app.nbCols) {
      // Colonne réinitialisée au nbr de colonnes maximum valide
      app.current.col = app.nbCols;
      console.log("out 4");
      return false;
    }
    return true;
  },

  // Tourner à gauche en fonction de l'orientation curseur
  turnLeft: function () {
    switch (app.direction) {
      case "left":
        app.direction = "bottom";
        break;
      case "right":
        app.direction = "top";
        break;
      case "top":
        app.direction = "left";
        break;
      case "bottom":
        app.direction = "right";
        break;
    }
  },

  // Tourner à droite en fonction de l'orientation du curseur
  turnRight: function () {
    switch (app.direction) {
      case "left":
        app.direction = "top";
        break;
      case "right":
        app.direction = "bottom";
        break;
      case "top":
        app.direction = "right";
        break;
      case "bottom":
        app.direction = "left";
        break;
    }
  },
};

document.addEventListener("DOMContentLoaded", app.init);
