const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 600;
let window_height = 400;

canvas.width = window_width;
canvas.height = window_height;

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;
    this.speed = speed;

    this.dx = this.speed;
    this.dy = this.speed;
  }

draw(context) {
  context.beginPath();

  // 🫧 Color con transparencia
  context.fillStyle = this.color; // usa rgba desde la creación
  context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
  
  // 🌫️ Sombra suave
  context.shadowColor = "rgba(0,0,0,0.2)";
  context.shadowBlur = 10;

  context.fill();

  // 🔲 Borde blanco suave
  context.strokeStyle = "rgba(255,255,255,0.8)";
  context.lineWidth = 2;
  context.stroke();

  context.closePath();

  // ✨ Brillo (efecto burbuja)
  context.beginPath();
  context.arc(
    this.posX - this.radius / 3,
    this.posY - this.radius / 3,
    this.radius / 4,
    0,
    Math.PI * 2
  );
  context.fillStyle = "rgba(255,255,255,0.6)";
  context.fill();
  context.closePath();

  // 🔤 Texto
  context.fillStyle = "#000";
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.font = "14px Arial";
  context.fillText(this.text, this.posX, this.posY);
}

  update(context) {
    this.draw(context);

    if (this.posX + this.radius > window_width) {
      this.posX = window_width - this.radius;
      this.dx = -this.dx;
    }

    if (this.posX - this.radius < 0) {
      this.posX = this.radius;
      this.dx = -this.dx;
    }

    if (this.posY + this.radius > window_height) {
      this.posY = window_height - this.radius;
      this.dy = -this.dy;
    }

    if (this.posY - this.radius < 0) {
      this.posY = this.radius;
      this.dy = -this.dy;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

let circles = [];

function generarCirculos(cantidad) {
  circles = [];

  for (let i = 0; i < cantidad; i++) {
    let radius = Math.random() * 30 + 20;

    let x = Math.random() * (window_width - 2 * radius) + radius;
    let y = Math.random() * (window_height - 2 * radius) + radius;

    let color = `hsl(${Math.random() * 360},70%,50%)`;
    let speed = Math.random() * 3 + 1;

    circles.push(new Circle(x, y, radius, color, i + 1, speed));
  }
}

function aplicarCambios() {
  let cantidad = document.getElementById("numCircles").value;
  window_width = parseInt(document.getElementById("canvasWidth").value);
  window_height = parseInt(document.getElementById("canvasHeight").value);

  canvas.width = window_width;
  canvas.height = window_height;

  generarCirculos(cantidad);
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach(c => c.update(ctx));
}

aplicarCambios();
animate();