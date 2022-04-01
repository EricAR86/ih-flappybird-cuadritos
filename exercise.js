

// Creación del Videojuego

// Crear del área del juego

const myObstacles = []

const myGameArea = {
    canvas: document.createElement("canvas"),
    frames: 0,
    start: function(){
        this.canvas.width = 480
        this.canvas.height = 270
        this.context = this.canvas.getContext("2d")
        document.body.appendChild(this.canvas)

        // Establecer el motor
        this.interval = setInterval(updateGameArea, 20)
    },

    // Borra todo lo que está en la seccion del canvas
    clear: function(){
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height)
    },

    // Detiene el juego cuando colisiona
    stop: function () {
        clearInterval(this.interval)
    }
}

// Se ejecuta en tiempo real las funciones para que funcione el juego

const updateGameArea = () => {
    console.log("Ejecutando motor...")
    myGameArea.clear()
    player.newPos()
    player.update()
    updateObstacles()
    checkGameOver()
}

// Movimento del obstaculo de derecha a izquierda (hacia atrás)

const updateObstacles = () => {

    for (i = 0; i < myObstacles.length; i++){
        myObstacles[i].x += -1
        myObstacles[i].update()
    }

    myGameArea.frame += 1

    // SI LOS FRAMES SÍ SON DIVISIBLES ENTRE 120 Y EL RESIDUO ES CERO...
    if(myGameArea.frames % 123 === 0){
        console.log("Divisible entre 120")

        // Creacion de obstaculo
        let x = myGameArea.canvas.width
        let minHeight = 20
        let maxHeight = 200

        // Crear un rango para el obstaculo
        // Altura minima (20) < height (número) < altura maxima (200)
        let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
        console.log(height)

        // Crear espacio entre los Obstaculos
        let minGap = 50
        let maxGap = 200
        let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)

        // Crear pipa de arriba
        myObstacles.push(new Component(10, heigth, "green", x, 0 ))

        // Crear pipa de abajo
        myObstacles.push(new Component(10, x - height - gap, "green", x, height + gap))
    }
}

// Crear componentes o elementos del videojuego

class Component {
    constructor(width, height, color, x, y){
        this.width = width
        this.height = height
        this.color = color
        this.x = x
        this.y = y

        // Propiedades de la velocidad
        this.speedX = 0
        this.speedY = 0
    }

    update() {
        const ctx = myGameArea.context
        ctx.fillStyle = this.color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    newPos() {
        this.x += this.speedX
        this.y += this.speedY
    }

    left(){
        return this.x
    }

    right(){
        return this.x + this.width
    }

    top(){
        return this.y
    }

    bottom(){
        return this.y + this.height
    }

    // Comprobacion para ver si el jugador colisionó
    crashWith(obstacle){
        return !(
            this.bottom() < obstacle.top() ||
            this.top() > obstable.bottom() ||
            this.right() < obstacle.left() ||
            this.left() > obstacle.right()
        )
    }
}

// terminar la partida si el cuadrito chocó
const checkGameOver = () => {
    const crashed = myObstacles.some((element) => {
        return player.crashWith(element)
    })

    if(crashed){
        myGameArea.stop()
    }
    return
}

// Ejecuciones o comandos que hace el jugador

// Empieza el juego

myGameArea.start()

// Se crea al jugador (el cuadro)

const player = new Component(30,30, "red", 0, 110)

// Movimientos del jugador

// lo que sucede cuando se aprieta una tecla
document.addEventListener("keydown", (e) => {

    switch(e.key) {
        case "ArrowUp":
            player.speedY -= 1
            break
        case "ArrowDown":
            player.speedY += 1
            break
        case "ArrowLeft":
            player.speedX -= 1
            break
        case "ArrowRight":
            player.speedX += 1
            break
        default:
            break
    }
})

// lo que sucede cuando se suelta una tecla
document.addEventListener("keyup", (e) => {
    player.speedX = 0
    player.speedY = 0
})