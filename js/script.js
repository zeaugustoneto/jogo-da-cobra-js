let perdeuFrases = [
    'Perdeu... você sabe jogar? É só usar as setas...', 'Você perdeu. Pegue seu banquinho e saia de mansinho.', 'Eu pensei que você não sabia jogar... e você me provou certo', 'Talvez você não saiba onde estão as teclas no seu teclado...', 'Você está jogando com volante? Pois parece...', 'Cima, baixo, esquerda, direita... apenas 4 direções e mesmo assim você perdeu', 'Talvez seria melhor você botar na "Café com leite"', 'Vamo lá campeão, mais 50 tentativas e você tá pronto pro nível Médio, focooo', 'Não desista! Treino sempre será melhor que talento.', '"Jogo no easy e perco" - Você'

]

let speed = 0
let difficult, text
const board_border = 'black';
const board_background = 'white';
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]


let score = 0
let changingDirection = false;
let food_x
let food_y
//velocidade horizontal x
let dx = 10;
//velocidade vertical y 
let dy = 0;

//pegar elemento do canvas
const snakeBoard = document.getElementById("gameCanvas");
//retorna um contexto de duas dimensões
const snakeBoard_ctx = gameCanvas.getContext("2d");
function functionDifficult() {

    console.log("Speed: " + speed)



    if (speed == 0) {
    speed == 0
    difficult = document.getElementById("difficult-select").value
    switch (difficult) {
        case 'coffee-milk':
            speed = 400
            text =  'Mamão no açucar'
            break
        case 'very-easy':
            speed = 200
            text = "Muito fácil"
            break
        case 'easy':
            speed = 150
            text = "Fácil"
            break;
        case 'medium':
            speed = 100
            text = "Médio"
            break
        case 'hard':
            speed = 50
            text = "Difícil"
            break;
        case 'impossible':
            speed = 00
            text = "É impossível. Nem tenta."
            break;
        case "":
            break
    }

    if (difficult === "") {
        alert("Você não escolheu nenhuma dificuldade 🤔")
    } else {
        document.getElementById("user-difficult").innerHTML = text;
        main()
    }


     } else {
         console.log("Speed: " + speed)
         alert("Dificuldade modificada durante o jogo, e isso não pode 😒")
         document.location.reload();
     }


}
genFood()

document.addEventListener("keydown", changeDirection)

//a funçao main é chamada repetidamente para manter o jogo rodando
function main() {

    if (hasGameEnded()) {
        let perdeuAleatorio = Math.floor(Math.random() * perdeuFrases.length + 1)
        alert(perdeuFrases[perdeuAleatorio])
        document.location.reload();
    } else {
        changingDirection = false
        setTimeout(function onTick() {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();
            //repete
            main()
        }, speed)
    }
}

//desenha a borda ao redor do canvas
function clearCanvas() {
    //seleciona a cor para preencher o background
    snakeBoard_ctx.fillStyle = board_background
    //seleciona a cor para a borda do canvas
    snakeBoard_ctx.strokestyle = board_border
    //desenha um retângulo "cheio" para cobrir o canvas por completo
    snakeBoard_ctx.fillRect(0, 0, snakeBoard.width, snakeBoard.height)
    //desenha a borda ao redor do canvas inteiro
    snakeBoard_ctx.strokeRect(0, 0, snakeBoard.width, snakeBoard.height)

}
//função que desenha a cobra no canvas
function drawSnake() {
    //desenha cada parte
    snake.forEach(drawSnakePart);
}

function drawFood() {
    snakeBoard_ctx.fillStyle = 'lightgreen'
    snakeBoard_ctx.strokestyle = 'darkgreen'
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10)
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10)
}

//desenha uma parte da cobra
function drawSnakePart(snakePart) {
    //seleciona a cor para a parte da cobra
    snakeBoard_ctx.fillStyle = snake_col;
    //seleciona a cor da borda da parte da cobra
    snakeBoard_ctx.strokestyle = snake_border
    //desenha um retangulo cheio para representar a parte da cobra na coordenada que ela se encontra
    snakeBoard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
    //desenha a borda ao redor da parte da cobra
    snakeBoard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function hasGameEnded() {
    for (let i = 4; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true

    }
    const hitLeftWall = snake[0].x < 0
    const hitRightWall = snake[0].x > snakeBoard.width - 10
    const hitTopWall = snake[0].y < 0
    const hitBottomWall = snake[0].y > snakeBoard.height - 10

    return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall

}

function randomFood(min, max) {
    return Math.round((Math.random() * (max - min) + min) / 10) * 10
}

function genFood() {
    //gera um numero aleatorio para as coordenadas x e y da comida
    food_x = randomFood(0, snakeBoard.width - 10)
    food_y = randomFood(0, snakeBoard.height - 10)
    //se o numero aleatorio gera uma coordenada que ja é ocupada pela cobra,
    // gera uma nova localização para a comida
    snake.forEach(function hasSnakeEatenFood(part) {
        const hasEaten = part.x == food_x && part.y == food_y
        if (hasEaten) genFood()
    })
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    //previne a cobra de inverter a direção
    if (changingDirection) return;
    changingDirection = true
    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 10;
    }
}


//funçao de movimento da cobra
function moveSnake() {
    //cria a nova cabeça da cobra
    const head = {
        x: snake[0].x + dx, y: snake[0].y + dy
    }
    // adiciona a nova cabeça para o inicio do corpo da cobra
    snake.unshift(head)
    const hasEatenFood = snake[0].x === food_x && snake[0].y === food_y
    if (hasEatenFood) {
        //aumenta a pontuação
        score += scoreDifficult()
        //mostra pontuação na tela
        document.getElementById('score').innerHTML = score;
        //gera nova localização para comida
        genFood()
    } else {
        //remove a ultima parte do corpo da cobra
        snake.pop()
    }

}
function scoreDifficult() {
    switch (difficult) {
        case 'coffee-milk':
            return 0.25
            break
        case 'very-easy':
            return 2
            break;
        case 'easy':
            return 5
            break;
        case 'medium':
            return 10
            break;
        case 'hard':
            return 50
            break;
        case 'impossible':

            return 1000
            break;
    }
}

