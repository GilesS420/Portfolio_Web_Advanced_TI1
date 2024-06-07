# Portfolio_Web_Advanced_TI1
Dit is mijn portfolio om mijn vaardigheden in webontwikkeling te presenteren. Dit protfolio is gemaakt in opdracht van Kevin Felix voor het vak Web Advanced (TI1)



## Hoe starten
Om een volledig functionele applicatie te hebben, heb je een json-server nodig. Als je dit al hebt, kun je stap 1 overslaan.

### Stap 1: install the jason server.
Open je terminal en voer het volgende commando in: `` npm install -g json-server ``. Dit zal enkele minuten duren om te installeren.

### stap 2: start the JSON server.
In je terminal, voer het volgende commando uit: ``json-server --watch db.json --port 3000 ``. De server draait nu, de applicatie zal nu volledig werken.



## Elementen
Deze onderwerpen worden hier kort uitgelegd  met telkens een voorbeld gehaald uit het protfolio. Elk element wordt ook een locatie gegeven zodat u het makkelijker kan terugvinden in de code.

 ### Elementen selecteren
Uitleg: De functie ``selectCard(card)`` zorgt ervoor dat wanneer een kaart wordt aangeklikt, alle andere kaarten deselecteren. De aangeklikte kaart wordt gemarkeerd als geselecteerd door de klasse ``"selected"`` toe te voegen.

### Elementen manipuleren
Uitleg: De functie ``changeColor`` selecteert een kaartelement dat door de gebruiker is gekozen en vraagt een nieuwe kleur. Nadat de gebruiker een kleur heeft ingevoerd, wordt de achtergrondkleur van het kaartelement aangepast.

### Een gebeurtenis aan een element koppelen
Uitleg: gebruik van event listeners, zoals  het toevoegen van een ``'click'-event ``listener aan elk ``'.card'-element``, waardoor een functie wordt aangeroepen wanneer erop wordt geklikt.

### Een formulier valideren
Uitleg: De functie ``validateForm(name, age, postcode)`` valideert het formulier op basis van de ingevoerde waarden voor naam, leeftijd en postcode.

### Gebruik maken van een constante
Uitleg: ``const randomOffset = Math.floor(Math.random() * 10);`` definieert een constante randomOffset. Deze constante zorgt ervoor dat er gegevens woden aangepast als er op een knop wordt geklikt

### Gebruik van template literals
Uitleg:  In de ``row.innerHTML`` binnen de ``updateTable()-functie`` worden Template literals gebruikt om de rij van de tabel te maken.

### Destructuring
Uitleg: ``const { name, age, postcode: originalPostcode } = user;``  gebruikt destructuring om specifieke eigenschappen van een object te halen.

### Spread- & rest-operator
Uitleg: ``const userData = { ...user, modifiedPostcode };`` maakt gebruik van de spread-operator om een object te maken met extra eigenschappen.

### Iteration  over een array
Uitleg: De ``forEach``-methode wordt gebruikt om door de jsonData-array te itereren in de ``updateTable()``-functie.

### Arrow function
Uitleg: De arrow-functie binnen de forEach-lus genereert de HTML-inhoud voor elke rij van de tabel door de gegevens in de jsonData-array te doorlopen.

### Callback function
Uitleg: De ``addEventListener``-methode accepteert een callback-functie, bijvoorbeeld in de event listeners voor klikgebeurtenissen.

### Promise
Uitleg: De functie ``postData(url, data)`` retourneert een Promise omdat deze asynchrone fetch-operaties uitvoert en het resultaat afhandelt.

### consumer methods
Uitleg:  In de ``then()``-methode van de Promise worden de gegevens geconsumeerd die zijn opgehaald door de fetch-operatie.

### Async & Await
Uitleg: De functie ``saveToDatabase(data)`` is gemarkeerd met het async-keyword en wacht op de resolutie van de ``postData``-functie met het await-keyword.

### Self executing function
Uitleg: De zelf-uitvoerende functie in de code zorgt ervoor dat de inhoud ervan wordt uitgevoerd zodra het DOM volledig is geladen, waardoor het mogelijk is om gebruikersgegevens op te halen, te verwerken en op te slaan nadat de pagina is geladen.

### Fetch om data op te halen
Uitleg: In plaats van data op te halen, wordt de Fetch API gebruikt om gegevens naar een server te verzenden in de postData-functie.

### JSON manipuleren en weergeven
Uitleg: ``.then(response => response.json())`` converteert de response naar JSON-formaat. 

### Basis CSS-animatie
Uitleg: De animatie wordt gebruikt in de sectie met de id #introductie. Het element met deze id wordt geanimeerd met behulp van de fadeIn-animatie. Deze animatie past de eigenschappen opacity en transform aan om het element van onzichtbaar naar zichtbaar te laten overgaan wanneer de pagina wordt geladen.

### Gebruik van een flexbox of CSS-grid
Uitleg:
-  Flexbox wordt gebruikt voor de opmaak van de elementen in de ``.container.`` Hier zorgt het voor de juiste uitlijning van de elementen binnen de container.
  
-  CSS Grid wordt gebruikt voor het ontwerp van de header. Het maakt gebruik van ``display: grid;`` om een raster te maken met drie kolommen.

### Gebruik van LocalStorage
Uitleg: De functie ``saveToLocalStorage(name, age, postcode)`` gebruikt :``localStorage.setItem()`` om gegevens op te slaan in de lokale opslag van de browser.



 


## Bronnen:

PowerPoints van het vak Web-essentials, Web advanced, programming essentials 1 

https://www.w3schools.com/css/css3_gradients.asp
https://stackoverflow.com/questions/38497334/how-to-run-html-file-on-localhost 
https://stackoverflow.com/questions/38673081/how-to-make-the-content-appear-on-scrolling-down-the-webpage
https://www.sitepoint.com/css-viewport-units-quick-start/#:~:text=The%20viewport%20is%20the%20area,tall%20as%20the%20browser%20window.
https://alfredservice.com/
https://www.sitepoint.com/react-intersection-observer-lazy-load-infinite-scroll-animations/
https://chatgpt.com/share/2259fee0-cabd-4056-a01f-1df26667ecdf
https://chatgpt.com/share/7b7df1c4-95eb-4c41-900d-cdd2d8e63371
https://stackoverflow.com/questions/62666734/localstorage-data-disappears-after-the-page-is-refreshed
https://stackoverflow.com/questions/20910459/javascript-snake-game
https://stackoverflow.com/questions/45536537/centering-in-css-grid
https://www.w3schools.com/css/css_grid.asp
https://www.youtube.com/watch?v=hVmyqgG9jx4&list=PLGsnrfn8XzXhJUyCxjyvMmHDD-HbL2pDy&index=11&ab_channel=MikeDerycke
https://www.youtube.com/watch?v=PUrpHmWSf_8&list=PLGsnrfn8XzXhJUyCxjyvMmHDD-HbL2pDy&index=10&ab_channel=MikeDerycke
https://www.youtube.com/watch?v=jH-aOdzAuwA&list=PLGsnrfn8XzXhJUyCxjyvMmHDD-HbL2pDy&index=9&ab_channel=MikeDerycke
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://www.w3schools.com/jsref/prop_win_localstorage.asp
https://chatgpt.com/share/73c47d24-03cc-4af2-a72c-a20bc9315a4f
https://chatgpt.com/share/1f7f8b3e-a9c1-4adf-ae47-3407adc30c0b
https://www.w3schools.com/js/js_json.asp
https://www.digitalocean.com/community/tutorials/how-to-work-with-json-in-javascript
https://chatgpt.com/share/f30b8d73-9b3b-45ce-81a3-d9ad290fcf28
https://www.freecodecamp.org/news/how-to-write-a-good-readme-file/
https://chatgpt.com/share/bb2946f9-6ecf-4dba-938f-fc9b79b41e90

note: door downtime can de Chat GPT server ben ik verschillende chats met chatGPT verloren
