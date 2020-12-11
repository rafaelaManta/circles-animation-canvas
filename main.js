const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

let frame = 500
let circles = []
const colors = ['#5C258D', '#4389A2']
canvas.width = innerWidth
canvas.height = innerHeight

const rand = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
};

const randomColor = (colors) => {
    return colors[Math.floor(Math.random() * colors.length)]
}


function Circle(x, y, radius, color) {

    this.x = x
    this.y = y
    this.vr = 0;
    this.life = true
    this.color = color
    this.radius = radius
    this.vy = rand(.1, .5)
    this.vx = rand(-3, 3)


    this.draw = function () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = this.color
        c.fill()
        c.closePath()
    }

    this.update = function () {

        this.vy += .07
        this.vr += .012
        this.y -= this.vy
        this.x += this.vx

        if (this.radius > 1) this.radius -= this.vr

        if (this.radius <= 1) this.life = false

        if (this.life) this.draw();


    }
}

const init = () => {

    circles.push(new Circle(rand(-rand(30, 120), window.innerWidth),
        rand(window.innerHeight + rand(30, 120), window.innerHeight + rand(30, 120) + 20),
        rand(30, 120), randomColor(colors))
    )
    frame += frame
}

const animate = () => {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (circles.length < frame) {
        init()
    }
    circles.forEach(circle => {
        circle.update()
    })

}

document.addEventListener("DOMContentLoaded", () => {

    addEventListener('resize', () => {
        canvas.width = innerWidth
        canvas.height = innerHeight
        init()
    })

    init()
    animate()

});





