const lineWidth = document.querySelector('#line-width');
const colors = document.querySelectorAll('.colors div');

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;
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

  ctx.beginPath();
  ctx.moveTo(x, y);

  canvas.addEventListener('mousemove', onPanting);
};

const onCanvasOut = (e) => {
  canvas.removeEventListener('mousemove', onPanting);
};

const onChangeLineWidth = (e) => {
  ctx.lineWidth = e.target.value;
};

const onChangeColor = (e) => {
  ctx.strokeStyle = e.target.dataset.color;
};

colors.forEach((color) => {
  color.style.backgroundColor = color.dataset.color;
  color.addEventListener('click', onChangeColor);
});

canvas.addEventListener('mousedown', onCanvas);
canvas.addEventListener('mouseup', onCanvasOut);
canvas.addEventListener('mouseleave', onCanvasOut);

lineWidth.addEventListener('change', onChangeLineWidth);
