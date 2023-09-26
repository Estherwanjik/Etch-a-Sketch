let grid = document.getElementById('grid');
let eraseButton = document.getElementById('reset-controller');
let selectedColor = '';
let selectedSize = 16;
let progressBar = document.getElementById('progress-bar');
const colorButtons = document.querySelectorAll('.color-choice');
let defaultOpacity = 0;
buildGrid(selectedSize);

//buiding the grid
function buildGrid(size) {
    let squareSize = document.getElementById('grid').clientWidth / size;
    //creating cquare and defining her size
    for(let i=1; i<=size*size; i++){
        let square = document.createElement('div')
        grid.appendChild(square);
        square.classList.add('square-grid')
        square.style.width = squareSize + "px";
        square.style.height = squareSize + "px";
        square.style.opacity = defaultOpacity;
        //rounding square grid corners
        if(i==1){
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
            newOpacity = +square.style.opacity + 0.1;
            if(newOpacity <= 1 ) {
                square.style.opacity = newOpacity;
            }; 
        }
    }else{
        grid.removeEventListener('mouseover', painting);
    }
}

//this function returns the square-grid to default
function eraseGrid(){
    grid.innerHTML = '';
    buildGrid(selectedSize);
}
//returning 0f random rgb colr
function getRandomRgb(){
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 &  255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
//paint when mouse event is selectedColor
grid.addEventListener('mousedown', (Event) =>{
    painting(Event);
    if(Event.buttons == 1 && selectedColor != ''){
        grid.addEventListener('mouseover', painting); 
    }
});

//painting event when color is selected
function painting(e) {
    if(selectedColor == 'random'){
        paintGrid(e, getRandomRgb());
    }else if(selectedColor == 'black'){
        paintGrid(e, 'black');
    } else{
        createAlert()
    }
}
//clean the grid event
eraseButton.addEventListener('click', () =>{
    eraseGrid();
});
//color changing event when color is selected
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
//initiating the fuctioning of grid
function createAlert(){
    alert('Please choose color');
}

colorButtons.forEach(colorButtons => colorButtons.addEventListener('click', changecolor));
colorButtons.forEach(colorButtons => {
    colorButtons.addEventListener('click', () =>{
        document.querySelector('.special')?.classList.remove('special');
        colorButtons.classList.add('special');
    })
})
//giving functional values to the range slider
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
