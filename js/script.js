let speed = 285
let difficult, text
const board_border = 'black';
const board_background = 'lightgrey';
const snake_col = 'lightgreen';
const snake_border = 'darkgreen';

let snake = [
    { x: 200, y: 200 },
    { x: 190, y: 200 },
    { x: 180, y: 200 },
    { x: 170, y: 200 },
    { x: 160, y: 200 }
]

let perdeuFrases = [
    'Perdeu... você sabe jogar? É só usar as setas...', 'Você perdeu. Pegue seu banquinho e saia de mansinho.', 'Eu pensei que você não sabia jogar, mas isso aí é sacanagem', 'Talvez você não saiba onde estão as teclas no seu teclado...', 'Você está jogando com volante?', 'Cima, baixo, esquerda, direita... apenas 4 direções e mesmo assim você perdeu', 'Vamo lá campeão, mais 50 tentativas e você consegue fazer 100 pontos', 'Não desista! Treino sempre será melhor que talento.', '"Jogo no easy e perco" - Você'

]

let score = 0, tamanho = 5
let changingDirection = false;
let food_x
let food_y
//velocidade horizontal x
let dx = 10;
//velocidade vertical y 
let dy = 0;

/* visão luis felipe
function setSpeedAndText(speedParam = 300, textParam = '') {
    speed = speedParam
    text = textParam
}
const difficults = {
    'coffee-milk': setSpeedAndText(400, 'Mamão com açucar'),

}

difficults[difficult] || setSpeedAndText()

*/

//pegar elemento do canvas
const snakeBoard = document.getElementById("gameCanvas");
//retorna um contexto de duas dimensões
const snakeBoard_ctx = gameCanvas.getContext("2d");
document.addEventListener("keydown", changeDirection)
var audio = document.getElementById("audioPlayer");
audio.volume = 0.2;

genFood()
clearCanvas()
drawSnake()

function functionDifficult() {

    console.log("Speed: " + speed)

    if (!speed) {
        difficult = document.getElementById("difficult-select").value


        switch (difficult) {
            case 'coffee-milk':
                speed = 400
                text = 'Mamão no açucar'
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
                speed = 1
                text = "É impossível. Nem tenta."
                break;
            case "":
                alert("Você não escolheu nenhuma dificuldade 🤔")
                break
        }


        document.getElementById("user-difficult").innerHTML = text;
        main()



    } else {
        console.log("Speed: " + speed)
        alert("Dificuldade modificada durante o jogo, e isso não pode 😒")
        document.location.reload();
    }


}

//document.addEventListener("onclick", changeDirection)

//a funçao main é chamada repetidamente para manter o jogo rodando
function main() {
    audio.play()
    if (hasGameEnded()) {
        let perdeuAleatorio = Math.floor(Math.random() * perdeuFrases.length)
        alert(perdeuFrases[perdeuAleatorio])
        document.location.reload();
    } else {
        changingDirection = false
        setTimeout(function onTick() {
            clearCanvas();
            drawFood();
            moveSnake();
            drawSnake();

            console.log("Snake length" + snake.length)
            //repete
            main()
        }, speedBoost())
    }
}

function speedBoost() {
    if (snake.length > tamanho) {
        tamanho = snake.length
        return speed = speed - 5
    } else {
        return speed
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
    console.log(speed)
}

function drawFood() {
    snakeBoard_ctx.fillStyle = 'darkred'
    snakeBoard_ctx.strokeStyle = 'darkgreen'
    snakeBoard_ctx.fillRect(food_x, food_y, 10, 10)
    snakeBoard_ctx.strokeRect(food_x, food_y, 10, 10)
}

//desenha uma parte da cobra
function drawSnakePart(snakePart) {
    //seleciona a cor para a parte da cobra
    snakeBoard_ctx.fillStyle = 'darkgreen';
    //seleciona a cor da borda da parte da cobra
    snakeBoard_ctx.strokeStyle = 'black'
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
        const hasEaten = part.x === food_x && part.y === food_y

        if (hasEaten) {
            genFood()
        }
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

    if ((keyPressed === UP_KEY && !goingDown)) {
        dx = 0;
        dy = -10;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if ((keyPressed === DOWN_KEY && !goingUp)) {
        dx = 0;
        dy = 10;
    }
    
}


function changeDirectionMobile(value) {

    if (changingDirection) return;
    changingDirection = true
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (value === left && !goingRight) {
        dx = -10;
        dy = 0;
    }

    if ((value === top && !goingDown)) {
        dx = 0;
        dy = -10;
    }

    if (value === right && !goingLeft) {
        dx = 10;
        dy = 0;
    }

    if ((value === bottom && !goingUp)) {
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
function scoreConst(ponto, aumento) {
    return [
        { ponto: 50, aumento: 5 },
    ]
}

function scoreDifficult() {
    if (score < 50) return 5
    else if (score < 70)  return 7
    else if (score < 120) return 10
    else if (score < 200) return 15
    else if (score < 400) return 18
    else if (score < 1000)  return 22
    else if (score >= 1000) return 25
}
/*
if(speed<= 280 && speed > 250){
return 5
}
else if(speed<= 250 && speed > 220){
return 10
}
else if(speed<= 220 && speed > 180){
return 25
}
else if(speed<= 180 && speed > 150){
return 50
}
else if(speed<= 150 && speed > 110){
return 120
}
else{
return 100000
}*/



/*

  }*/



