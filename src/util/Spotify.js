import { SearchBar } from "../Components/SearchBar/SearchBar";

let accessToken = '';
const redirectUri = 'http://localhost:3000/';
const clientId = '13cb9eff7dfa4671ab8139563d9d3cbf';

const Spotify = {

    getAccessToken() {
        if (accessToken) {
            return accessToken;
        } 
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken;
        } else {
            window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`);
        }
    },

    search(term) {
        accessToken = this.getAccessToken();
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
           headers: {Authorization: `Bearer ${accessToken}`} 
        })
        .then(response => {
            if (response.ok) {
            return response.json();
            }
            throw new Error('Request failed');
        }, networkError => {
            console.log(networkError.message);
        })
        .then(jsonResponse => {
            return jsonResponse.tracks.items.map(track => {
                return {
                    id: track.id,
                    name: track.name,
                    artist: track.artists[0].name,
                    album: track.album.name,
                    uri: track.uri,
                }
            })
        })
    },

    savePlaylist(name, trackUris) {
        console.log(trackUris);
        accessToken = this.getAccessToken();
        let userId = '';
        let playlistId = '';
        if (!name || !trackUris) {
            return;
        } else {
            const headers = {Authorization: `Bearer ${accessToken}`};
            fetch(`https://api.spotify.com/v1/me`, { headers: headers })
            .then(response => {
            return response.json();
            })
            .then(jsonResponse => {
                userId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        name: name
                    })
                })
            })
            .then(response => {
                    return response.json();
            })
            .then(jsonResponse => {
                playlistId = jsonResponse.id;
                return fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: trackUris
                    })
                })
            })
            .then(response => {
                return response.json();
            })
            .then(jsonResponse => {
                playlistId = jsonResponse.id;
            })
            
        }
    }

}

export default Spotify;