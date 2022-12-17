
let canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let c = canvas.getContext('2d');


const drawCircle = ( x, y, dx, dy, radius, hue) => {
  c.beginPath();
  c.arc(x, y, radius, 0, Math.PI * 2, false);
  c.fillStyle = `hsl(${hue}, 50%, 75%)`;
  c.strokeStyle = `hsl(${hue}, 50%, 55%)`;
  c.stroke();
  c.fill();
}


// for (let i = 0; i < 100; i++) {
//   let radius = 44;
//   let hue = Math.floor(Math.random() * 360)
//   let x = Math.random() * (window.innerWidth - (radius * 2)) + radius;
//   let y = Math.random() * (window.innerHeight - (radius * 2)) + radius;
//   c.beginPath();
//   drawCircle(x, y, 0, 0, radius, hue);
// }

const circleFactory = (x, y, dx, dy, radius, hue) => {
  let self ={
    x,
    y,
    dx,
    dy,
    radius,
    hue,
  }
  return {
    draw: function () {
      // console.log(x);
      c.beginPath();
      c.arc(self.x, self.y, self.radius, 0, Math.PI * 2, false);
      c.fillStyle = `hsl(${self.hue}, 50%, 75%)`;
      c.strokeStyle = `hsl(${self.hue}, 50%, 55%)`;
      c.stroke();
      c.fill();
    },
    update: function () {
      if ( self.x + self.radius > innerWidth || self.x - self.radius < 0) {
        self.dx = -self.dx;
      }  
      
      if ( self.y + self.radius > innerHeight || self.y - self.radius < 0) {
        self.dy = -self.dy;
      }
    
      self.x += self.dx;
      self.y += self.dy;
    }
  }
}


let circleArray = [];
for (let i = 0; i < 50; i++) {
  let radius = 44;
  let hue = Math.floor(Math.random() * 360)
  let x = Math.random() * (window.innerWidth - (radius * 2)) + radius;
  let y = Math.random() * (window.innerHeight - (radius * 2)) + radius;
  let dx = (Math.random() - 0.5) * 8
  let dy = (Math.random() - 0.5) * 8
  circleArray.push(circleFactory( x, y, dx, dy, radius, hue));
}

console.log(circleArray)



let radius = 44;
let hue = Math.floor(Math.random() * 360)
let x = Math.random() * (window.innerWidth - (radius * 2)) + radius;
let y = Math.random() * (window.innerHeight - (radius * 2)) + radius;
let dx = (Math.random() - 0.5) * 8
let dy = (Math.random() - 0.5) * 8


const animate = () => {
  requestAnimationFrame(animate);
  c.clearRect( 0, 0, innerWidth, innerHeight);

  circleArray.forEach(el => {
    el.draw();
    el.update();
  });

};

animate();

