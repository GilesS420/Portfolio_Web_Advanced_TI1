updateHeader();
function adjustCardWidth(){
    const cards = document.querySelectorAll('.card'); // Aanpassing hier
    cards.forEach(card => {
        const textWidth = card.scrollWidth;
        card.style.width = textWidth + 'px';
    });
}

function selectCard(card){
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected'); 
}

function changeText(){
    const selectedCard = document.querySelector('.card.selected');
    if (selectedCard) {
        const newText = prompt('Geef het een nieuwe naam');
        if (newText !== null) {
            selectedCard.textContent = newText;
            saveCardData(selectedCard);
        }
    } else {
        alert('Selecteer eerst een element');
    }
}

function changeColor() {
    const selectedCard = document.querySelector('.card.selected');
    if (selectedCard) {
        const newColor = prompt('geef een nieuwe kleur in het engels of de kleurcode. (red, #aaa,...');
        if (newColor) {
            selectedCard.style.backgroundColor = newColor;
            saveCardData(selectedCard);
        }
    } else {
        alert('Selecteer eerst een element');
    }
}

function resetCard() {
    const selectedCard = document.querySelector('.card.selected');
    if (selectedCard) {
        selectedCard.textContent = selectedCard.dataset.originalText;
        selectedCard.style.backgroundColor = '#2b3137';
    } else {
        alert('Selecteer eerst een element');
    }
}

function saveCardData(card) {
    const cardId = card.dataset.cardId;
    const cardData = {
        text: card.textContent,
        color: card.style.backgroundColor
    };
    localStorage.setItem(`card_${cardId}`, JSON.stringify(cardData));
}

// Functie om kaartgegevens te herstellen bij laden van de pagina
function restoreCardData() {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        const cardId = card.dataset.cardId;
        const cardData = JSON.parse(localStorage.getItem(`card_${cardId}`));
        if (cardData) {
            card.textContent = cardData.text;
            card.style.backgroundColor = cardData.color;
        }
    });
}

const cards = document.querySelectorAll('.card');
cards.forEach((card, index) => {
    card.dataset.cardId = index; // Gebruik index als unieke identifier
});

function updateHeader() {
    const userNameSpan = document.getElementById('userName');
    const userAgeSpan = document.getElementById('userAge');

    const user = JSON.parse(localStorage.getItem('user'));
    if (user){
    userNameSpan.textContent = user.name;
     userAgeSpan.textContent = user.age;
    }
    
}

document.addEventListener('DOMContentLoaded', () => {
    updateTable();
    updateHeader();
    restoreCardData(); 
});