const searchForm = document.getElementById('search-form');
const playerDiv = document.getElementById('player');

// cria o token!
function createToken() {

    const clientId = 'a11dbd03bf194acb920593f6636c2740';
    const clientSecret = '8b79ee3281aa47b7af9d6888262d90ff';

    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = btoa(authString);

    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64AuthString}`
        },
        body: 'grant_type=client_credentials'
    }).then(response => response.json()).then(data => {
        return data.access_token;
    });

}

searchForm.addEventListener('submit', event => {
    event.preventDefault();

    const token = createToken();
    const query = document.getElementById('search-input').value;


    fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(response => response.json()).then(data => {
        const track = data.tracks.items[0];
        const trackId = track.id;

        alert('a popularidade da música é: ' + track.popularity);

        playerDiv.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    }).catch(error => alert('Houve um erro: ' + error));
})

    /*
    const query = document.getElementById('search-input').value;

    // credenciais do spotify
    const clientId = 'a11dbd03bf194acb920593f6636c2740';
    const clientSecret = '8b79ee3281aa47b7af9d6888262d90ff';

    // criação do authstring para solicitar o token de acesso
    const authString = `${clientId}:${clientSecret}`;
    const base64AuthString = btoa(authString);

    // solicitação do token de acesso
    fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${base64AuthString}`
        },
        body: 'grant_type=client_credentials'
    })
        .then(response => response.json())
        .then(data => {
            const token = data.access_token;

            fetch(`https://api.spotify.com/v1/search?q=${query}&type=track`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(response => response.json())
                .then(data => {
                    const track = data.tracks.items[0];
                    const trackId = track.id;

                    playerDiv.innerHTML = `<iframe src="https://open.spotify.com/embed/track/${trackId}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
                })
                .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
}); */
