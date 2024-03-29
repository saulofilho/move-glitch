const canvasTag = document.querySelector('canvas');

canvasTag.width = window.innerWidth * 2;
canvasTag.height = window.innerHeight * 2;

canvasTag.style.width = window.innerWidth + 'px';
canvasTag.style.height = window.innerHeight + 'px';

const context = canvasTag.getContext('2d');
context.scale(2, 2);

let aimX = null;
let aimY = null;
let currentX = null;
let currentY = null;

let i = 0;

const images = [
  'https://saulofilho.github.io/photos/ThePhotosWereGreat/imgs/imgsLow/NYBikeGreenBlack.jpg',
  'https://saulofilho.github.io/photos/ThePhotosWereGreat/imgs/imgsLow/LABikeBlueWheelsBlueWhite.jpg',
].map(source => {
  const image = document.createElement('img');
  image.src = source;
  return image;
});

['mousemove', 'touchmove'].forEach(function(e) {
  document.addEventListener(e, function(event) {
    aimX = event.pageX;
    aimY = event.pageY;
    if (currentX === null) {
      currentX = event.pageX;
      currentY = event.pageY;
    }
  });
});

canvasTag.addEventListener('click', function() {
  i = i + 1;
  if (i >= images.length) {
    i = 0;
  }
});

const draw = () => {
  if (currentX) {
    if (images[i].complete) {
      context.drawImage(images[i], currentX - 1, currentY - 1, 400, 500);
    }

    currentX = currentX + (aimX - currentX) * 0.1;
    currentY = currentY + (aimY - currentY) * 0.1;
  }

  requestAnimationFrame(draw);
};

draw();
