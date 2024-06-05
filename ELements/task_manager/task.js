document.getElementById('showSummaryBtn').addEventListener('click', function() {
    generateSummary(); 
});

function generateSummary() {
    const user = JSON.parse(localStorage.getItem('user'));
    const cardIds = Object.keys(localStorage).filter(key => key.startsWith('card_'));
    const cardsData = cardIds.map(key => JSON.parse(localStorage.getItem(key)));
    let summary = '<h2>Samenvatting:</h2>';

    if (user) {
        summary += `<p>Gebruikersnaam: ${user.name}</p>`;
        summary += `<p>Leeftijd: ${user.age}</p>`;
    }

    if (cardsData.length > 0) {
        summary += '<h3>Kaarten:</h3><ul>';
        cardsData.forEach(cardData => {
            summary += `<li> ${cardData.text}, ${cardData.color}</li>`;
        });
        summary += '</ul>';
    } else {
        summary += '<p>Geen kaarten gevonden.</p>';
    }

    document.getElementById('taskSummary').innerHTML = summary;
}


document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('jsonData');
    jsonData = savedData ? JSON.parse(savedData) : [];

    updateTable();
    updateHeader();
    restoreCardData(); 
});


function updateHeader() {
    const userNameSpan = document.getElementById('userName');
    const userAgeSpan = document.getElementById('userAge');
    const user = jsonData [0];
    if (user) {
        userNameSpan.textContent = user.name;
        userAgeSpan.textContent = user.age;
    }
}