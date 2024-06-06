let jsonData = [
];
let updateClicked = false;
(updateHeader);

function updateTable() {
    const tbody = document.querySelector('#data-table tbody');
    tbody.innerHTML = '';

    jsonData.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.id}</td>
            <td contenteditable="true" class="editable" data-index="${index}" data-field="name">${item.name}</td>
            <td contenteditable="true" class="editable" data-index="${index}" data-field="age">${item.age}</td>
            <td><button onclick="deleteItem(${index})">Verwijderen</button></td>
        `;
        tbody.appendChild(row);
    });

    document.querySelectorAll('.editable').forEach(cell => {
        cell.addEventListener('blur', function(event) {
            const index = event.target.getAttribute('data-index');
            const field = event.target.getAttribute('data-field');
            const value = event.target.innerText;

            if (field === "age") {
                jsonData[index][field] = parseInt(value);
            } else {
                jsonData[index][field] = value;
            }
        });
    });
}

function deleteItem(index) {
    jsonData.splice(index, 1);
    updateTable();
}

document.getElementById('toevoegen').addEventListener('click', function(event) {
    const id = parseInt(document.getElementById('id').value);
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const postcode = document.getElementById('postcode').value;

    if (!validateForm(name, age, postcode)) {
        alert('Vul alle velden correct in.');
        return;
    }

    if (jsonData.some(item => item.id === id)) {
        alert('ID bestaat al. Gebruik een ander ID.');
        return;
    }

    const newItem = { id, name, age};
    jsonData.push(newItem);
    saveToLocalStorage(newItem); // Opslaan in lokale opslag

    updateTable();
    document.getElementById('add-item-form').reset();
});

document.getElementById('verzenden').addEventListener('click', async function(event) {
    const id = parseInt(document.getElementById('id').value);
    const name = document.getElementById('name').value;
    const age = parseInt(document.getElementById('age').value);
    const postcode = document.getElementById('postcode').value;

    if (!validateForm(name, age, postcode)) {
        alert('Vul alle velden correct in.');
        return;
    }

    if (jsonData.some(item => item.id === id)) {
        alert('ID bestaat al. Gebruik een ander ID.');
        return;
    }

    const newItem = { id, name, age, postcode };
    
    try {
        await saveToDatabase(newItem); 
        alert('Gegevens zijn succesvol verzonden naar de database.');
    } catch (error) {
        console.error('Er is een probleem opgetreden tijdens het verzenden naar de database:', error);
        alert('Er is een probleem opgetreden tijdens het verzenden naar de database.');
    }
});

function validateForm(name, age, postcode) {
    const postcodeRegex = /^[1-9][0-9]{3}$/;
    return name && age && !isNaN(age) && postcodeRegex.test(postcode);
}

function saveToLocalStorage(name, age, postcode) {
    const user = { name, age, postcode };
    localStorage.setItem('user', JSON.stringify(user));
}

function saveToLocalStorage(name, age, postcode) {
    const user = { name, age, postcode };
    localStorage.setItem('user', JSON.stringify(user));
}



async function saveToDatabase(data) {
    const url = 'http://localhost:3000/users'; 
    try {
        await postData(url, data);
    } catch (error) {
        console.error('Failed to save data to the server:', error);
    }
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
        if (!response.ok) {
            throw new Error('Netwerk error');
        }
        return response.json();
    } catch (error) {
        console.error('probleem:', error);
    }
}

async function getUserDataFromDB() {
    const url = 'http://localhost:3000/users'; 
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch user data from the server');
        }
        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Er is een fout opgetreden bij het ophalen van gebruikersgegevens:', error);
        throw error;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    updateTable();
   
});

document.getElementById('updateButton').addEventListener('click', function(event) {
    updateClicked = true;
   
});