
const body = document.querySelector('body');
const game = document.querySelector(".game");

const musicControl = document.querySelector('.music-control');
const audio = document.getElementById('audio');

let testLeft =0;
let testRight =0;
let testUp =0;
let testDown =0;

let auxContador =0;

let numeroAleatorio = Math.floor(Math.random() * 4) + 1;

let contador = 60;
const h1Element = document.querySelector('h1');

let win = 0;

const reset = document.querySelector("#reset");

const ashElement = document.querySelector("#ash"); 
const charmanderElement = document.querySelector("#charmander");
const pikachuElement = document.querySelector("#pikachu"); 
const zubatElement = document.querySelector("#zubat"); 

let capturedPokemons = [];

switch(numeroAleatorio){
    case 1:
        charmanderElement.style.right = '300px';
        charmanderElement.style.top = '300px';
        zubatElement.style.right = '800px';
        zubatElement.style.top = '55px';
        pikachuElement.style.right = '200px';
        pikachuElement.style.top = '500px';
        break;

    case 2:
        charmanderElement.style.right = '20px';
        charmanderElement.style.top = '600px';
        zubatElement.style.right = '300px';
        zubatElement.style.top = '300px';
        pikachuElement.style.right = '800px';
        pikachuElement.style.top = '500px';
        break;

    case 3:
        charmanderElement.style.right = '500px';
        charmanderElement.style.top = '330px';
        zubatElement.style.right = '700px';
        zubatElement.style.top = '330px';
        pikachuElement.style.right = '200px';
        pikachuElement.style.top = '330px';
        break;
}

const intervalo = setInterval(() => {
    if(testUp ==1 || testDown ==1 || testLeft == 1||testRight ==1 ){
        contador--;
        if(auxContador==1){
            contador++
        }
   }
    if (contador > 0) {
        
        h1Element.textContent = contador;
    } else {
        clearInterval(intervalo); 
        gameover.style.display = 'block';
        game.style.background = 'none';
        h1Element.style.display = 'none';
        reset.style.display = 'block';
        reset.addEventListener('click', () => {
            location.reload();
        });
        ashElement.style.display = 'none';
            zubatElement.style.visibility= 'hidden';
            pikachuElement.style.visibility= 'hidden';
            charmanderElement.style.visibility= 'hidden';
    }
}, 1000);


function getRightPosition() {
    return parseInt(ashElement.style.right.split('px')[0]) || 2;
}

function getTopPosition() {
    return parseInt(ashElement.style.top.split('px')[0]) || 80; 
}

function checkCollision(pokemon) {
    const ashRect = ashElement.getBoundingClientRect(); 
    const pokemonRect = pokemon.getBoundingClientRect();
    
    const collided = !(
        ashRect.top > pokemonRect.bottom ||
        ashRect.bottom < pokemonRect.top ||
        ashRect.right < pokemonRect.left ||
        ashRect.left > pokemonRect.right
    );

    if (collided) {
        console.log(`Colisão detectada com ${pokemon.id}`);
    }

    return collided;
}

function followAsh(pokemon) {
    const ashTop = getTopPosition();
    const ashRight = getRightPosition();
    
    pokemon.style.top = `${ashTop + 10}px`;
    pokemon.style.right = `${ashRight + 70}px`;
}

document.addEventListener('keydown', (event) => {
    switch (event.code) {
        case 'ArrowLeft':
            testLeft = 1;
            if (getRightPosition() < 800) {
                ashElement.style.right = `${getRightPosition() + 8}px`; 
                ashElement.src = 'assets/left.png';
            }
            break;
        case 'ArrowRight':
            testRight = 1;
            if (getRightPosition() > 2) {
                ashElement.style.right = `${getRightPosition() - 8}px`;
                ashElement.src = 'assets/right.png';
            }
            break;
        case 'ArrowUp':
            testUp = 1;
            if (getTopPosition() > 0) {
                ashElement.style.top = `${getTopPosition() - 8}px`; 
                ashElement.src = 'assets/back.png';
            }
            break;
        case 'ArrowDown':
            testDown=1;
            if (getTopPosition() < 625) {
                ashElement.style.top = `${getTopPosition() + 8}px`; 
                ashElement.src = 'assets/front.png';
            }
            break;
        default:
            break;
    }

    if (!capturedPokemons.includes(charmanderElement) && checkCollision(charmanderElement)) {
        charmanderElement.style.visibility= 'visible'; 
        capturedPokemons.push(charmanderElement);
        console.log("Charmander capturado!");
        win += 1;
    }
    if (!capturedPokemons.includes(pikachuElement) && checkCollision(pikachuElement)) {
        pikachuElement.style.visibility= 'visible'; 
        capturedPokemons.push(pikachuElement);
        console.log("Pikachu capturado!");
        win += 1;
        followAsh(pikachuElement); 
    }
    if (!capturedPokemons.includes(zubatElement) && checkCollision(zubatElement)) {
        zubatElement.style.visibility= 'visible'; 
        capturedPokemons.push(zubatElement);
        console.log("Zubat capturado!");
        win += 1;
        followAsh(zubatElement); 
    }

    capturedPokemons.forEach(followAsh);
    if(win==3){
        winner.style.display = 'block';
        game.style.background = 'none';
            h1Element.style.display = 'none';
            reset.style.display = 'block';
            reset.addEventListener('click', () => {
                location.reload();
            });
            ashElement.style.display = 'none';
            zubatElement.style.visibility= 'hidden';
            pikachuElement.style.visibility= 'hidden';
            charmanderElement.style.visibility= 'hidden';
            auxContador =1;

    }
});


musicControl.addEventListener('click', function () {
    if (musicControl.src.includes('off.png')) {
        musicControl.src = 'assets/icons/on.png';
        audio.play();
    } else {
        musicControl.src = 'assets/icons/on.png';
        audio.pause();
    }
});
