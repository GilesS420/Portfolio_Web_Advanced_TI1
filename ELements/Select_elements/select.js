updateHeader();
function adjustCardWidth(){
    const card = document.querySelectorAll('.card');
    cards.forEach(card => {
        const textWidth = card.scrollWidth
        card.style.width = textWidth + 'px'
    })
}

function selectCard(card){
    const cards = document.querySelectorAll('.card');
    cards.forEach(c => c.classList.remove ('selected'));
    card.classList.add('selected'); 
}

function changeText(){
    const selectedCard = document.querySelector('.card.selected');
    if (selectedCard) {
        const newText = prompt('Geef het een nieuwe naam');
        if (newText !== null) {
            selectedCard.textContent = newText;
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

const cards = document.querySelectorAll('.card');
const selectedCard = document.querySelector('.card.selected');
cards.forEach(card => {
    card.dataset.originalText = card.textContent;
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