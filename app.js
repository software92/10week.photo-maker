const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 500;
canvas.height = 500;

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
  canvas.removeEventListener('mousemove', onPanting);
};

canvas.addEventListener('mousedown', onCanvas);
canvas.addEventListener('mouseup', onCanvasOut);
