// canvas drawing
const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

ctx.strokeStyle = '#000000';
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 5;

let isDrawing = false;
let lastX = 0;
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e) {
   if (!isDrawing) return;
   // console.log(e);
   ctx.beginPath();
   ctx.moveTo(lastX, lastY);
   ctx.lineTo(e.offsetX, e.offsetY);
   ctx.stroke();
   [lastX, lastY] = [e.offsetX, e.offsetY];
}

canvas.addEventListener('mousedown', (e) => {
   isDrawing = true;
   [lastX, lastY] = [e.offsetX, e.offsetY];
});

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', () => (isDrawing = false));
canvas.addEventListener('mouseout', () => (isDrawing = false));

// changing width of line
const inputRange = document.querySelector('#myRange');

var slideValue = function () {
   var newValue = inputRange.value;
   var target = document.querySelector('#sliderValue');
   target.innerHTML = newValue;
   ctx.lineWidth = newValue;
};

inputRange.addEventListener('input', slideValue);

// clear canvas
const clearButton = document.querySelector('.clearButton');

clearButton.addEventListener('click', () => {
   ctx.clearRect(0, 0, 300, 300);
   ctx.fillStyle = 'white';
   ctx.fillRect(0, 0, canvas.width, canvas.height);
});

// sending image to backend

const myBtn = document.querySelector('.myButton');

myBtn.addEventListener('click', () => {
   var endpoint = '0.0.0.0/5000';

   var canvasObj = document.getElementById('draw');
   var img = canvasObj.toDataURL('image/jpeg');

   var url = `${endpoint}/your path`;

   fetch(url, {
      method: 'POST',
      body: img
   })
      .then((res) => res.json())
      .then((json) => console.log(json))
      .catch((err) => console.log(err));
});
