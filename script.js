const btnCloseModal = document.getElementById('buttonClose');
const allPlayers = document.getElementById("players-all");
// console.log(allPlayers.innerHTML);

let playersArray = JSON.parse(localStorage.getItem('players')) || [];


async function CallAPI() {
    let url = "players.json";
    let fetcher = await fetch(url);
    let json = await fetcher.json();

    console.log(json);
    console.log(json.players[0]);

    let selectedPosition = document.querySelectorAll(".player");
    // console.log(selectedPosition);

    selectedPosition.forEach((selectedArea) => {
        selectedArea.addEventListener('click', () => {
            console.log(selectedArea);
            displayPlayers(json.players, selectedArea);
            
        })
    })

    createDiv(json.players,playersArray);
}

CallAPI();


function displayPlayers(players, selectedPosition) {
    let modalContent = document.querySelector("#players-list");
    modalContent.innerHTML = "";

    let position = selectedPosition.querySelector("#selected-position").innerText.trim();

    let filteredPlayers = players.filter(player => player.position === position);

    filteredPlayers.forEach(player => {
        let playerCard = document.createElement("div");
        playerCard.classList.add("card", "m-2");
        playerCard.style.width = "150px";

        playerCard.innerHTML = `
            <img src="${player.photo}" alt="${player.name}" class="card-img-top">
            <div class="card-body text-center">
                <h6 class="card-title text-warning">${player.rating}</h6>
                <h6 class="card-title text-warning">${player.position}</h6>
                <p class="card-text" style="font-size: 0.8rem; color: rgb(168, 147, 123);">${player.name}</p>
            </div>
        `;
        modalContent.appendChild(playerCard);

        playerCard.addEventListener("click", () => {
            selectPlayer(player, selectedPosition);
        });
    });

    if (filteredPlayers.length === 0) {
        modalContent.innerHTML = `<p class="text-center text-warning">No players available for this position.</p>`;
    }
}

function selectPlayer(player, selectedPosition) {
    selectedPosition.innerHTML = "";

    selectedPosition.classList.remove("player");
    selectedPosition.classList.add("player-content");

    if (player.position === "GK") {
        selectedPosition.innerHTML = `
            <div class="d-flex align-items:center justify-content-center">
                <span style="position: relative; left: 10%;margin-top: 20%;" style="color: rgb(99, 87, 53);">${player.rating} <span>${player.position}</span></span>
                <img src="${player.photo}" alt="${player.name}" style="width: 75px;">
            </div>
            <div style="font-size: 0.7rem; color: rgb(0, 0, 0);">${player.name}</div>
            <div class="player-details">
                <div class="stat-row">
                    <span class="stat-label">DIV</span>
                    <span class="stat-value">${player.diving}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">HAN</span>
                    <span class="stat-value">${player.handling}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">KIC</span>
                    <span class="stat-value">${player.kicking}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">REF</span>
                    <span class="stat-value">${player.reflexes}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">SPD</span>
                    <span class="stat-value">${player.speed}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">POS</span>
                    <span class="stat-value">${player.positioning}</span>
                </div>
            </div>
            <div class="player-flags">
                <img src="${player.flag}" alt="Argentina" class="flag">
                <img src="${player.logo}" alt="${player.club}" class="flag">
            </div>
            <h1 id="selected-position" style="font-size: 1.5rem; margin-top: 15px; display: flex; justify-content: center;">${player.position}</h1>
        `;
    } else {
        selectedPosition.innerHTML = `
            <div class="d-flex align-items:center justify-content-center">
                <span style="position: relative; left: 10%;margin-top: 20%;" style="color: rgb(99, 87, 53);">${player.rating} <span>${player.position}</span></span>
                <img src="${player.photo}" alt="${player.name}" style="width: 75px;">
            </div>
            <div style="font-size: 0.9rem; color: rgb(0, 0, 0);">${player.name}</div>
            <div class="player-details">
                <div class="stat-row">
                    <span class="stat-label">PAC</span>
                    <span class="stat-value">${player.pace}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">SHO</span>
                    <span class="stat-value">${player.shooting}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">PAS</span>
                    <span class="stat-value">${player.passing}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">DRI</span>
                    <span class="stat-value">${player.dribbling}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">DEF</span>
                    <span class="stat-value">${player.defending}</span>
                </div>
                <div class="stat-row">
                    <span class="stat-label">PHY</span>
                    <span class="stat-value">${player.physical}</span>
                </div>
            </div>
            <div class="player-flags">
                <img src="${player.flag}" alt="Argentina" class="flag">
                <img src="${player.logo}" alt="${player.club}" class="flag">
            </div>
            <h1 id="selected-position" style="font-size: 1.5rem; margin-top: 10px; display: flex; justify-content: center;">${player.position}</h1>
        `;
    }

    btnCloseModal.click();
}

function createDiv(players) {
    players.forEach(player => {
        const element = document.createElement('div');
        element.classList.add("card-full");

        element.innerHTML = `
            <img src="src/assets/img/badge_ballon_dor.webp" class="first-image" alt="">
            <div class="card">
                <div class="card-inner">
                    <div class="card-top">
                        <div class="info">
                            <div class="value">${player.rating}</div>
                            <div class="position">${player.position}</div>
                        </div>
                        <div class="image">
                            <img src="${player.photo}" alt="${player.name}">
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div class="name">${player.name}</div>
                        <div class="stats">
                            <ul>
                                ${player.position !== "GK" ? `
                                    <li><span>PAC</span><span>${player.pace}</span></li>
                                    <li><span>SHO</span><span>${player.shooting}</span></li>
                                    <li><span>PAS</span><span>${player.passing}</span></li>
                                    <li><span>DRI</span><span>${player.dribbling}</span></li>
                                    <li><span>DEF</span><span>${player.defending}</span></li>
                                    <li><span>PHY</span><span>${player.physical}</span></li>
                                ` : `
                                    <li><span>DIV</span><span>${player.diving}</span></li>
                                    <li><span>HAN</span><span>${player.handling}</span></li>
                                    <li><span>KIC</span><span>${player.kicking}</span></li>
                                    <li><span>REF</span><span>${player.reflexes}</span></li>
                                    <li><span>SPD</span><span>${player.speed}</span></li>
                                    <li><span>POS</span><span>${player.positioning}</span></li>
                                `}
                            </ul>
                        </div>
                        <div class="country-club">
                            <div class="country">
                                <img src="${player.flag}" alt="${player.nationality}">
                            </div>
                            <div class="club">
                                <img src="${player.logo}" alt="${player.club}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        allPlayers.appendChild(element);
    });
}


const addPlayerButton = document.querySelector('.ajouterPlayer');
const modal = document.getElementById('customModal');
const closeModalButton = document.getElementById('closeModal');
const addPlayerForm = document.getElementById('addPlayerForm');
const playersAll = document.getElementById('players-all');

addPlayerButton.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Ajoute un joueur
addPlayerForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const player = {
        name: document.getElementById('playerName').value,
        photo: document.getElementById('photo').value,
        position: document.getElementById('position').value,
        nationality: document.getElementById('nationality').value,
        club: document.getElementById('club').value,
        logo: document.getElementById('logo').value,
        rating: document.getElementById('rating').value,
        pace: document.getElementById('pace').value,
        shooting: document.getElementById('shooting').value,
        passing: document.getElementById('passing').value,
        dribbling: document.getElementById('dribbling').value,
        defending: document.getElementById('defending').value,
        physical: document.getElementById('physical').value,
        flag: document.getElementById('flag').value
    };

    
    const playerCard = document.createElement('div');
    playerCard.classList.add("card-full");

    playerCard.innerHTML = `
            <img src="src/assets/img/badge_ballon_dor.webp" class="first-image" alt="">
            <div class="card">
                <div class="card-inner">
                    <div class="card-top">
                        <div class="info">
                            <div class="value">${player.rating}</div>
                            <div class="position">${player.position}</div>
                        </div>
                        <div class="image">
                            <img src="${player.photo}" alt="${player.name}">
                        </div>
                    </div>
                    <div class="card-bottom">
                        <div class="name">${player.name}</div>
                        <div class="stats">
                            <ul>
                                ${player.position !== "GK" ? `
                                    <li><span>PAC</span><span>${player.pace}</span></li>
                                    <li><span>SHO</span><span>${player.shooting}</span></li>
                                    <li><span>PAS</span><span>${player.passing}</span></li>
                                    <li><span>DRI</span><span>${player.dribbling}</span></li>
                                    <li><span>DEF</span><span>${player.defending}</span></li>
                                    <li><span>PHY</span><span>${player.physical}</span></li>
                                ` : `
                                    <li><span>DIV</span><span>${player.diving}</span></li>
                                    <li><span>HAN</span><span>${player.handling}</span></li>
                                    <li><span>KIC</span><span>${player.kicking}</span></li>
                                    <li><span>REF</span><span>${player.reflexes}</span></li>
                                    <li><span>SPD</span><span>${player.speed}</span></li>
                                    <li><span>POS</span><span>${player.positioning}</span></li>
                                `}
                            </ul>
                        </div>
                        <div class="country-club">
                            <div class="country">
                                <img src="${player.flag}" alt="${player.nationality}">
                            </div>
                            <div class="club">
                                <img src="${player.logo}" alt="${player.club}">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        allPlayers.appendChild(playerCard);

        playersArray.push(player);
        localStorage.setItem('players', JSON.stringify(playersArray));
        
        addPlayerForm.reset();
        modal.style.display = 'none';
});
