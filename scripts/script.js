const apiKey = '1ccc864e54mshfa02d5dc47905fdp13e514jsneaf87ea295a0';
const apiHost = 'basketball-head.p.rapidapi.com'

document.getElementById('getRosterButton').addEventListener('click', async () => {
    const selectedTeam = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (let i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked) {
            selectedTeam.push(checkboxes[i].value);
            
        }
    }
if (selectedTeam.length === 0) {
    alert('Please select one team.');
    return;
}

if (selectedTeam.length > 1) {
    alert('Please select one team.');
    return;
}

const rosterDiv = document.getElementById('roster');
rosterDiv.innerHTML = '<p>Loading Roster...<p>'

const result = await fetchRoster(selectedTeam[0]);


let rosterHTML = '';
for (let i = 0; i < result.body.roster.length; i++) {
    const player = result.body.roster[i];
    rosterHTML += `
        <div style="border: 1px solid #ddd; padding: 10px; margin: 10px;">
            <p><strong><center>Player ${i+1}</center></strong></p>
            <p><strong>Name:</strong> ${player.name}</p>
            <p><strong>Jersey Number:</strong> ${player.jerseyNumber}</p>
            <p><strong>Position:</strong> ${player.position}</p>
            <p><strong>Height:</strong> ${player.height}</p>
            <p><strong>DoB:</strong> ${player.birthDate}</p>
        </div>
    `;
}

rosterDiv.innerHTML = rosterHTML;
});



async function fetchRoster(team){
    const url = (`https://${apiHost}/teams/${team}/roster/2024-2025`);
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': apiHost
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
};
