//Initialize needed selectors
const gridContainer = document.querySelector('.gridContainer');
const resetButton = document.querySelector('#resetButton');
const gridSizeForm = document.querySelector('#gridInput');
const newGridButton = document.querySelector('#newGridButton');
const gridInputPartner = document.querySelector('#gridInputPartner');
const alertMessage = document.querySelector('#alerts');
const colorBox = document.querySelectorAll('.colorbox');
const selColor = document.querySelector('#selected-color');
const rainbowColor = document.querySelector('#rainbow');
//Sets default values for grid and sets the default color to black
gridSizeForm.value = 16;
let gridSize = gridSizeForm.value;
gridInputPartner.innerHTML = `by ${gridSize}`;
let newColor = "black";
let rgbFlag = 0
selColor.style.backgroundColor = `${newColor}`;


function createGrid() {
        let squareSize = 512/gridSize
    for (i = 0; i < (gridSize*gridSize); i++) {
        let gridSquare = document.createElement('div');
        gridSquare.classList.toggle('gridSquare');
        gridSquare.setAttribute('style',`width: ${squareSize}px; height: ${squareSize}px;`);
        gridContainer.appendChild(gridSquare);
        document.querySelectorAll('.gridSquare').forEach( a => {
            a.addEventListener('click', changeColor);
        });
    }

};

function clearGrid() {
    document.querySelectorAll('.gridSquare').forEach( a => {
        a.removeEventListener('click', changeColor)});
    document.querySelectorAll('.gridSquare').forEach(function(a){
        a.remove()
        })
    createGrid();
};

function changeColor(e) {
    if (rgbFlag == 1) {
        e.target.style.backgroundColor = `${randomRGB()}`;
    }
    else {
        e.target.style.backgroundColor = `${newColor}`;
    }
};

function randomRGB() {
    return `rgb(${(Math.ceil(Math.random() * 256))}, ${(Math.ceil(Math.random() * 256))}, ${(Math.ceil(Math.random() * 256))})`
}

function colorPicker(ebox) {
    if (ebox.target.id == `rainbow`) {
        rgbFlag = 1;
        selColor.style.removeProperty('background-color');
        selColor.classList.add('rainbowClass');
    }
    else {
        newColor = ebox.target.id
        rgbFlag = 0
        selColor.classList.remove('rainbowClass');
        selColor.style.backgroundColor = `${newColor}`;
    }
}

function colorClick() {
    document.querySelectorAll('.gridSquare').forEach( a => {
        a.addEventListener('mouseover', changeColor)
        });
};

function noColorClick() {
    document.querySelectorAll('.gridSquare').forEach( a => {
        a.removeEventListener('mouseover', changeColor)});
};



createGrid();
colorBox.forEach( box => {
    box.addEventListener('click', colorPicker);
});

resetButton.addEventListener('click', clearGrid);
gridContainer.addEventListener('mousedown', colorClick);
gridContainer.addEventListener('mouseup', noColorClick);
gridSizeForm.addEventListener('change', () => {
    gridSize = gridSizeForm.value
    gridInputPartner.innerHTML = `by ${gridSize}`;
    if (gridSize < 1) {
        gridSizeForm.value = 1;
        gridSize = gridSizeForm.value;
        gridInputPartner.innerHTML = `by ${gridSize}`;
        alertMessage.innerHTML = `Grid cannot be smaller than 1x1!`
    }
    if (gridSize > 100) {
        gridSizeForm.value = 100;
        gridSize = gridSizeForm.value;
        gridInputPartner.innerHTML = `by ${gridSize}`;
        alertMessage.innerHTML = `Grid cannot be larger than 100x100!`
    }

})
newGridButton.addEventListener('click', () => {
    gridSize = gridSizeForm.value;
        clearGrid();
} )

