class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.onResize();

    this.particles = [];
    this.options = {
      bgColor: 'rgba(191,191,191,0.1)',
      particleCount: 60,
      particleRadius: 5,
      particleColor: 'rgba(255,255,255,0.2)',
      particleVelocity: 0.8,
      lineLength: 160,
      particleLife: 7,
    };

    window.addEventListener('resize', () => this.onResize());
  }

  onResize() {
    const bannerSection = document.querySelector('.section--banner');
    this.width = this.canvas.width = bannerSection.offsetWidth;
    this.height = this.canvas.height = bannerSection.offsetHeight;
  }

  init() {
    this.createParticles();
    this.animate();
  }

  createParticles() {
    this.particles = Array.from(
      { length: this.options.particleCount },
      () => new Particle(this),
    );
  }

  animate() {
    this.setBackground();
    this.drawAllParticles();
    this.drawLines();
    requestAnimationFrame(() => this.animate());
  }

  setBackground() {
    this.ctx.fillStyle = this.options.bgColor;
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  drawLines() {
    const { lineLength } = this.options;
    let length, opacity;
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const { x: x1, y: y1 } = this.particles[i];
        const { x: x2, y: y2 } = this.particles[j];
        length = this.distanceTo(x1, x2, y1, y2);
        if (length < lineLength) {
          opacity = 1 - length / lineLength;
          this.ctx.lineWidth = '0.5';
          this.ctx.strokeStyle = 'rgba(255,255,255,' + opacity + ')';
          this.ctx.beginPath();
          this.ctx.moveTo(x1, y1);
          this.ctx.lineTo(x2, y2);
          this.ctx.closePath();
          this.ctx.stroke();
        }
      }
    }
  }
  distanceTo(x1, x2, y1, y2) {
    return Math.hypot(x2 - x1, y2 - y1);
  }

  drawAllParticles() {
    this.particles.forEach(particle => {
      particle.calculateLife();
      particle.updatePosition();
      particle.draw();
    });
  }
}

class Particle {
  constructor(particleSystem) {
    this.particleSystem = particleSystem;
    this.reset();
  }

  reset() {
    this.setInitialPosition();
    this.setInitialVelocity();
    this.setInitialLife();
  }

  setInitialPosition() {
    const iconWrap = document.querySelector(
      '.section--banner .hexagon-icon-wrap',
    );
    const bannerSection = document.querySelector('.section--banner');
    const iconRect = iconWrap.getBoundingClientRect();
    const bannerRect = bannerSection.getBoundingClientRect();

    const startX = iconRect.left;
    const startY = iconRect.top - bannerRect.top;
    const endX = bannerRect.right - iconRect.right;
    const endY = bannerRect.bottom - iconRect.bottom;

    let withinBounds = false;

    while (!withinBounds) {
      this.x = Math.random() * this.particleSystem.width;
      this.y = Math.random() * this.particleSystem.height;
      if (!this.isWithinIconBounds(startX, startY, endX, endY)) {
        withinBounds = true;
      }
    }
  }
  setInitialVelocity() {
    this.velX = this.getRandomVelocity();
    this.velY = this.getRandomVelocity();
  }

  getRandomVelocity() {
    return (
      Math.random() * (this.particleSystem.options.particleVelocity * 2) -
      this.particleSystem.options.particleVelocity
    );
  }

  setInitialLife() {
    this.life = Math.random() * this.particleSystem.options.particleLife * 60;
  }

  updatePosition() {
    this.checkBoundaryCollision('x', this.velX, this.particleSystem.width);
    this.checkBoundaryCollision('y', this.velY, this.particleSystem.height);
    const iconWrap = document.querySelector(
      '.section--banner .hexagon-icon-wrap',
    );
    const bannerSection = document.querySelector('.section--banner');
    const iconRect = iconWrap.getBoundingClientRect();
    const bannerRect = bannerSection.getBoundingClientRect();

    const startX = iconRect.left;
    const startY = iconRect.top - bannerRect.top;
    const endY = bannerRect.bottom - iconRect.bottom;
    let withinBounds = false;

    while (!withinBounds) {
      this.move();
      if (
        !(
          this.x > startX &&
          this.x < startX + iconRect.width &&
          this.y > startY &&
          this.y < endY
        )
      ) {
        withinBounds = true;
      }
    }
  }

  isWithinIconBounds(startX, startY, endX, endY) {
    return this.x > startX && this.x < endX && this.y > startY && this.y < endY;
  }

  move() {
    this.x += this.velX;
    this.y += this.velY;
  }
  draw() {
    this.particleSystem.ctx.beginPath();
    this.particleSystem.ctx.arc(
      this.x,
      this.y,
      this.particleSystem.options.particleRadius,
      0,
      Math.PI * 2,
    );
    this.particleSystem.ctx.closePath();
    this.particleSystem.ctx.fillStyle =
      this.particleSystem.options.particleColor;
    this.particleSystem.ctx.fill();
  }

  checkBoundaryCollision(axis, velocity, boundary) {
    if (
      (this[axis] + velocity > boundary && velocity > 0) ||
      (this[axis] + velocity < 0 && velocity < 0)
    ) {
      this[axis === 'x' ? 'velX' : 'velY'] *= -1;
    }
  }

  calculateLife() {
    if (this.life < 1) {
      this.reset();
    }
    this.life -= 1;
  }
}
const bannerCanvasList = document.querySelectorAll('.canvas-banner');
console.log('bannerCanvasList: ', bannerCanvasList);
bannerCanvasList.forEach(canvas => {
  const particleSystem = new ParticleSystem(canvas);
  particleSystem.init();
});
