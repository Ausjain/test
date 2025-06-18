const canvas = document.getElementById('rainCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = { x: null, y: null };
window.addEventListener('mousemove', (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

class RainDrop {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * -canvas.height;
    this.length = Math.random() * 15 + 10;
    this.speed = Math.random() * 4 + 2;
    this.opacity = Math.random() * 0.5 + 0.3;
  }

  draw() {
    const distToMouse = Math.hypot(this.x - mouse.x, this.y - mouse.y);
    if (distToMouse < 100) {
      this.x += (this.x - mouse.x) / 10;
      this.y += (this.y - mouse.y) / 10;
    }

    ctx.beginPath();
    ctx.strokeStyle = `rgba(135,206,250,${this.opacity})`;
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + this.length);
    ctx.stroke();
  }

  update() {
    this.y += this.speed;
    if (this.y > canvas.height) {
      this.reset();
      this.y = 0;
    }
    this.draw();
  }
}

let drops = [];
for (let i = 0; i < 300; i++) {
  drops.push(new RainDrop());
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drops.forEach(drop => drop.update());
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
