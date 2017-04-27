const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
const w = canvas.width;
const h = canvas.height;

const drawer = new Drawer(ctx);

let gameLoop = null;
let fps = 60;

let playerScore = 0;
let aiScore = 0;

let playerRacketHeight = 100;
let playerRacketY = 200;
let playerRacketX = 0;

let AIRacketHeight = 100;
let AIRacketY = 200;
let AIRacketX = w-10;

let ballRadius = 5;
let ballX = w/2;
let ballY = h/2;
let ballSpeedX = 8;
let ballSpeedY = 8;

function runGame() {
    move();
    draw();
    aiMove();
}

function move() {
    // reflect ball from  player's racket
    if (ballX <= 10 && ballY + ballRadius > playerRacketY && ballY - ballRadius < playerRacketY + playerRacketHeight) {
        ballSpeedX = -ballSpeedX;
        
        const deltaY = ballY - (playerRacketY + playerRacketHeight / 2);
        ballSpeedY = deltaY * 0.3;
    }
    // reflect ball from  AI's racket
    if (ballX >= w-10 && ballY + ballRadius > AIRacketY && ballY - ballRadius < AIRacketY + AIRacketHeight) {
        ballSpeedX = -ballSpeedX;
    }

    if (ballX < 0) {
        aiScore++;
        restartGame();
    }
    if (ballX >= w) {
        playerScore++;
        restartGame();
    }

    // reflect ball from top/bottom border
    if (ballY <= 0 || ballY >= h) {
        ballSpeedY = -ballSpeedY;
    }

    ballX += ballSpeedX;
    ballY += ballSpeedY;
}

function aiMove() {
    const racketCenter = AIRacketY + (AIRacketHeight / 2);
    
    if (ballSpeedX < 0 || Math.abs(racketCenter - ballY) < 30) { return; }
    
    if (racketCenter < ballY) {
        AIRacketY += 12;
    } else {
        AIRacketY -= 12;
    }

}

function draw() {
    drawer.drawRect('black', 0, 0, w, h); // game filed
    drawer.drawRect('white', playerRacketX, playerRacketY, 10, playerRacketHeight); // palyer racket
    drawer.drawRect('white', AIRacketX, AIRacketY, 10, AIRacketHeight); // ai racket
    drawer.drawCircle('white', ballX, ballY, ballRadius*2, 0, 2 * Math.PI, false) // ball
    drawer.drawText('white', w/2, 50, '44px sans-serif', playerScore + ' : ' + aiScore) // scores
}

function getMouseCoords(e) {
    const canvasCoords = canvas.getBoundingClientRect();
    const documentElement = document.documentElement;

    const x = e.clientX - canvasCoords.left - documentElement.scrollLeft;
    const y = e.clientY - canvasCoords.top - documentElement.scrollTop;
    
    return { x, y };
}

function restartGame() {
    ballX = w/2;
    ballY = h/2;

    ballSpeedX = 8;
    ballSpeedY = 8;
}

gameLoop = setInterval(runGame, 1000/fps);

window.addEventListener('mousemove', (e) => {
    const mouseCoords = getMouseCoords(e);
    playerRacketY = mouseCoords.y - playerRacketHeight / 2;
});