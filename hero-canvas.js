class Circle {
  constructor(x, y, radius, velocity, color, opacityModifier) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.velocity = { x: velocity.x, y: velocity.y };
    this.color = color;
    this.alpha = 1;
    this.opacityModifier = opacityModifier;
    this.canvas = document.querySelector('.canvas-hero');
  }

  draw(ctx) {
    ctx.save();
    ctx.globalAlpha = this.alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.stroke();
    ctx.fill();
    ctx.restore();
  }

  move() {
    if (this.isOutOfBounds()) {
      this.resetCircle();
    }

    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  update(ctx) {
    this.draw(ctx);
    this.move();
    this.updateAlpha();
  }

  isOutOfBounds() {
    return (
      this.x + this.radius > this.canvas.width ||
      this.x - this.radius < 0 ||
      this.y > this.canvas.height
    );
  }

  updateAlpha() {
    this.alpha =
      Math.abs(Math.sin(Date.now() * this.opacityModifier)) * 0.5 + 0.5;
  }

  resetCircle() {
    this.x =
      Math.random() * (this.canvas.width - this.radius * 2) + this.radius;
    this.y = -this.radius;
  }
}

class CanvasAnimation {
  constructor() {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.resizeCanvas();
    // this.colorsArr = ['#343434', '#1c1c1c', '#6c6c6c', '#575757', '#808080'];
    this.colorsArr = ['#ffffff', '#f5f5f5', '#eaeaea', '#d5d5d5', '#c0c0c0'];
    this.opacityModifiers = [0.001, 0.002, 0.003, 0.004, 0.005];
    this.circlesArr = [];
    this.initCircles();

    window.addEventListener('resize', () => {
      this.resizeCanvas();
      this.resetAllCircles();
    });

    this.initAnimation();
  }

  resizeCanvas() {
    const heroSection = document.querySelector('.hero');
    this.canvas.width = heroSection.offsetWidth;
    this.canvas.height = heroSection.offsetHeight;
  }
  initCircles() {
    const windowWidth = window.innerWidth;
    let circlesQuantity;
    let minCircleRadius;
    let maxCircleRadius;

    switch (true) {
      case windowWidth >= 375 && windowWidth < 768:
        circlesQuantity = 30;
        minCircleRadius = 3;
        maxCircleRadius = 8;
        break;
      case windowWidth >= 768 && windowWidth < 1200:
        circlesQuantity = 40;
        minCircleRadius = 5;
        maxCircleRadius = 10;
        break;
      case windowWidth > 1200:
        circlesQuantity = 60;
        minCircleRadius = 5;
        maxCircleRadius = 15;
        break;
      default:
        circlesQuantity = 20;
        minCircleRadius = 2;
        maxCircleRadius = 5;
    }

    this.circlesArr = Array.from({ length: circlesQuantity }, () => {
      const radius = randomRadius(minCircleRadius, maxCircleRadius);
      const x = Math.random() * (this.canvas.width - radius * 2) + radius;
      const y = Math.random() * (this.canvas.height - radius * 2) + radius;
      const velocity = { x: 0.2, y: (Math.random() + 0.1) * 5 };
      const color = this.colorsArr[randomNumber(0, this.colorsArr.length - 1)];
      const opacityModifier =
        this.opacityModifiers[
          randomNumber(0, this.opacityModifiers.length - 1)
        ];
      return new Circle(x, y, radius, velocity, color, opacityModifier);
    });
  }

  resetAllCircles() {
    this.circlesArr.forEach(circle => {
      circle.x =
        Math.random() * (this.canvas.width - circle.radius * 2) + circle.radius;
      circle.y =
        Math.random() * (this.canvas.height - circle.radius * 2) +
        circle.radius;
    });
  }

  initAnimation() {
    requestAnimationFrame(() => this.initAnimation());
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.circlesArr.forEach(circle => {
      if (circle.alpha <= 0) {
        circle.alpha = 1;
      }
      circle.update(this.ctx);
    });
  }
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randomRadius(min, max) {
  return Number((Math.random() * (max - min) + min).toFixed(1));
}

const canvas = document.querySelector('.canvas-hero');
const canvasAnimation = new CanvasAnimation(canvas);
