const lineWidth = document.querySelector('#line-width');
const colors = document.querySelectorAll('.colors div');
const paintMode = document.querySelector('.paint-mode');
const clearBtn = document.querySelector('.clear-btn');
const imageAdd = document.querySelector('.image--add-btn');
const textInput = document.querySelector('.text--input');
const downloadBtn = document.querySelector('.download-btn');
const fontControl = document.querySelector('#font-control');
const eraseBtn = document.querySelector('.erase-btn');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const WIDTH = 700;
const HEIGHT = 700;
const COLOR_OPTION = 'selected';
let isFill = false;
let isErase = false;
let selectedColor = '#000000';

canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.strokeStyle = 'black';
ctx.fillStyle = 'black';

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
  const allColors = Array.from(e.target.parentNode.children);
  selectedColor = e.target.dataset.color;

  ctx.strokeStyle = selectedColor;
  ctx.fillStyle = selectedColor;

  eraseBtn.innerHTML = 'ERASE OFF';

  allColors.forEach((color) => {
    color.classList.remove(COLOR_OPTION);
    if (color.dataset.color === selectedColor) {
      color.classList.add(COLOR_OPTION);
    }
  });
};

colors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener('click', onChangeColor);
});

const onCanvasClear = (e) => {
  ctx.save();
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);
  ctx.restore();
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

const onImageAdd = (e) => {
  const file = e.target.files[0];
  const imageURL = URL.createObjectURL(file);

  const imgTag = document.createElement('img');
  imgTag.src = imageURL;

  imgTag.onload = () => {
    ctx.drawImage(imgTag, 0, 0, WIDTH, HEIGHT);
  };
  imageAdd.value = '';
  console.dir(imageAdd);
};

const onFontControl = (e) => {
  fontSize = fontControl.value;
  ctx.font = `${fontSize}px serif`;
};

const onTextInput = (e) => {
  ctx.save();
  const newText = textInput.value;
  const x = e.offsetX;
  const y = e.offsetY;

  onFontControl();
  ctx.lineWidth = 1;
  ctx.strokeText(newText, x, y);

  ctx.restore();
};

const onDownload = (e) => {
  const url = canvas.toDataURL();
  const link = document.createElement('a');

  link.href = url;
  link.download = 'drawing.png';
  link.click();
};

const onCanvasErase = (e) => {
  // isFill = false;

  if (!isErase) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    ctx.stroke();

    eraseBtn.innerHTML = 'ERASE ON';
    isErase = true;
  } else {
    ctx.strokeStyle = selectedColor;
    ctx.fillStyle = selectedColor;

    eraseBtn.innerHTML = 'ERASE OFF';
    isErase = false;
  }
};

canvas.addEventListener('mousedown', onCanvas);
canvas.addEventListener('mouseup', onCanvasOut);
canvas.addEventListener('mouseleave', onCanvasOut);
canvas.addEventListener('dblclick', onTextInput);

lineWidth.addEventListener('change', onChangeLineWidth);
paintMode.addEventListener('click', onChangePaintMode);
clearBtn.addEventListener('click', onCanvasClear);
imageAdd.addEventListener('change', onImageAdd);
downloadBtn.addEventListener('click', onDownload);
eraseBtn.addEventListener('click', onCanvasErase);
