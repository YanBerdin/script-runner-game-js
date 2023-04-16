var app = {
  init: function () {
    console.log("init");

    // TODO
    app.drawBoard();

    // Event listeners - TODO
  },

  drawBoard: function () {
    console.log("Hello drawboard()");

    let boardElement = document.querySelector("#board");

    console.log(boardElement);

    for (let i = 1; i <= 4; i++) {
      let divCellRow = document.createElement("div");
      divCellRow.classList.add("cellRow");
      divCellRow.id = "raw" + i;

      console.log(divCellRow);

      boardElement.append(divCellRow);

      for (let index = 1; index <= 6; index++) {
        let divCell = document.createElement("div");
        divCell.classList.add("cell");

        divCellRow.append(divCell);
      }
    }
  },

  moveForward: function (Event) {
    // Selectionner la case départ divStart
    let divStart = document.querySelector("#raw1 div:nth-child(1)");
    divStart.classList.add("cellStart");

    console.log(divStart);


  },

  handleLaunchScriptButton: function () {
    // TODO

    // TODO : get all lines as an array

    //? La fonction `window.setTimeout()` est une fonction JavaScript :
    //? => permet de définir une fonction à exécuter après un certain délai en millisecondes
    //? la fonction anonyme passée en paramètre de window.setTimeout()
    //?  sera exécutée après un délai de 2000 millisecondes (soit 2 secondes)
    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000); // => 2secondes
  },

  //? La fonction codeLineLoop() est une fonction personnalisée
  //? qui prend 2 paramètres :
  //? un tableau de lignes de code et un index.

  codeLineLoop: function (codeLines, index) {
    //? La fonction commence par récupérer la ligne de code actuelle
    //? à partir du tableau de lignes de code en utilisant l’index fourni.
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    //? Ensuite, elle incrémente l’index pour passer à la ligne suivante.
    // Increment
    index++;

    //? Si la fin du tableau de lignes de code n’est pas atteinte,
    // if still a line to interpret
    if (index < codeLines.length) {
      //? la fonction appelle app.codeLineLoop() avec un délai de 1000 millisecondes (= 1 sec)
      //? Cela permet d’interpréter chaque ligne de code une par une
      //? avec un délai d’une seconde entre chaque ligne.
      // Recall same method (=> make a loop)
      window.setTimeout(function () {
        app.codeLineLoop(codeLines, index);
      }, 1000);
      //? Si la fin du tableau de lignes de code est atteinte,
      //? la fonction appelle checkSuccess() après un délai d’1 seconde.
    } else {
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000);
    }
  },

  //? Cette fonction permet d’interpréter chaque ligne de code d’un tableau
  //? une par une avec un délai d’une seconde entre chaque ligne
  //? et d’appeler checkSuccess() à la fin .

  checkSuccess: function () {
    // TODO display if the game is won or not
  },
};

document.addEventListener("DOMContentLoaded", app.init);
