let grid = document.getElementById('grid');
let eraseButton = document.getElementById('reset-controller');
let selectedColor = "black";
let selectedSize = 16;
buildGrid(selectedSize);

//draggable constractors creates the ability rtt rounded controllers
const sizeController = Draggable.create("#size-controller",{
    type: "rotation",
    bounds:{minRotation:90, maxRotation: 180},
    ondragEnd: () => {
        sizeController[0].endRotation > 135 ?selectedSize = 32 : selectedSize = 16;
        eraseGrid();
    }
});
const colorController = Draggable.create("#color-controller",{
    type: "rotation",
    bounds:{minRotation:0, maxRotation: 90},
    ondragEnd: ()=> {
        colorController[0].endRotation < 45 ? selectedColor = 'black' : selectedColor = 'random';
    }
});


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
    console.log('invoking the paintgrid function')
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
    console.log('random rgb function started')
    var num = Math.round(0xffffff * Math.random());
    var r = num >> 16;
    var g = num >> 8 &  255;
    var b = num & 255;
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
}
//paint when mouse event is selectedColor
grid.addEventListener('mousedown', Event =>{
    console.log('mouse down event detected')
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
    console.log("bla")
    eraseGrid();
});

console.log("hjghjghjgfhjghjdfsghjghj")