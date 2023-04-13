// -- Etch & Sketch -- //

let enterSketchPadSquare;
let leaveSketchPadSquare;

const initialQuantity = 24;
let quantity = initialQuantity;

const sketchPadColor = `rgb(255, 255, 255)`;

const initialPenColor = `rgb(0, 0, 0)`;
let penColor = initialPenColor;
let prevColor = initialPenColor;

let isMouseDown = false;

let isSurpriseMe = false;
let isShading = false;
let isColorOver = false;
let isErase = false;
let isGridLines = true;
let prevGridLines;

//// Buttons - and user selections ////

const btnBlack = document.querySelector(`#btn--black`);
btnBlack.addEventListener(`click`, () => {
  penColor = `rgb(0, 0, 0)`;
  eraseOff();
  surprisePenOff();
});

const btnComputerPick = document.querySelector(`#btn--random`);
btnComputerPick.addEventListener(`click`, () => {
  penColor = getRandomColorToRgb();
  eraseOff();
  surprisePenOff();
});

const btnSurpriseMe = document.querySelector(`#btn--surprise`);
btnSurpriseMe.addEventListener(`click`, () => {
  isSurpriseMe = !isSurpriseMe;
  if (isSurpriseMe) {
    btnSurpriseMe.textContent = `Surprise Me \u2713`;
    eraseOff();
    shadingOff();
  }else if (!isSurpriseMe) {
    btnSurpriseMe.textContent = `Surprise Me`;
  }; 
});

const colorPicker = document.querySelector(`#color_picker`);
colorPicker.addEventListener(`change`, () => {
  colorPicked = colorPicker.value
  penColor = hexToRgb(colorPicked);
  eraseOff();
  surprisePenOff();
});

const btnNewSketchPad = document.querySelector(`#btn--new_sketch_pad`);
btnNewSketchPad.addEventListener("mouseover", () => {
  btnNewSketchPad.style.cursor = `pointer`;
});
btnNewSketchPad.addEventListener("click", getNewSketchPad);

const btnShading = document.querySelector(`#btn--shading`);
btnShading.addEventListener(`click`, () => {
    isShading = !isShading;
    if (isShading) {
      btnShading.textContent = `Shading \u2713`;
    }else if (!isShading) {
    btnShading.textContent = `Shading`;
    };
  //};
  eraseOff();
  surprisePenOff();
  colorOverOff();
});

const btnColorOver = document.querySelector(`#btn--color_over`);
btnColorOver.addEventListener(`click`, () => {
    isColorOver = !isColorOver;
    if (isColorOver) {
      btnColorOver.textContent = `Color Over \u2713`;
    }else if (!isColorOver) {
    btnColorOver.textContent = `Color Over`;
    };
    eraseOff();
    shadingOff();
});

const btnEraser = document.querySelector(`#btn--eraser`);
btnEraser.addEventListener(`click`, () => {
  isErase = !isErase;
  if (isErase) {
    erasing()
  }else if (!isErase) {
   eraseOff();
  };
});

const btnGridLines = document.querySelector(`#btn--grid_lines`);
btnGridLines.addEventListener(`click`, () => {
  isGridLines = !isGridLines;
  if (isGridLines) {
    btnGridLines.textContent = `Hide Grid Lines`;
    showPadSquareGridLines();
  }else if (!isGridLines) {
    btnGridLines.textContent = `Show Grid Lines`;
    hidePadSquareGridLines();
  };
});

const btnClearSketchPad = document.querySelector(`#btn--clear`);
btnClearSketchPad.addEventListener(`click`, () => {
  sketchPadSquares = document.querySelectorAll(`.pad_square`);
  sketchPadSquares.forEach((square) => {
    square.style.backgroundColor = sketchPadColor;
    square.style.opacity = 1;
    if (isGridLines) square.classList.add(`grid_lines`);
  });
  eraseOff();
});
//// End -- Buttons - and user selections ////

//// Sketch Pad - build, reset, new ////

function buildSketchPad(quantity) {
  resetSketchPad();
  const sketchPad = document.querySelector(`#g__sketch_pad`);
  sketchPad.style.gridTemplateColumns = `repeat(${quantity}, 1fr)`;
  sketchPad.style.gridTemplateRows = `repeat(${quantity}, 1fr)`;
  for (let i = 0; i < quantity * quantity; i++) {
    const divSketchPadSquare = document.createElement("div");
    divSketchPadSquare.classList.add("pad_square");
    divSketchPadSquare.style.backgroundColor = sketchPadColor;
    sketchPad.appendChild(divSketchPadSquare);
    divSketchPadSquare.addEventListener(`mouseenter`, (e) => {
      e.stopPropagation();
      enterSketchPadSquare = e.currentTarget;
      isMouseDown = e.buttons;
      enteringSketchPadSquare();
    });
    divSketchPadSquare.addEventListener(`mouseleave`, (e) => {
      e.stopPropagation();
      leaveSketchPadSquare = e.currentTarget;
      leavingSketchPadSquare();
    });
  }
  showPadSquareGridLines();
  updateSwatch();
}

function resetSketchPad() {
  const sketchPad = document.querySelector(`#g__sketch_pad`);
  while (sketchPad.firstChild) {
    sketchPad.removeChild(sketchPad.firstChild);
  };
}

function getNewSketchPad() {
  eraseOff();
  let num = prompt(
    `Please enter how many squares you would like,
    from 2 to 100?`,
    `24`
  );
  if (num === null) return;
  if (num > 1 && num <= 101) {
    quantity = parseInt(num);
    buildSketchPad(quantity);
  } else {
    alert(`Please input a number from 2 - 100`);
    getNewSketchPad();
  };
}
//// End -- Sketch Pad - build, reset, new ////

//// Sketch Pad Square Listeners - enter, leave ////

function enteringSketchPadSquare() {
  prevColor = enterSketchPadSquare.style.backgroundColor;
  prevGridLines = enterSketchPadSquare.style.border;
  if (isSurpriseMe) {
    penColor = getRandomColorToRgb();
    updateSwatch();
  }
  if (!isMouseDown) {
    enterSketchPadSquare.style.borderRadius = `50%`;
    if (!isErase) {
      enterSketchPadSquare.style.backgroundColor = penColor;
    }else if (isErase) {
    enterSketchPadSquare.style.backgroundColor = sketchPadColor;
    };
  }else if (isMouseDown) {
    if (isColorOver) {
      coloringOverSquare();
    }else if (!isColorOver) {
      coloringEmptySquare();
    };
    if (isShading) shading();
    if (isErase) erasing();
  };
}

function leavingSketchPadSquare() {
  leaveSketchPadSquare.style.borderRadius = `0%`;
  if (!isMouseDown) {
    getPrevValuesSquareLeaving();
  };
}
//// End -- Sketch Pad Square Listeners - enter, leave ////

//// Coloring ////

function shading() {
  let bgColor = enterSketchPadSquare.style.backgroundColor;
  let bgOpacity = 
    parseFloat(
    window.getComputedStyle(enterSketchPadSquare)
    .getPropertyValue(`opacity`)
  );
  if (prevColor == sketchPadColor) {
    enterSketchPadSquare.style.opacity = 0.1;
  }else if (prevColor == penColor && bgOpacity < 1) {
    bgOpacity += 0.1;
      enterSketchPadSquare.style.opacity = bgOpacity;
  };
}

function coloringOverSquare() {
  enterSketchPadSquare.style.backgroundColor = penColor;
  enterSketchPadSquare.style.opacity = 1;
  if (isMouseDown) removePadSquareGridLines();
}
function coloringEmptySquare() {
let bgColor = enterSketchPadSquare.style.backgroundColor;
if (bgColor === sketchPadColor) {
  coloringOverSquare();
};
}

function getPrevValuesSquareLeaving() {
  leaveSketchPadSquare.style.backgroundColor = prevColor;
  leaveSketchPadSquare.style.border = prevGridLines;
}
//// End -- Coloring ////

//// Erasing ////

function erasing() {
  btnEraser.textContent = `Eraser \u2713`;
  enterSketchPadSquare.style.backgroundColor = sketchPadColor;
  enterSketchPadSquare.style.opacity = 1;
  updateSwatch();
  if (isGridLines) addBackPadSquareGridLines();
}
//// End -- Erasing ////

//// Turn Off Features - surprise, shading, color over, erase ////

function surprisePenOff() {
  isSurpriseMe = false;
  btnSurpriseMe.textContent = `Surprise Me`
}
function shadingOff() {
  isShading = false;
  btnShading.textContent = `Shading`;
}
function colorOverOff() {
  isColorOver = false;
  btnColorOver.textContent = `Color Over`;
}

function eraseOff() {
  isErase = false;
  btnEraser.textContent = `Eraser`;
  updateSwatch();
}
//// End -- Turn Off Features ////

//// Grid Lines ////

function showPadSquareGridLines() {
  sketchPadSquares = document.querySelectorAll(`.pad_square`);
  sketchPadSquares.forEach((padSquare) => {
    let bgColor = padSquare.style.backgroundColor;
    if (bgColor === sketchPadColor) {
      padSquare.classList.add(`grid_lines`);
    }
  });
}
function hidePadSquareGridLines() {
  sketchPadSquares = document.querySelectorAll(`.pad_square`);
  sketchPadSquares.forEach((padSquare) => {
    padSquare.classList.remove(`grid_lines`);
  });
}
function addBackPadSquareGridLines() {
  enterSketchPadSquare.classList.add(`grid_lines`);
}
function removePadSquareGridLines() {
  enterSketchPadSquare.classList.remove(`grid_lines`);
}
//// End -- Grid Lines ////

//// Pen & Swatch ////

function updateSwatch() {
  const swatchTitle = document.querySelector(`#pen--title`);
  const swatchColor = document.querySelector(`#swatch--color`);
  if (isErase) {
    swatchTitle.textContent = `Eraser`;
    swatchColor.style.backgroundColor = sketchPadColor;
  }else if (!isErase) {
    swatchTitle.textContent = `Pen`;
    swatchColor.style.backgroundColor = penColor;
  };
}
//// End -- Pen & Swatch ////

//// Generic and Page Load ////

function getRandomColorToRgb() {
  let randomColor = `#${Math.floor(
    Math.random()*16777215).toString(16)}`;
  if (randomColor === sketchPadColor) {
    getRandomColorToRgb();
  };
  return hexToRgb(randomColor);
}

function hexToRgb(hex) {
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

function rgbToHex(rgb) {
  let rgbValues = rgb.match(/(\d+),\s(\d+),\s(\d+)/);
  var hexValues = [
    parseInt(rgbValues[1]).toString(16).padStart(2, '0').toUpperCase(),
    parseInt(rgbValues[2]).toString(16).padStart(2, '0').toUpperCase(),
    parseInt(rgbValues[3]).toString(16).padStart(2, '0').toUpperCase()
  ];
  return `#${hexValues.join("")}`;
}

window.addEventListener(`load`, () => {
  buildSketchPad(quantity);
});