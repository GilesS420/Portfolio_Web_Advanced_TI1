document.addEventListener('DOMContentLoaded', () => {
    const FORM_ID = 'userForm';

    // Haal het formulier element op
    const form = document.getElementById(FORM_ID);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Haal de waarden uit het formulier
        const name = document.getElementById('name').value;
        const age = document.getElementById('age').value;
        const postcode = document.getElementById('postcode').value;

        // Valideer de invoer
        if (!validateForm(name, age, postcode)) {
            alert('Vul alle velden correct in.');
            return;
        }

        // Sla de data op in LocalStorage
        saveToLocalStorage(name, age, postcode);

        // Controleer leeftijd en toon game of foutmelding
        if (age >= 18) {
            startSnakeGame();
        } else {
            showError();
        }

        // Verstuur de gegevens naar de JSON-server
        const user = { name, age, postcode };
        const response = await postData('http://localhost:3000/users', user);
        
        if (response) {
            displayResult(name, age, postcode);
        }
    });

    function validateForm(name, age, postcode) {
        const postcodeRegex = /^[1-9][0-9]{3}$/;
        return name && age && postcodeRegex.test(postcode);
    }

    function saveToLocalStorage(name, age, postcode) {
        const user = { name, age, postcode };
        localStorage.setItem('user', JSON.stringify(user));
    }

    function displayResult(name, age, postcode) {
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `
            <h2>Opgeslagen gegevens:</h2>
            <p>Naam: ${name}</p>
            <p>Leeftijd: ${age}</p>
            <p>Postcode: ${postcode}</p>
        `;
    }

    function startSnakeGame() {
        const canvas = document.getElementById('snakeGame');
        const errorDiv = document.getElementById('errorUnderage');
        canvas.style.display = 'block';
        errorDiv.style.display = 'none';
    
        // Start de Snake-game
        const ctx = canvas.getContext('2d');
        document.addEventListener('keydown', changeDirection);
    
        let speed = 7;
        let tileCount = 20;
        let tileSize = canvas.width / tileCount - 2;
        let headX = 10;
        let headY = 10;
        const snakeParts = [];
        let tailLength = 2;
        let appleX = 5;
        let appleY = 5;
        let xVelocity = 0;
        let yVelocity = 0;
    
        function drawGame() {
            changeSnakePosition();
            let result = isGameOver();
            if (result) {
                return;
            }
        
            clearScreen();
            checkAppleCollision();
            drawApple();
            drawSnake();
        
            setTimeout(drawGame, 1000 / speed);
        }
    
        function isGameOver() {
            let gameOver = false;
    
            if (yVelocity === 0 && xVelocity === 0) {
                return false;
            }
    
            // Walls
            if (headX < 0 || headX === tileCount || headY < 0 || headY === tileCount) {
                gameOver = true;
            }
    
            for (let i = 0; i < snakeParts.length; i++) {
                let part = snakeParts[i];
                if (part.x === headX && part.y === headY) {
                    gameOver = true;
                    break;
                }
            }
    
            if (gameOver) {
                ctx.fillStyle = "white";
                ctx.font = "50px Verdana";
                ctx.fillText("Game Over!", canvas.width / 6.5, canvas.height / 2);
            }
    
            return gameOver;
        }
    
        function clearScreen() {
            ctx.fillStyle = 'black';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    
        function drawSnake() {
            ctx.fillStyle = 'green';
            for (let i = 0; i < snakeParts.length; i++) {
                let part = snakeParts[i];
                ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
            }
    
            snakeParts.push(new SnakePart(headX, headY));
            while (snakeParts.length > tailLength) {
                snakeParts.shift();
            }
    
            ctx.fillStyle = 'orange';
            ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);
        }
    
        function SnakePart(x, y) {
            this.x = x;
            this.y = y;
        }
    
        function changeSnakePosition() {
            headX = headX + xVelocity;
            headY = headY + yVelocity;
        }
    
        function drawApple() {
            ctx.fillStyle = 'red';
            ctx.fillRect(appleX * tileCount, appleY * tileCount, tileSize, tileSize);
        }
    
        function checkAppleCollision() {
            if (appleX === headX && appleY === headY) {
                appleX = Math.floor(Math.random() * tileCount);
                appleY = Math.floor(Math.random() * tileCount);
                tailLength++;
            }
        }
    
        function changeDirection(event) {
            if (event.keyCode === 38) {
                if (yVelocity === 1) return;
                yVelocity = -1;
                xVelocity = 0;
            }
    
            if (event.keyCode === 40) {
                if (yVelocity === -1) return;
                yVelocity = 1;
                xVelocity = 0;
            }
    
            if (event.keyCode === 37) {
                if (xVelocity === 1) return;
                xVelocity = -1;
                yVelocity = 0;
            }
    
            if (event.keyCode === 39) {
                if (xVelocity === -1) return;
                xVelocity = 1;
                yVelocity = 0;
            }
        }
    
        drawGame(); // Start het spel
    }

    function showError() {
        const canvas = document.getElementById('snakeGame');
        const errorDiv = document.getElementById('errorUnderage');
        canvas.style.display = 'none';
        errorDiv.style.display = 'block';
    }

    async function postData(url = '', data = {}) {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            return response.json();
        } catch (error) {
            console.error('Error:', error);
        }
    }
});