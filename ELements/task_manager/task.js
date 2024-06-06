function generateModifiedPostcode(originalPostcode) {
    const randomOffset = Math.floor(Math.random() * 10); 
    const modifiedPostcode = parseInt(originalPostcode) + 900 * randomOffset; 
    return modifiedPostcode;
}

function storeUserData(user) {
    const originalPostcode = user.postcode;
    const modifiedPostcode = generateModifiedPostcode(originalPostcode);
    const userData = { ...user, modifiedPostcode }; 
    console.log('Modified User Data:', userData);
}

document.getElementById('showSummaryBtn').addEventListener('click', function() {
    generateSummary(); 
});

document.addEventListener('DOMContentLoaded', () => {
    fetch('DB.json')
        .then(response => response.json())
        .then(data => {
            const users = data.users; 
            localStorage.setItem('user', JSON.stringify(users[0])); 
        })
        .catch(error => console.error('Fout bij het laden van gebruikersgegevens:', error));

    const savedData = localStorage.getItem('user'); 
    jsonData = savedData ? JSON.parse(savedData) : {};

    restoreCardData();
});

function generateSummary() {
    const user = JSON.parse(localStorage.getItem('user')); 
    const originalPostcode = user.postcode;
    const modifiedPostcode = generateModifiedPostcode(originalPostcode);
    const cardIds = Object.keys(localStorage).filter(key => key.startsWith('card_'));
    const cardsData = cardIds.map(key => JSON.parse(localStorage.getItem(key)));
    let summary = '<h2>Samenvatting:</h2>';

    if (user) {
        const cards = [];
        for (let i = 0; i <= 5; i++) {
            const cardData = JSON.parse(localStorage.getItem(`card_${i}`));
            if (cardData) {
                cards.push(cardData.text);
            } else {
                cards.push("geen data"); // Fallback if card data is not available
            }
        }

        summary += `<p>Mijn naam is ${user.name}, ik ben ${user.age} jaar oud en ik woon in de buurt van postcodegebied ${originalPostcode}. Ik ben verhuisd van postcodegebied ${originalPostcode} naar ${modifiedPostcode} vanwege een wasberenplaag.</p>`;
        summary += `<p>Ik ben een ${cards[2]}.  ik werk/studeer het liefst in het ${cards[3]} . Ik kan ook genieten van een etentje, meestal eet ik ${cards[1]}  op restaurant, ik hou van een warm gerecht, zeker als het voor mij klaargemaakt is. Als ik helemaal niks wil doen speel ik gewoon ${cards[4]}, of speel ik met de ${cards[0]}.</p>`;
    } else {
        summary += '<p>Geen gebruikersgegevens gevonden.</p>';
    }

    document.getElementById('taskSummary').innerHTML = summary;
}
