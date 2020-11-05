/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-bitwise */
document.getElementById('create').addEventListener('click', () => {
  const total = document.getElementById('total');

  fetch('http://localhost:3000/img', {
    method: 'GET',
  })
    .then((res) => res.json())
    .then((res) => {
      total.innerText = res.total;
    });

  const canvas = document.createElement('canvas');
  const size = Number(document.getElementById('size').value);

  const num = Number(document.getElementById('number').value);

  canvas.height = size;
  canvas.width = size;

  const context = canvas.getContext('2d');

  const imageData = context.createImageData(size, size);

  const { data } = imageData;

  const color = [Math.floor(Math.random() * 255), Math.random() * 255, Math.random() * 255];

  let curX = 0;
  let tmpY = 0;
  let curY = 0;
  const area = [];

  for (let i = 0; i < num; i += 1) {
    const tempArea = new Array(num);
    area.push(tempArea);
  }

  for (let i = 0; i < num; i += 1) {
    for (let j = 0; j < num; j += 1) {
      area[i][j] = Math.floor(Math.random() * 2);
    }
  }

  for (let i = 0; i < size * size; i += 1) {
    if ((i + 1) % (size / num) === 0) {
      curX += 1;

      if (curX === num) {
        curX = 0;

        tmpY += 1;
      }

      if (tmpY === (size / num)) {
        tmpY = 0;
        curY += 1;
      }
    }

    if (area[curX][curY]) {
      data[i * 4 + 0] = color[0];
      data[i * 4 + 1] = color[1];
      data[i * 4 + 2] = color[2];
    } else {
      data[i * 4 + 0] = 255;
      data[i * 4 + 1] = 255;
      data[i * 4 + 2] = 255;
    }
    data[i * 4 + 3] = 255;
  }

  context.putImageData(imageData, 1, 0);

  const imgDataUrl = canvas.toDataURL();

  const img = document.createElement('img');

  img.src = imgDataUrl;
  img.style.border = '2px solid black';

  const imgzone = document.getElementById('imgzone');

  if (imgzone.lastElementChild) {
    imgzone.removeChild(imgzone.lastElementChild);
  }

  imgzone.appendChild(img);

  ///

  const url = document.createElement('textarea');

  url.id = 'resultUrl';
  url.innerText = imgDataUrl;

  const urlzone = document.getElementById('urlzone');

  if (urlzone.lastElementChild) {
    urlzone.removeChild(urlzone.lastElementChild);
  }

  urlzone.appendChild(url);
});

document.getElementById('copy').addEventListener('click', () => {
  const url = document.getElementById('resultUrl');
  url.select();
  document.execCommand('Copy');
});
