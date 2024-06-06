let jsonData = [];
let updateClicked = false;
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
document.getElementById('add-item-form').addEventListener('submit', async function(event) {
    event.preventDefault();
    const id = document.getElementById('id').value;
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const postcode = document.getElementById('postcode').value;
    if (!validateForm(name, age, postcode)) {
        alert('Vul alle velden correct in.');
        return;
    }
    const newItem = { id: parseInt(id), name: name, age: parseInt(age) };
    jsonData.push(newItem);
    saveToLocalStorage(name, age, postcode);
    // Save to db.json via POST request
    await saveToDatabase(newItem);
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

document.addEventListener('DOMContentLoaded', () => {
    updateTable();
 
});

document.getElementById('updateButton').addEventListener('click', function(event) {
    updateClicked = true;
});