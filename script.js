// Etch & Sketch

//const squaresContainer = document.querySelector(`#grid__container`);

// initialize opening grid to 24 x 24
createGridOfNumSquares(24);

// get num of squares from user with pop window, prompt
// call function to build grid of user input num of squares
const numSquaresBtn = document.querySelector(`#numSquaresPick`);
numSquaresBtn.addEventListener("mouseover", () => (numSquaresBtn.style.cursor = `pointer`));
numSquaresBtn.addEventListener("click", getSquareCount);
function getSquareCount() {
  let num = prompt(
    `Please enter amount of squares for each row, from 1 to 100?`
  );
  if (num > 0 && num <= 101) {
    numSquares = parseInt(num);
    createGridOfNumSquares(numSquares);
  } else {
    alert(`Please enter a number from 1 - 100`);
  }
};

// create function to build grid of squares to fill #grid__container
function createGridOfNumSquares(num) {
  document.querySelector(`#grid__container`).remove();
  const gridContainer = document.createElement("div");
  gridContainer.id = `grid__container`;
  document.querySelector(`#body__container`).appendChild(gridContainer);
  for (let i = 0; i < num; i++) {
    // for rows of squares
    let row = document.createElement(`div`);
    row.classList.add(`grid__row`);
    row.id = `row${i}`;
    document.querySelector(`#grid__container`).appendChild(row);
    for (let j = 0; j < num; j++) {
      // for columns of squares
      let square = document.createElement(`div`);
      square.classList.add(`grid__squares`);
      square.id = `row${i}__col${j}`;
      document.querySelector(`#row${i}`).appendChild(square);
    };
  };
  colorSquare();
};

  

/*
// add eventListener for mousedown
squaresContainer.addEventListener(`mousedown`, mouseDown);
  function mouseDown() {
    console.log(`mouse down`);
    isMouseDown = true;
    colorSquare();
  };
window.addEventListener(`mouseup`, mouseUp);
  function mouseUp() {
    isMouseDown = false;
    //colorSquare();
  };
};
*/
//
//const squares = document.querySelectorAll(`.grid__squares`);

function colorSquare() {
  const squaresContainer = document.querySelector(`#grid__container`);
  squaresContainer.addEventListener('mousemove', (e) => {
    let isMouseDown = e.buttons;
    console.log(isMouseDown);
    if (isMouseDown === 1 && e.target.classList.contains(`grid__squares`)) {
        e.target.classList.add('black');
      };
  });
};

/*works correctly, but at some point out of sync, mouse down is up, etc
squaresContainer.addEventListener('mousedown', () => isMouseDown = 22);
squaresContainer.addEventListener('mouseup', () => isMouseDown = 33);
console.log(`after mousedown mouseup ${isMouseDown}`);
squaresContainer.addEventListener('mouseover', (e) => {
  console.log(isMouseDown)
  if (isMouseDown === 22 && e.target.classList.contains(`grid__squares`)) {
      e.target.classList.add('black');
    };
});
*/



/* no dragging, only colors when each square clicked on
squaresContainer.addEventListener(`mousedown`, (e) => {
  e.target.classList.add(`black`);
});
*/


/*
let mouseDown;

squaresContainer.addEventListener('mousedown', () => mouseDown = true);
squaresContainer.addEventListener('mouseup', () => mouseDown = false);
console.log(`after mousedown mouseup ${mouseDown}`);
squaresContainer.addEventListener('mouseover', (e) => {
  if (mouseDown === true && e.target.classList.contains(`grid__squares`)) {
      e.target.classList.add('black');
    };
});
*/


/*
// function to color square if mouse is down, and mouseover square
function colorSquare() {
  const squaresContainer = document.querySelector(`#grid__container`);
  const squares = document.querySelectorAll(`.grid__squares`);
  let isMouseDown = false;
  squares.forEach(square => {
    squaresContainer.addEventListener(`mousedown`, () => {
      isMouseDown = 1;
      return;
    });
    squaresContainer.addEventListener(`mouseup`, () => {
      isMouseDown = false;
        return;
    });
    //if (isMouseDown === 1) {
      console.log(isMouseDown);
      square.addEventListener(`mouseover`, () => {
        square.classList.add(`black`);
      //});
    });
  });
};
*/

/*
// function to color square if mouse is down, and mouseover square
function colorSquare() {
  console.log(`working`);
  squares.forEach(square => {
    //if (!isMouseDown) {
      //return;
    //};
    square.addEventListener(`mouseover`, () => {
      //if (isMouseDown) {
        square.classList.add(squareColor);
        //if (!isMouseDown) {
          //return;
        //};
      //};
    });
  });
};
*/  


// change color for squares coloring per button clicked
let squareColor = `black`;
blackBtn = document.querySelector(`#btn__black`);
blackBtn.addEventListener(`click`, () => squareColor = `black`);
whiteBtn =  document.querySelector(`#btn__white`);
whiteBtn.addEventListener(`click`, () => squareColor = `white`);
surpriseBtn = document.querySelector(`#btn__surprise`);
surpriseBtn.addEventListener(`click`, () => squareColor = `surprise`);
shadingBtn = document.querySelector(`#btn__shading`);
shadingBtn.addEventListener(`click`, () => squareColor = `shade`);
pickColorBtn = document.querySelector(`#btn__color--pick`);
pickColorBtn.addEventListener(`click`, () => squareColor = `color--pick`);







/*
// add eventListener for mousedown
const squaresContainer = document.querySelector(`#grid__container`);
let isMouseDown = false;
squaresContainer.addEventListener(`mousedown`, mouseDown);
function mouseDown() {
  isMouseDown = true;
  colorSquare();
};
window.addEventListener(`mouseup`, mouseUp);
function mouseUp() {
  isMouseDown = false;
  colorSquare();
};

// function to color square if mouse is down, and mouseover square
const squares = document.querySelectorAll(`.grid__squares`);
function colorSquare() {
  squares.forEach(square => {
    if (!isMouseDown) {
      return;
    };
    square.addEventListener(`mouseover`, () => {
      if (isMouseDown) {
        square.classList.add(`black`);
        //if (!isMouseDown) {
          //return;
        //};
      };
    });
  });
};
*/

/*
// function to color square if mouse is down, and mouseover square
const squares = document.querySelectorAll(`.grid__squares`);
function colorSquare() {
  squares.forEach(square => {
    //if (isMouseDown) {
      square.addEventListener(`mouseover`, colorize);
    //}else {
      //square.removeEventListener(`mouseover`, colorize);
    //}
    function colorize() {
      if (isMouseDown) {
      square.classList.add(`black`);
      };
    };
  });
};
*/


/*
squaresContainer.addEventListener('mousedown', colorSquare);
window.addEventListener('mouseup', noColor);

function colorSquare() {
  squares.forEach(square => {
    square.addEventListener(`mouseover`, color);
  });
};  

function noColor() {
  squares.forEach(square => {
    square.removeEventListener(`mouseover`, color);
  });
};

function color() {
  squares.forEach(square => {
    square.addEventListener(`mouseover`, () => {
    square.classList.add(`black`);
    });
  });
};
*/


/*
let mouseDown = 0;
  squaresContainer.addEventListener('mousedown', () => {
    mouseDown = 1;
    console.log(`mouse down ${mouseDown}`);
    colorSquare();
  });
  window.addEventListener(`mouseup`, () => {
    mouseDown = 0;
    console.log(`mouse up ${mouseDown}`);
    colorSquare();
  });

  function colorSquare() {
      squares.forEach(square => {
      if (mouseDown === 1) {
        let color = `black`;
          square.addEventListener(`mouseover`, colorize);
      }else if (mouseDown === 0) {
          square.removeEventListener(`mouseover`, colorize);
      };
    });
  };

  // works but does not turn off when mouse up
  function colorize() {
    squares.forEach(square => {
      square.addEventListener(`mouseover`, () => {
      square.classList.add(`black`);
      });
    }); 
  };
    */
        
  




/*  works, but once mousedown, square colored even after mouseup
function squareColorChange() {
  const squaresContainer = document.querySelector(`#grid__container`);
  squaresContainer.addEventListener(`mousedown`, () => {
      const squares = document.querySelectorAll(`.grid__squares`);
      squares.forEach(square => {
        square.addEventListener(`mouseover`, () => {
          square.classList.add(`black`);
        });
      });
  });
};
*/


