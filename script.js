const btnCloseModal = document.getElementById('buttonClose');

async function CallAPI() {
    let url = "players.json";
    let fetcher = await fetch(url);
    let json = await fetcher.json();

    console.log(json);

    let selectedPosition = document.querySelectorAll(".player");
    console.log(selectedPosition);

    selectedPosition.forEach((selectedArea) => {
        selectedArea.addEventListener('click', () => {
            console.log(selectedArea);
            displayPlayers(json.players, selectedArea);
        })
    })
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

    // let modalPlayer = document.getElementById('playerModal');

    selectedPosition.innerHTML = "";
    
    selectedPosition.classList.remove("player");
    selectedPosition.classList.add("player-content");

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
                             <h1 id="selected-position" style="font-size: 1.5rem; margin-top: 20px; display: flex; justify-content: center;">${player.position}</h1>
                        
                    `;

    btnCloseModal.click();

}