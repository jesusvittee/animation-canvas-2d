const canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");

//Obtiene las dimensiones de la pantalla actual
const window_height = window.innerHeight/2;
const window_width = window.innerWidth/2;

//El canvas tiene las mismas dimensiones que la pantalla
canvas.height = window_height;
canvas.width = window_width;

canvas.style.background = "#ff8";

class Circle {
  constructor(x, y, radius, color, text, speed) {
    this.posX = x;
    this.posY = y;
    this.radius = radius;
    this.color = color;
    this.text = text;

    this.speed = speed;

    this.dx = 1 * this.speed;
    this.dy = 1 * this.speed;
  }

  draw(context) {
    context.beginPath();

    context.strokeStyle = this.color;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.font = "20px Arial";
    context.fillText(this.text, this.posX, this.posY);

    context.lineWidth = 2;
    context.arc(this.posX, this.posY, this.radius, 0, Math.PI * 2, false);
    context.stroke();
    context.closePath();
  }

  update(context) {
  this.draw(context);

  // DERECHA
  if (this.posX + this.radius > window_width) {
    this.posX = window_width - this.radius; // 🔥 lo regresas al borde
    this.dx = -this.dx;
  }

  // IZQUIERDA
  if (this.posX - this.radius < 0) {
    this.posX = this.radius; // 🔥 lo colocas justo dentro
    this.dx = -this.dx;
  }

  // ARRIBA
  if (this.posY - this.radius < 0) {
    this.posY = this.radius;
    this.dy = -this.dy;
  }

  // ABAJO
  if (this.posY + this.radius > window_height) {
    this.posY = window_height - this.radius;
    this.dy = -this.dy;
  }

  this.posX += this.dx;
  this.posY += this.dy;
}
}

/* let arrayCircle=[];

for(let i=0; i<10;i++){

    let randomX =  Math.random()* window_width;
    let randomY =  Math.random()* window_height;
    let randomRadius = Math.floor(Math.random()*100 + 30);

    let miCirculo = new Circle(randomX, randomY, randomRadius, 'blue', i+1);

    //Agrega el objeto al array
    arrayCircle.push(miCirculo);
    arrayCircle[i].draw(ctx);
} */

let randomX = Math.random() * window_width;
let randomY = Math.random() * window_height;
let randomRadius = Math.floor(Math.random() * 100 + 30);

let miCirculo = new Circle(randomX, randomY, randomRadius, "blue", "Tec1", 5);
miCirculo.draw(ctx);

let miCirculo2 = new Circle(randomX, randomY, randomRadius, "red", "Tec2", 2);
miCirculo2.draw(ctx);

let updateCircle = function () {
  requestAnimationFrame(updateCircle);
 ctx.clearRect(0, 0, window_width, window_height);
  miCirculo.update(ctx);
  miCirculo2.update(ctx);
};

updateCircle();

