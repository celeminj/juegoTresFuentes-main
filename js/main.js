const player = document.getElementById("player");
const playerCollider = document.getElementById("playerCollider");
const scoreElem = document.getElementById("score");
const enemigoContainer = document.getElementById("enemigo-container"); 
const fondo = document.getElementById("background");
const jugar = document.getElementById("botonPlay");
const modal = document.getElementById("modal");
const board = document.getElementById("board");
const fuente = document.getElementById("imagenFuente");
const vampiro = document.getElementById("vampiroVertical");
const gameOverScreen = document.getElementById('gameOverScreen');
const jugarotravez = document.getElementById('jugarDeNuevo');
const volverMenu = document.getElementById('returnMenu');
const vampiroHorizontal = document.getElementById('vampiro');


let morir = false;
let score = 0;
let gameStarted = false;
let scoreInterval;
let enemigoInterval;
let mapacheInterval;
let enemigoArray = [];
let index = 0;
let gameOver = false;

jugar.addEventListener("click", function () {
    modal.classList.add('modal-off'); // Ocultar el modal   
    board.style.display = "block";
    if (!gameStarted) {
        startScoreCounter();
        gameStarted = true;
        generadorEnemigos();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.code === "Space") {
        player.classList.add("playerJump");
        player.style.backgroundImage = "url('./img/gifchica_saltando.gif')";
    }
});

player.addEventListener('animationend', () => {
    player.classList.remove("playerJump");
    player.style.backgroundImage = "url('./img/gifchica.gif')";
});

document.addEventListener("keydown", function (event) {
    if (event.code === "ArrowDown") {
        playerCollider.style.animation = "agacharse 0.1s forwards";
        player.style.backgroundImage = "url('./img/gifchica_esquivar.png')";

       
    }
});

document.addEventListener("keyup", function (event) {
    if (event.code === "ArrowDown") {
        playerCollider.style.animation = "none";
        player.style.backgroundImage = "url('../img/gifchica.gif')";
        playerCollider.style.height = "100%";  // Restablecer el tamaño completo
        playerCollider.style.bottom = "0px";  // Restablecer la posición inicial
    }
});

function mostrarPantallaGameOver() {
    const gameOverScreen = document.getElementById('gameOverScreen');
    gameOverScreen.style.display = 'flex';
    console.log("Pantalla de 'Has muerto' mostrada.");

    jugarotravez.addEventListener("click", function () {
        reiniciarJuego();
    });

    volverMenu.addEventListener("click", function(){
        returnMenu();
    });
}

function startScoreCounter() {
    scoreInterval = setInterval(() => {
        score += 1;
        scoreElem.textContent = `Score: ${score}`;

        if (score == 100) {
            fuente.style.display = 'block';
            console.log("Primera fuente");
            setTimeout(() => {
                fuente.style.display = 'none';
            }, 2200);

        } else if (score == 200) {
            fuente.src = './img/segundafuente.gif';
            fuente.style.width = '30%';
            fuente.style.display = 'block';
            console.log("SEGUNDA FUENTE");
            setTimeout(() => {
                fuente.style.display = 'none';
            }, 4200);

        } else if (score == 350) {
            fuente.src = './img/fuente3.gif';
            fuente.style.width = '30%';
            fuente.style.display = 'block';
            console.log("Tercera fuente");
            setTimeout(() => {
                fuente.style.display = 'none';
            }, 4200);
        }
        if (score >= 10) { 
            guardarScore(score); // Llama a la función para guardar el score
        }
    }, 100);
    return score;
}
/**
 * 
 * @returns 
 */
function detectarColision() {
    const playerRect = playerCollider.getBoundingClientRect();

    
    for (let enemigo of enemigoArray) {
        const enemigoRect = enemigo.getBoundingClientRect();

        // Verificar colisión entre el jugador y el enemigo
        const colisionEnemigo = (
            playerRect.left < enemigoRect.left + enemigoRect.width &&
            playerRect.left + playerRect.width > enemigoRect.left &&
            playerRect.top < enemigoRect.top + enemigoRect.height &&
            playerRect.top + playerRect.height > enemigoRect.top
        );

    
        if (colisionEnemigo) {
            console.log("Colisión detectada con un enemigo");
            return true;
        }
    }

   
    const vampiroRect = vampiro.getBoundingClientRect();
    const colisionVampiro = (
        playerRect.left < vampiroRect.left + vampiroRect.width &&
        playerRect.left + playerRect.width > vampiroRect.left &&
        playerRect.top < vampiroRect.top + vampiroRect.height &&
        playerRect.top + playerRect.height > vampiroRect.top
    );

    if (colisionVampiro) {
        console.log("Colisión detectada con el vampiro");
        return true;
    }

    // Si no hubo colisión con ningún enemigo ni vampiro, devuelve false
    return false;
}

function detenerAnimacionEnemigos() {
    vampiroHorizontal.style.animation = "none";
    
    for (let enemigo of enemigoArray) {
        enemigo.style.animation = "none";
        enemigo.style.left = enemigo.style.left;  // Asegura que el enemigo quede en su posición actual
        enemigo.style.top = enemigo.style.top;
    }

}

function reiniciarJuego() {
    score = 0;
    gameStarted = true;
    morir = false;
    fondo.style.animation = "moveBackground 10s linear infinite";
    gameOverScreen.style.display = 'none';

    enemigoContainer.innerHTML = '';
    enemigoArray = [];
    index = 0;
    vampiro.style.animation = "moveVampiroVertical 11s linear infinite"; 
    clearInterval(scoreInterval);
    clearInterval(enemigoInterval);
    clearInterval(mapacheInterval);
    startScoreCounter();
    
    generadorEnemigos();
}

function gameLoop() {
    if (detectarColision()) {
        morir = true;
        console.log("has muerto");
        fondo.style.animation = "none";
        vampiro.style.animation = "none"; 
        
        detenerAnimacionEnemigos();

        guardarScore(score);
        clearInterval(scoreInterval);
       
        gameStarted = false;
        mostrarPantallaGameOver();
        clearInterval(enemigoInterval);
        clearInterval(mapacheInterval);
    }
    requestAnimationFrame(gameLoop);
}

function generadorEnemigos() {
    
    if (!morir){
        enemigoInterval = setInterval(() => {

            let nuevoDiv = document.createElement("div");
            nuevoDiv.classList.add("enemigo");
               
            enemigoContainer.appendChild(nuevoDiv);
            enemigoArray.push(nuevoDiv);

           
            console.log("Enemigo añadido: " + enemigoArray.length);

        }, 3000); 
        
        mapacheInterval = setInterval(() => {

            let enemigoMapache = document.createElement("div");
            enemigoMapache.classList.add("enemigosMapache");
               
            enemigoContainer.appendChild(enemigoMapache);
            enemigoArray.push(enemigoMapache);

        }, 15000);
    } 
       
    
    
}
function guardarScore(score) {
    
    fetch('./php/score.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ score: score })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Score guardado exitosamente');
        } else {
            console.log('Error al guardar el score:', data.message);
        }
    })
    .catch(error => console.error('Error:', error));
}

gameLoop();
