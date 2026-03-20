const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let window_width = 600;
let window_height = 400;

canvas.width = window_width;
canvas.height = window_height;

// 🔥 dirección SOLO afecta el origen
let direction = "top";

// 🫧 CLASE
class Circle {
  constructor(x, y, radius, color) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;

    this.dx = (Math.random() - 0.5) * 2;
    this.dy = 0;

    this.gravity = 0.2;   // 🔥 SIEMPRE hacia abajo
    this.friction = 0.6;

    this.life = 1;
    this.bounces = 0;
  }

  draw(context) {
    context.beginPath();

    context.globalAlpha = this.life;

    // relleno
    context.fillStyle = this.color;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2);
    context.fill();

    // borde blanco
    context.strokeStyle = "rgba(255,255,255,0.8)";
    context.lineWidth = 2;
    context.stroke();

    context.closePath();
    context.globalAlpha = 1;
  }

  update(context) {
    this.draw(context);

    // 🔥 GRAVEDAD SIEMPRE HACIA ABAJO
    this.dy += this.gravity;

    // 🧱 SUELO
    if (this.posY + this.radius >= window_height) {
      this.posY = window_height - this.radius;
      this.dy *= -this.friction;
      this.bounces++;

      // 💨 desaparecer después de varios rebotes
      if (this.bounces > 5) {
        this.dy = 0;
        this.life -= 0.02;
      }
    }

    // 🧱 paredes laterales
    if (this.posX + this.radius >= window_width) {
      this.posX = window_width - this.radius;
      this.dx *= -1;
    }

    if (this.posX - this.radius <= 0) {
      this.posX = this.radius;
      this.dx *= -1;
    }

    this.posX += this.dx;
    this.posY += this.dy;
  }
}

// 🔁 ARRAY
let circles = [];
let maxCircles = 5;

// 🫧 GENERAR SEGÚN DIRECCIÓN
function generarCirculo() {
  let radius = Math.random() * 30 + 20;
  let x, y;
  let dx = (Math.random() - 0.5) * 2;
  let dy = 0;

  if (direction === "top") {
    x = Math.random() * window_width;
    y = -radius;
  }

  if (direction === "bottom") {
    x = Math.random() * window_width;
    y = window_height + radius;
    dy = -3; // impulso hacia arriba
  }

  if (direction === "left") {
    x = -radius;
    y = Math.random() * window_height;
    dx = Math.random() * 3;
  }

  if (direction === "right") {
    x = window_width + radius;
    y = Math.random() * window_height;
    dx = -Math.random() * 3;
  }

  let color = `rgba(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255}, 0.4)`;

  let c = new Circle(x, y, radius, color);
  c.dx = dx;
  c.dy = dy;

  return c;
}

// 🎛️ CONTROLES
function aplicarCambios() {
  maxCircles = parseInt(document.getElementById("numCircles").value);
  window_width = parseInt(document.getElementById("canvasWidth").value);
  window_height = parseInt(document.getElementById("canvasHeight").value);

  direction = document.getElementById("direction").value;

  canvas.width = window_width;
  canvas.height = window_height;

  circles = [];
}

// 🔥 SPAWNER ALEATORIO
function spawner() {
  if (circles.length < maxCircles) {
    circles.push(generarCirculo());

    // posibilidad de que salgan varias juntas
    if (Math.random() < 0.3 && circles.length < maxCircles) {
      circles.push(generarCirculo());
    }
  }

  let delay = Math.random() * 1000 + 300;
  setTimeout(spawner, delay);
}

// 🎬 ANIMACIÓN
function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, window_width, window_height);

  circles.forEach((c, index) => {
    c.update(ctx);

    if (c.life <= 0) {
      circles.splice(index, 1);
    }
  });
}

// 🚀 INICIO
aplicarCambios();
spawner();
animate();