const settingsBtn = document.getElementById("settings")
const importBtn = document.getElementById("import")
const exportBtn = document.getElementById("export")
const returnBtn = document.getElementById("return")
const canvas = document.getElementById("canvas")
const white = document.getElementById("white");
const red = document.getElementById("red")
const blue = document.getElementById("blue")
const black = document.getElementById("black")
const width1 = document.getElementById("width")
const height1 = document.getElementById("height")

//document.body.appendChild(canvas)
const ctx = canvas.getContext("2d")

const controller = new Controller();
var openedState = "none";

var drawColor = 1;
var mouseX = 0;
var mouseY = 0;
var clicked = false;

var canvasLeft = 100;
var canvasTop = 100;
var canvasWidth = 400;
var canvasHeight = 400;

canvas.addEventListener('mousemove', e => {
  mouseX = e.pageX-canvasLeft;
  mouseY = e.pageY-canvasTop;
});


canvas.addEventListener('mousedown', e => {
  clicked = true;

});
canvas.addEventListener('mouseup', e => {
  clicked = false;
});

var gridWidth = 12;
var gridHeight = 12;

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

//to use
//createArray(height, width)
var grid = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]

settingsBtn.onclick = () => {
  openedState = "settings";
};
importBtn.onclick = () => {
  openedState = "import";
};
exportBtn.onclick = () => {
  openedState = "export";
};
returnBtn.onclick = () => {
  openedState = "none";
  if (width1.value != ""){
    gridWidth = width1.value;
  }
  if (height1.value !== ""){
    gridHeight = width1.value;
  }
  if (width1.value != "" || height1.value != ""){
    grid = createArray(gridHeight, gridWidth)
  }
}

white.onclick = () => {
  drawColor = 0;
}
black.onclick = () => {
  drawColor = 1;
}
red.onclick = () => {
  drawColor = 2;
}
blue.onclick = () => {
  drawColor = 3;
}
var mainLoop = function(){
  if (openedState === "none"){
    document.getElementById("settingsTab").style.display = "none";
    if (width1.value !== ""){
    width1.value = "";
    }
    if (height1.value !== ""){
    height1.value = "";
    }
  }
  if (openedState === "settings"){
    document.getElementById("settingsTab").style.display = "block";
    if (Number(width1.value) > 150){
      width1.value = "150";
    }
    if (Number(height1.value) > 150){
      height1.value = "150";
    }
  }
  let vel = 12;
  if (controller.shift){
    vel = 5;
  }
  if (openedState != "none"){
    vel = 0;
  }
  if (controller.right){
    canvasLeft -= vel;
  }
  if (controller.left){
    canvasLeft += vel;
  }
  if (controller.down){
    canvasTop -= vel;
  }
  if (controller.up){
    canvasTop += vel;
  }
  ctx.save();
  canvas.style.left = canvasLeft+"px";
  canvas.style.top = canvasTop+"px";
  canvasWidth = 30*grid[0].length;
  canvasHeight = 30*grid.length;
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  let width = canvasWidth/grid[0].length;
  let height = canvasHeight/grid.length;
  if (clicked){
    for(let i = 0; i < grid.length; i++){
		const array = grid[i]
		for(let j = 0; j < array.length; j++){
      if (mouseX > j*width-1 && mouseY > i*height-1 && mouseX < j*width-1 + width && mouseY < i*height-1 + height){
        grid[i][j]=String(drawColor);
      }
		}
	  }
  }
	for(let i = 0; i < grid.length; i++){
		const array = grid[i]
		for(let j = 0; j < array.length; j++){
      if (grid[i][j] === undefined){
        grid[i][j] = "0";
      }
      let color = "white"
      if (String(grid[i][j]) === "1"){
        color = "black"
      }
      if (String(grid[i][j]) === "2"){
        color = "red"
      }
      if (String(grid[i][j]) === "3"){
        color = "blue"
      }
      
			ctx.fillStyle = color;
			ctx.fillRect(j*width,i*height,width,height)
      ctx.strokeStyle = "rgb(0, 0, 0)"
			ctx.strokeRect(j*width,i*height,width,height)
      
		}
	}

  ctx.restore();
  requestAnimationFrame(mainLoop)
}
document.onkeydown = function(e){
  controller.keys[e.keyCode] =  true;
}
document.onkeyup = function(e){
  controller.keys[e.keyCode] = false;
}
canvas.addEventListener ("mouseout",
() => {
  console.log('ok')
  clicked = false;
}
, false);

requestAnimationFrame(mainLoop)