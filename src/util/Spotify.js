const clientID = "c1577f2ee8ea40259966fbecd749bf07";
const redirectURI = "http://localhost:3000/";

let userAccessToken;
let Spotify = {
  getAccessToken() {
    if (userAccessToken) {
      return userAccessToken
    }
    let accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    let expirationTimeMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expirationTimeMatch) {
      userAccessToken = accessTokenMatch[1];
      let expiresIn = Number(expirationTimeMatch[1]);
      window.setTimeout(() => accessTokenMatch = '', expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');
      return userAccessToken
    } else {
      const authorizationURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`
      window.location = authorizationURL;
    }
  },

  search(searchTerm) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`
      }
    }).then(response => {
        return response.json();
      }).then(jsonResponse => {
        if (!jsonResponse.tracks) {
          return [];
      }
      return jsonResponse.tracks.items.map(track => ({
        id: track.id,
        name: track.name,
        artist: track.artists[0].name,
        album: track.album.name,
        uri: track.uri
      }))
    })
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => response.json()
    ).then(jsonResponse => {
      userId = jsonResponse.id;

      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({name: name})
      }).then(response => response.json()
      ).then(jsonResponse => {
        const playlistId = jsonResponse.id;

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
          headers: headers,
          method: 'POST',
          body: JSON.stringify({uris: trackUris})
        });
      });
    });
  }

};

export default Spotify;
