document.addEventListener('DOMContentLoaded', () => {
    const FORM_ID = 'userForm';

   
    const form = document.getElementById(FORM_ID);

    const updateButton = document.getElementById('updateButton');
    if (updateButton) {
        updateButton.addEventListener('click', () => {
            const name = document.getElementById('name')?.value;
            const age = document.getElementById('age')?.value;

            if (name && age && !isNaN(age)) {
                saveToLocalStorage(name, age);
                updateHeader();
            } else {
                alert('Vul een naam en leeftijd in.');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', async (event) => {
            
            console.log("form is ingediend"); //controle 1
            

            const name = document.getElementById('name')?.value;
            const age = document.getElementById('age')?.value;
            const postcode = document.getElementById('postcode')?.value;

           
            if (!validateForm(name, age, postcode)) {
                alert('Vul alle velden correct in.');
                return;
            }

            


            saveToLocalStorage(name, age, postcode);

            updateHeader();

            if (parseInt(age, 10) >= 18 && parseInt(age, 10) <= 25) {
                hideError();
            } else {
                showError(name, age);
            }
            
           
            const user = { name, age, postcode };
            const response = await postData('http://localhost:3000/users', user)

            console.log("na het verzende van de gegevens naar de server"); // controle 2
            if (response) {
                displayResult(name, age, postcode);
            }
        });
    }

    function validateForm(name, age, postcode) {
        const postcodeRegex = /^[1-9][0-9]{3}$/;
        return name && age && !isNaN(age) && postcodeRegex.test(postcode);
    }

    function saveToLocalStorage(name, age, postcode) {
        const user = { name, age, postcode };
        localStorage.setItem('user', JSON.stringify(user));
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
                let jarenTevroeg = 18 - `${age}`;
                alert( `Sorry, ${name}, je bent niet oud genoeg om het volgende te zien. je moet nog` + jarenTevroeg+  ' jaar wachten om dit te kunnen zien');
            } else if (age > 25) {
                let jarenTelaat = `${age}` -25;
                alert(`Sorry, ${name}, je bent te oud om het volgende te zien. je bent ` + jarenTelaat + ' jaar te laat. ');
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