const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 600;
let window_height = 400;

canvas.width = window_width;
canvas.height = window_height;

let direction = "top";

class Circle {
  constructor(x, y, radius, color) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;

    this.dx = (Math.random() - 0.5) * 2;
    this.dy = 0;

    // 🔥 gravedad variable (caída distinta)
    this.gravity = 0.15 + Math.random() * 0.15;

    // 🔥 rebote más natural
    this.friction = 0.65 + Math.random() * 0.2;

    this.bounces = 0;
    this.stopped = false;
  }

  draw(context) {
    context.beginPath();

    context.fillStyle = this.color;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.fill();

    context.strokeStyle = "rgba(255,255,255,0.8)";
    context.lineWidth = 2;
    context.stroke();

    context.closePath();
  }

  update(context) {
    if (this.stopped) {
      this.draw(context);
      return;
    }

    this.draw(context);

    // 🔥 gravedad con ligera variación
    this.dy += this.gravity * (0.95 + Math.random() * 0.1);

    // 🧱 suelo
    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius;

      // 🔥 rebote con pequeña aleatoriedad
      this.dy *= -(this.friction + Math.random() * 0.05);
      this.bounces++;

      // 🔥 después de varios rebotes pierde más energía
      if (this.bounces > 4) {
        this.dy *= 0.7;
      }

      // 🔥 CORTE DEFINITIVO (evita vibración infinita)
      if (Math.abs(this.dy) < 0.8 || this.bounces > 8) {
        this.dy = 0;
      }
    }

    // 🧱 paredes
    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius;
      this.dx *= -1;
    }

    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx *= -1;
    }

    // 🔥 fricción horizontal progresiva
    if (this.bounces > 3) {
      this.dx *= 0.92;

      if (Math.abs(this.dx) < 0.2) {
        this.dx = 0;
      }
    }

    this.posX += this.dx;
    this.posY += this.dy;

    // 🔥 detener completamente
    if (this.dy === 0 && Math.abs(this.dx) < 0.2) {
      this.dx = 0;
      this.stopped = true;
    }
  }
}

let circles = [];

function generarCirculo() {
  let radius = Math.random() * 30 + 20;
  let x, y;
  let dx = (Math.random() - 0.5) * 2;
  let dy = 0;

  if (direction === "top") {
    x = Math.random() * window_width;
    y = -radius;
    dy = Math.random() * 2;
  }

  if (direction === "bottom") {
    x = Math.random() * window_width;
    y = window_height + radius;
    dy = -4 - Math.random() * 2;
  }

  if (direction === "left") {
    x = -radius;
    y = Math.random() * window_height;
    dx = Math.random() * 4;
  }

  if (direction === "right") {
    x = window_width + radius;
    y = Math.random() * window_height;
    dx = -Math.random() * 4;
  }

  let color = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.4)`;

  let c = new Circle(x, y, radius, color);
  c.dx = dx;
  c.dy = dy;

  return c;
}

function aplicarCambios() {
  let cantidad = parseInt(document.getElementById("numCircles").value);

  window_width = parseInt(document.getElementById("canvasWidth").value);
  window_height = parseInt(document.getElementById("canvasHeight").value);

  direction = document.getElementById("direction").value;

  canvas.width = window_width;
  canvas.height = window_height;

  circles = [];

  for (let i = 0; i < cantidad; i++) {
    circles.push(generarCirculo());
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach((c) => {
    c.update(ctx);
  });
}

aplicarCambios();
animate();