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

  handleLaunchScriptButton: function () {
    // TODO

    // TODO : get all lines as an array

    window.setTimeout(function () {
      app.codeLineLoop(codeLines, 0);
    }, 2000);
  },
  codeLineLoop: function (codeLines, index) {
    // Getting currentLine
    var currentLine = codeLines[index];
    console.log(currentLine);

    // Increment
    index++;

    // if still a line to interpret
    if (index < codeLines.length) {
      // Recall same method (=> make a loop)
      window.setTimeout(function () {
        app.codeLineLoop(codeLines, index);
      }, 1000);
    } else {
      window.setTimeout(function () {
        app.checkSuccess();
      }, 1000);
    }
  },
  checkSuccess: function () {
    // TODO display if the game is won or not
  },
};

document.addEventListener("DOMContentLoaded", app.init);
