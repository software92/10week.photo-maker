const lineWidth = document.querySelector('#line-width');
const colors = document.querySelectorAll('.colors div');
const paintMode = document.querySelector('.paint-mode');
const clearBtn = document.querySelector('.clear-btn');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 500;
const HEIGHT = 500;
let isFill = false;

canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx.lineWidth = lineWidth.value;

const onPanting = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  ctx.lineTo(x, y);
  ctx.stroke();
};

const onCanvas = (e) => {
  const x = e.offsetX;
  const y = e.offsetY;

  ctx.moveTo(x, y);

  canvas.addEventListener('mousemove', onPanting);
};

const onCanvasOut = (e) => {
  if (isFill) {
    ctx.fill();
  }
  ctx.beginPath();
  canvas.removeEventListener('mousemove', onPanting);
};

const onChangeLineWidth = (e) => {
  ctx.lineWidth = e.target.value;
};

const onChangeColor = (e) => {
  ctx.strokeStyle = e.target.dataset.color;
  ctx.fillStyle = e.target.dataset.color;
};

colors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener('click', onChangeColor);
});

const onCanvasClear = (e) => {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
};

const onChangePaintMode = (e) => {
  if (isFill) {
    isFill = false;
    e.target.innerHTML = 'FILL';
  } else {
    isFill = true;
    e.target.innerHTML = 'STROKE';
  }
};

canvas.addEventListener('mousedown', onCanvas);
canvas.addEventListener('mouseup', onCanvasOut);
canvas.addEventListener('mouseleave', onCanvasOut);

lineWidth.addEventListener('change', onChangeLineWidth);
paintMode.addEventListener('click', onChangePaintMode);
clearBtn.addEventListener('click', onCanvasClear);
