let canvas = document.querySelector('canvas')
canvas.height = window.innerHeight
canvas.width = window.innerWidth

let c = canvas.getContext('2d')
let speed = 10
let distance = 50
let size = 50
let totalBalls = 100
let deceleration = 0.02

let mouse = {
  x: null,
  y: null,
}

window.addEventListener('mousemove', function (e) {
  mouse.x = e.x
  mouse.y = e.y
})

const circleFactory = (x, y, dx, dy, radius, hue) => {
  let self = {
    x,
    y,
    dx,
    dy,
    radius,
    hue,
  }
  return {
    draw: function () {
      c.beginPath()
      c.arc(self.x, self.y, self.radius, 0, Math.PI * 2, false)
      c.fillStyle = `hsl(${self.hue}, 50%, 75%)`
      c.strokeStyle = `hsl(${self.hue}, 50%, 55%)`
      c.stroke()
      c.fill()
    },
    update: function () {
      if (self.x + self.radius > innerWidth || self.x - self.radius < 0) {
        self.dx = -self.dx
      }

      if (self.y + self.radius > innerHeight || self.y - self.radius < 0) {
        self.dy = -self.dy
      }

      self.x += self.dx
      self.y += self.dy

      // mouse interactivity
      if (
        mouse.x - self.x < distance &&
        mouse.x - self.x > -distance &&
        mouse.y - self.y < distance &&
        mouse.y - self.y > -distance
      ) {
        let xchange = Math.floor(self.x - mouse.x) / speed
        let ychange = Math.floor(self.y - mouse.y) / speed
        if (xchange > 0) {
          self.dx = 0.5 - Math.floor(mouse.x - self.x) / speed
        }
        if (xchange < 0) {
          self.dx = -0.5 - Math.floor(mouse.x - self.x) / speed
        }

        if (ychange > 0) {
          self.dy = 0.5 - Math.floor(mouse.y - self.y) / speed
        }
        if (ychange < 0) {
          self.dy = -0.5 - Math.floor(mouse.y - self.y) / speed
        }

        // self.dx = Math.floor(self.x - mouse.x) / speed
        // self.dy = Math.floor(self.y - mouse.y) / speed
      } else {
        if (self.dx > 0.4) {
          self.dx -= deceleration
        }
        if (self.dy < -0.4) {
          self.dy += deceleration
        }
        if (self.dy > 0.4) {
          self.dy -= deceleration
        }
        if (self.dy < -0.4) {
          self.dy += deceleration
        }
      }
    },
  }
}

let circleArray = []
for (let i = 0; i < totalBalls; i++) {
  let radius = Math.floor(Math.random() * size + 1)
  let hue = Math.floor(Math.random() * 360)
  let x = Math.random() * (window.innerWidth - radius * 2) + radius
  let y = Math.random() * (window.innerHeight - radius * 2) + radius
  let dx = Math.random() - 0.5
  let dy = Math.random() - 0.5
  circleArray.push(circleFactory(x, y, dx, dy, radius, hue))
}

const animate = () => {
  requestAnimationFrame(animate)
  c.clearRect(0, 0, innerWidth, innerHeight)

  circleArray.forEach((el) => {
    el.draw()
    el.update()
  })
}

animate()
