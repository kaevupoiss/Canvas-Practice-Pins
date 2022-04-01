window.onload = function () {
  canvasPins();
};

const canvasPins = function () {
  const canvas = document.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const color = 'rgb(237, 150, 140)'

  canvas.width = document.body.scrollWidth;
  canvas.height = window.innerHeight;
  canvas.style.display = 'block';

  const MAX_PIN_HEIGHT = 40;
  const PIN_SPACING = 20;
  const PIN_WIDTH = 15.0;

  ctx.lineWidth = PIN_WIDTH;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  let pins = []



  class Pin {
    constructor(x, y) {
      this.x = y % 2 == 0 ? x * PIN_SPACING : (x + 0.5) * PIN_SPACING;
      this.y = y * PIN_SPACING;
      this.height = Math.random() * MAX_PIN_HEIGHT;
      this.vh = (Math.random() - 0.5) * 2;

      this.color = color;
      this.radius = PIN_WIDTH / 2;
    }

    create () {
      ctx.beginPath();
      ctx.arc(this.x, this.y - this.height, this.radius, 0, Math.PI * 2, false);

      ctx.fillStyle = 'rgb(255, 161, 150)';
      ctx.fill();
    }

    animate () {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < pins.length; i++) {
        for (let j = 0; j < pins[i].length; j++) {
          const pin = pins[i][j];

          if (pin.height < 0) {
            pin.vh = -pin.vh;
          }

          if (pin.height > MAX_PIN_HEIGHT) {
            pin.vh = -pin.vh;
          }

          pin.height += pin.vh;

          ctx.beginPath();

          let grad = ctx.createLinearGradient(pin.x - pin.radius, pin.y + pin.radius, pin.x + pin.radius, pin.y - pin.height - pin.radius);
          grad.addColorStop(1, 'rgb(237, 150, 140)');
          grad.addColorStop(0, 'rgb(156, 79, 70)');
          ctx.strokeStyle = grad;
          ctx.moveTo(pin.x, pin.y);
          ctx.lineTo(pin.x, pin.y - pin.height);
          ctx.stroke();
          ctx.closePath();

          pin.create();
        }
      }
    }
  }

  function createPins () {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < (canvas.width - PIN_SPACING / 2) / PIN_SPACING; i++) {
      pins.push([]);
      for (let j = 0; j < canvas.height / PIN_SPACING; j++) {
        pins[i].push(new Pin(i, j))
        var pin = pins[i][j];

        pin.create();
      }
    }
  }

  createPins();

  const draw = setInterval(pins[0][0].animate, 1000 / 60);

  window.onresize = function () {
    clearInterval(draw);
    canvasPins();
  };
}