let grid = document.getElementById('grid');
let eraseButton = document.getElementById('reset-controller');
let selectedColor = 'black'
let selectedSize = 24;
buildGrid(selectedSize);
let progressBar = document.getElementById('progress-bar');
const colorButtons = document.querySelectorAll('.color-choice');

function buildGrid(size) {
    let squareSize = document.getElementById('grid').clientWidth / size;
    //creating cquare and defining her size
    for(let i=1; i<=size*size; i++){
        let square = document.createElement('div')
        grid.appendChild(square);
        square.classList.add('square-grid')
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        //rounding square grid corners
        if(i==size){
            square.style.borderTopLeftRadius = "10px";
        }else if(i==size){
            square.style.borderTopRightRadius = "10px";
        }else if(i==size*size-size+1){
            square.style.borderBottomLeftRadius = "10px";
        }else if(i==size*size){
            square.style.borderBottomRightRadius = "10px";
        }
    }
}
//painting the grid
function paintGrid(elem, color){
    if(elem.buttons == 1){
        if(elem.target.classList == 'square-grid'){
            let square =elem.target;
            square.style.backgroundColor = color;
        }
    }else{
        //leave if mouse nt clicked
        return;
    }

}
//this function retuts the square-gridtodefault
function eraseGrid(){
    grid.innerHTML = '';
    buildGrid(selectedSize);
}
//returning0f random rgb colr
function getRandomRgb(){
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 &  255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
//paint when mouse event is selectedColor
grid.addEventListener('mousedown', Event =>{
    paintGridEvent = paintGrid(Event, selectedColor);
    if(Event.buttons == 1){
        window.addEventListener('mouseover', (e) =>{
            if(selectedColor == 'random'){
                paintGrid(e, getRandomRgb());
            }else{
                paintGrid(e, selectedColor);
            }
        })
    }

});

//clean the grid event
eraseButton.addEventListener('click', () =>{
    eraseGrid();
   
});

function changecolor(event) {
    switch (event.target.dataset.color) {
        case 'random':
        selectedColor = 'random';
        break;
        case 'black':
        selectedColor = 'black';
        break; 

    }
 
 }


function buttonHover() {
    this.style.border = '1px solid #FF0000';
}
function buttonStandard() {
    this.style.border = '1px solid #FF0000';
} 

colorButtons.forEach(colorButtons => colorButtons.addEventListener('click', changecolor));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseover', buttonHover));
colorButtons.forEach(colorButton => colorButton.addEventListener('mouseout', buttonStandard));


function rangeSlider(value) {
    let gridLabels = document.querySelectorAll('#range-value');
    progressBar.style.width = (value / 60) * 100 + '%';
    for (let i = 0; i < gridLabels.length; i++) {
      gridLabels[i].textContent = value;
    }
    document.querySelectorAll('#range-value').textContent = value;
    selectedSize = parseInt(value);
    eraseGrid();
    buildGrid();
    reInit();
    
  }

  function rangeSliderValue(value) {
    let gridLabels = document.querySelectorAll('#range-value');
    for (let i = 0; i < gridLabels.length; i++) {
      gridLabels[i].textContent = value;
    }
    progressBar.style.width = (value / 60) * 100 + '%';
  }

  function reInit() {
    eraseGrid();
    buildGrid();
    
  }