// Etch & Sketch

// build opening sketch pad with grid lines
window.addEventListener(`load`, () => {
  buildSketchPad(quantity);
  //toggleGridLines(); /////////////////////////////
});

const sketchPad = document.querySelector(`.f--main__g--sketch_pad`);
let padSquare;
let padSquares;
const initialQuantity = 24
let quantity = initialQuantity;

let sketchPadColor = `white`;
const initialPenColor = `black`;
let penColor = initialPenColor;
let prevColor = penColor;
const swatchColor = document.querySelector(`.f--pen_color__color_swatch`);
const swatchTitle = document.querySelector(`.f--pen_color__pen--content`);

let isButtonDown;
let isErase = false;
let isColorOver = false;
let isGridLines = false;

const btnBlack = document.querySelector(`.f--color_pick__btn--black`);
btnBlack.addEventListener(`click`, blackPen);

/*
const btnPickColor = document.querySelector(`.f--color_pick__btn--pick_color`);
btnPickColor.addEventListener(`click`, pickColor);
*/

const btnSurprise = document.querySelector(`.f--color_pick__btn--surprise`);
btnSurprise.addEventListener(`click`, surpriseMe);

/*
const btnRandom = document.querySelector(`.f--color_pick__btn--random`);
btnRandom.addEventListener(`click`, randomColor);
*/

const btnNewSketchPad = document.querySelector(`.f--new_pad__btn--new_sketch-pad`);
btnNewSketchPad.addEventListener("mouseover", () => {
  btnNewSketchPad.style.cursor = `pointer`; }
);
btnNewSketchPad.addEventListener("click", getNewSketchPad);

/*
const btnShading = document.querySelector(`f--new_pad__btn--shading`);
btnShading.addEventListener(`click`, shading);
*/

const btnColorOver = document.querySelector(`.f--new_pad__btn--color_over`);
btnColorOver.addEventListener(`click`, toggleColoringOver);

const btnEraser = document.querySelector(`.f--eraser__btn--eraser`);
btnEraser.addEventListener(`click`, eraserOn);

const btnGridLines = document.querySelector(`.f--eraser__btn--lines`);
btnGridLines.addEventListener(`click`, toggleGridLines);

const btnClearGrid = document.querySelector(`.f--eraser__btn--clear`);
btnClearGrid.addEventListener(`click`, clearSketchPad);

function buildSketchPad(quantity) {
  resetSketchPad();
  coloringOn();
  updateSwatchColor();
  sketchPad.style.gridTemplateColumns = `repeat(${quantity}, 1fr)`;
  sketchPad.style.gridTemplateRows = `repeat(${quantity}, 1fr)`;
  for (let i = 0; i < quantity * quantity; i++) {
    const padSquareDiv = document.createElement("div");
    padSquareDiv.classList.add("pad_square");
    padSquareDiv.style.backgroundColor = sketchPadColor;
    sketchPad.appendChild(padSquareDiv);
    padSquareDiv.addEventListener(`mouseenter`, (e) => {
      padSquare = e.target;
      isButtonDown = e.buttons;
      /////////////////////////////////////////////
      // padSquareBgColor = e.target.style.backgroundColor;
      if (isButtonDown) colorPadSquare(penColor);
    });
  };
  padSquares = document.querySelectorAll(`.pad_square`);
  /////////////////////////////////////////////////////
  toggleGridLines();
  
};

function colorPadSquare(penColor) {
    if (isColorOver) {
      colorAnyPadSquare();
    };
    if (!isColorOver) {
      colorEmptyPadSquare();
    };
    if (isErase) {
      colorAnyPadSquare();
      showErasingPadSquareGridLines();
    };
};

function resetSketchPad() {
  while (sketchPad.firstChild) {
  sketchPad.removeChild(sketchPad.firstChild);
  }
}

function blackPen() {
  penColor = `black`;
  prevColor = penColor;
  coloringOn();
  updateSwatchColor();
};

function pickColor() {

};

function surpriseMe() {
  penColor = `green`;
  prevColor = penColor;
  coloringOn();
  updateSwatchColor();
};

function randomColor() {

};

function swatchTitlePen() {
  swatchTitle.textContent = `Pen`
};
function swatchTitleEraser() {
  swatchTitle.textContent = `Eraser`
};
function updateSwatchColor() {
  swatchColor.style.backgroundColor = penColor;
};

function getNewSketchPad() {
  let num = prompt(
    `Please enter how many squares you would like, from 2 to 100?`, `24`
  );
  if (num ===  null) return;
  if (num > 1 && num <= 101) {
    quantity = parseInt(num);
    buildSketchPad(quantity);
    } else {
    alert(`Please input a number from 2 - 100`);
    getNewSketchPad();
  }
};

function shading() {

};


function toggleColoringOver() {
  isColorOver = !isColorOver;
  if (isColorOver) {
    btnColorOver.textContent = `Color Over \u2713`;
  };
  if  (!isColorOver) {
    btnColorOver.textContent = `No Color Over`;
  };
};
function colorAnyPadSquare() {
  padSquare.style.backgroundColor = penColor;
  padSquare.classList.remove(`grid_lines`);
};
function colorEmptyPadSquare() {
  let bgColor = padSquare.style.backgroundColor;
    if (bgColor === sketchPadColor) {
      colorAnyPadSquare();
  };
};

function eraserOn() {
  isErase = !isErase;
  if (isErase) {
    penColor = sketchPadColor;
    swatchTitleEraser();
    updateSwatchColor();
    }else if (!isErase) {
    coloringOn();
  }
};

function coloringOn() {
  isErase = false;
  penColor = prevColor;
  swatchTitlePen();
  updateSwatchColor();
};


//////////////////////////////////////////////////////
function toggleGridLines() {
  isGridLines = !isGridLines;
  if (isGridLines) {
    btnGridLines.textContent = `Hide Grid Lines`;
    showPadSquareGridLines();
  };
  if (!isGridLines) {
    btnGridLines.textContent = `Show Grid Lines`;
    hidePadSquareGridLines();
  };
};
function showPadSquareGridLines() {
  padSquares.forEach(square => {
    ///////////////////////////////////
    // if (padSquareBgColor === sketchPadColor)
    let bgColor = square.style.backgroundColor;
    if (bgColor === sketchPadColor) {
      square.classList.add(`grid_lines`);
    };
  });
};
function hidePadSquareGridLines() {
  padSquares.forEach(square => {
    square.classList.remove(`grid_lines`);
  });
};
function showErasingPadSquareGridLines() {
  if (isGridLines) padSquare.classList.add(`grid_lines`);
};
function hideColoringPadSquareGridLines() {
  padSquare.classList.remove(`grid_lines`);
};

 
function clearSketchPad() {
  padSquares.forEach(square => {
    square.style.backgroundColor = sketchPadColor;
    if (isGridLines) square.classList.add(`grid_lines`);
  });
  coloringOn();
};

  



