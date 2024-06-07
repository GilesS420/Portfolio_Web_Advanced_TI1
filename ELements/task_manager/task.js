(function() {
    document.addEventListener('DOMContentLoaded', () => {
        fetch('DB.json')
            .then(response => response.json())
            .then(({ users }) => {
                localStorage.setItem('user', JSON.stringify(users[0]));
            })
            .catch(error => console.error('Fout bij het laden van gebruikersgegevens:', error));

        const savedData = localStorage.getItem('user'); 
        const jsonData = savedData ? JSON.parse(savedData) : {};

    });
})();


function generateModifiedPostcode(originalPostcode) {
    const randomOffset = Math.floor(Math.random() * 10); 
    const modifiedPostcode = parseInt(originalPostcode) + 100 * randomOffset; 
    return modifiedPostcode;
}


function storeUserData({ postcode: originalPostcode, ...user }) {
    const modifiedPostcode = generateModifiedPostcode(originalPostcode);
    const userData = { ...user, modifiedPostcode }; 
    console.log('Modified User Data:', userData);
}


document.getElementById('showSummaryBtn').addEventListener('click', function() {
    generateSummary(); 
});


function generateSummary() {
    const user = JSON.parse(localStorage.getItem('user')); 
    if (!user) {
        document.getElementById('taskSummary').innerHTML = '<p>Geen gebruikersgegevens gevonden.</p>';
        return;
    }
    
    const { name, age, postcode: originalPostcode } = user;
    const modifiedPostcode = generateModifiedPostcode(originalPostcode);
    
    const cards = [];
    for (let i = 0; i <= 5; i++) {
        const cardData = JSON.parse(localStorage.getItem(`card_${i}`));
        cards.push(cardData ? cardData.text : "geen data");
    }

    let summary = '<h2>Samenvatting:</h2>';
    summary += `<p>Mijn naam is ${name}, ik ben ${age} jaar oud en ik woon in de buurt van postcodegebied ${originalPostcode}. Ik ben verhuisd van postcodegebied ${modifiedPostcode} naar ${originalPostcode} vanwege een wasberenplaag.</p>`;
    summary += `<p>Ik ben een ${cards[2]}.  ik werk/studeer het liefst in het ${cards[3]} . Ik kan ook genieten van een etentje, meestal eet ik ${cards[1]}  op restaurant, ik hou van een warm gerecht, zeker als het voor mij klaargemaakt is. Als ik helemaal niks wil doen speel ik gewoon ${cards[4]}, of speel ik met de ${cards[0]}.</p>`;

    document.getElementById('taskSummary').innerHTML = summary;
}