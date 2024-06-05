let jsonData = [
    { "id": 1, "name": "John Doe", "age": 30 },
    { "id": 2, "name": "Jane Doe", "age": 25 },
    { "id": 3, "name": "Sam Smith", "age": 22 }
];

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

document.getElementById('add-item-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const postcode = document.getElementById('postcode').value;

    if (!validateForm(name, age, postcode)) {
        alert('Vul alle velden correct in.');
        return;
    }

    jsonData.push({ id: parseInt(id), name: name, age: parseInt(age) });
    saveToLocalStorage(name, age, postcode);
    updateHeader();
    updateTable();
    event.target.reset();
});

function validateForm(name, age, postcode) {
    const postcodeRegex = /^[1-9][0-9]{3}$/;
    return name && age && !isNaN(age) && postcodeRegex.test(postcode);
}

function saveToLocalStorage(name, age, postcode) {
    const user = { name, age, postcode };
    localStorage.setItem('user', JSON.stringify(user));
}

function updateHeader() {
    const userNameSpan = document.getElementById('userName');
    const userAgeSpan = document.getElementById('userAge');
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        userNameSpan.textContent = user.name;
        userAgeSpan.textContent = user.age;
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

function displayResult(name, age, postcode) {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        resultDiv.innerHTML = `
            <h2>Opgeslagen gegevens:</h2>
            <p>Naam: ${name}</p>
            <p>Leeftijd: ${age}</p>
            <p>Postcode: ${postcode}</p>
        `;
    }
}

function showError(name, age) {
    const errorElement = document.getElementById('errorUnderage');
    if (errorElement) {
        if (age < 18) {
            let jarenTevroeg = 18 - age;
            alert(`Sorry, ${name}, je bent niet oud genoeg om het volgende te zien. je moet nog ${jarenTevroeg} jaar wachten om dit te kunnen zien`);
        } else if (age > 25) {
            let jarenTelaat = age - 25;
            alert(`Sorry, ${name}, je bent te oud om het volgende te zien. je bent ${jarenTelaat} jaar te laat.`);
        }
        errorElement.style.display = 'block';
    }
}

function hideError() {
    const errorElement = document.getElementById('errorUnderage');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    updateTable();
    updateHeader();
});