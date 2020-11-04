/* eslint-disable no-alert */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-bitwise */
document.getElementById('create').addEventListener('click', () => {
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

  fetch('http://localhost:3000/img', {
    method: 'POST',
    body: JSON.stringify({ imgDataUrl }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((res) => {
      const img = document.createElement('img');

      img.id = 'resultImg';
      img.src = res.imgDataUrl;
      img.style.border = '2px solid black';

      const imgzone = document.getElementById('imgzone');

      if (imgzone.lastElementChild) {
        imgzone.removeChild(imgzone.lastElementChild);
      }

      document.getElementById('imgzone').appendChild(img);
    });
});

document.getElementById('save').addEventListener('click', () => {
  const imgName = prompt('Insert Image Name');

  if (imgName) {
    const imgzone = document.getElementById('imgzone');

    const fetchURL = document.createElement('p');
    fetchURL.innerText = `Fetch URL : http://localhost:3000/img/get:${imgName}`;
    imgzone.appendChild(fetchURL);

    const imgDataUrl = document.getElementById('resultImg').getAttribute('src');

    fetch('http://localhost:3000/img/save', {
      method: 'POST',
      body: JSON.stringify({ imgDataUrl, imgName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        alert('To get a picture data, send a fetch request to the URL below!');
      });
  }
});
