// Etch & Sketch

const sketchPad = document.querySelector(`#sketch_pad__grid--container`);

// get quantity of squares from user, prompt pop window, buildGrid() with input
const numSquaresBtn = document.querySelector(`#numSquaresPick`);
numSquaresBtn.addEventListener(
  "mouseover",
  () => (numSquaresBtn.style.cursor = `pointer`)
);
numSquaresBtn.addEventListener("click", getSquareCount);
function getSquareCount() {
  let num = prompt(
    `Please enter amount of squares for each row, from 1 to 100?`
  );
  if (num > 0 && num <= 101) {
    resetSketchPad();
    numSquares = parseInt(num);
    buildGrid(numSquares);
  } else {
    alert(`Please enter a number from 1 - 100`);
  }
}

// reset - remove pad squares in prep to build new sketch pad grid
function resetSketchPad() {
  const sketchPad = document.querySelector(`#sketch__pad`);
  while (sketchPad.firstChild) {
    sketchPad.removeChild(sketchPad.firstChild);
  }
}

// create grid of squares with css grid
function buildGrid(quantity) {
  sketchPad.style.gridTemplateColumns = `repeat(${quantity}, 1fr)`;
  sketchPad.style.gridTemplateRows = `repeat(${quantity}, 1fr)`;
  for (let i = 0; i < quantity * quantity; i++) {
    const padSquare = document.createElement("div");
    padSquare.classList.add("pad_square");
    padSquare.addEventListener("mouseover", colorSquare);
    sketchPad.appendChild(padSquare);
  }
}

// colorize square with user selected coloring option
function colorSquare() {
  const squaresContainer = document.querySelector(
    `#sketch_pad__grid--container`
  );
  squaresContainer.addEventListener("mouseover", (e) => {
    if (e.buttons && e.target.classList.contains(`pad_square`)) {
      e.target.classList.add("black");
    }
  });
}

// change color for squares coloring per button clicked
let squareColor = `black`;
blackBtn = document.querySelector(`#btn__black`);
blackBtn.addEventListener(`click`, () => (squareColor = `black`));
whiteBtn = document.querySelector(`#btn__white`);
whiteBtn.addEventListener(`click`, () => (squareColor = `white`));
surpriseBtn = document.querySelector(`#btn__surprise`);
surpriseBtn.addEventListener(`click`, () => (squareColor = `surprise`));
shadingBtn = document.querySelector(`#btn__shading`);
shadingBtn.addEventListener(`click`, () => (squareColor = `shade`));
pickColorBtn = document.querySelector(`#btn__color--pick`);
pickColorBtn.addEventListener(`click`, () => (squareColor = `color--pick`));

// initialize opening grid to 24 x 24
window.addEventListener(`load`, () => buildGrid(24));
