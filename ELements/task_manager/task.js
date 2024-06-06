document.getElementById('showSummaryBtn').addEventListener('click', function() {
    generateSummary(); 
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('DB.json')
        .then(response => response.json())
        .then(data => {
            const user = data.users;
            localStorage.setItem('user', JSON.stringify(user)); // Opslaan van gebruikersgegevens in localStorage
    
        })
        .catch(error => console.error('Fout bij het laden van gebruikersgegevens:', error));

    const savedData = localStorage.getItem('jsonData');
    jsonData = savedData ? JSON.parse(savedData) : [];

    updateTable();
     restoreCardData();
});

function generateSummary() {
    const user = JSON.parse(localStorage.getItem('users')); 
    const cardIds = Object.keys(localStorage).filter(key => key.startsWith('card_'));
    const cardsData = cardIds.map(key => JSON.parse(localStorage.getItem(key)));
    let summary = '<h2>Samenvatting:</h2>';

    if (user) {
        summary += `<p>Gebruikersnaam: ${user.name}</p>`;
        summary += `<p>Leeftijd: ${user.age}</p>`;
        summary += `<p>Postcode: ${user.postcode}</p>`; // Let op de correcte spelling van postcode
    } else {
        summary += '<p>Geen gebruikersgegevens gevonden.</p>';
    }

    if (cardsData.length > 0) {
        summary += '<h3>Interesses :</h3><ul>';
        cardsData.forEach(cardData => {
            summary += `<li> ${cardData.text}, ${cardData.color}</li>`;
        });
        summary += '</ul>';
    } else {
        summary += '<p>Geen kaarten gevonden.</p>';
    }

    document.getElementById('taskSummary').innerHTML = summary;
}
