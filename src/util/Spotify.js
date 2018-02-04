const client_id = '5bee5d1156b5451ab432fe706b1dde1e';
const redirect_uri = 'http://localhost:3000/';
let accessToken;
let expiresIn;

const Spotify = {
	
	// getAccount() {
	// 	let user_id;
	// 	let accessToken = window.location.href.match(/access_token=([^&]*)/);
	// 	accessToken = accessToken[1];
	// 	return fetch('https://api.spotify.com/v1/users/{user_id}', {
	// 			headers: { Authorization: `Bearer ${accessToken}` },
	// 		    method: 'GET' 
	// 		}).then(response => {
    
 //      return response.json();
	// })
	// 	},

	getAccessToken() {
		if(accessToken) {
			return accessToken;
		} else if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
			 accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
			 expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];

			window.setTimeout(() => accessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token
			&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
			window.location = url;
		}
	},

	search(searchTerm) {
		 let accessToken = window.location.href.match(/access_token=([^&]*)/);

		if(!accessToken) {
			let url = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirect_uri}`;
			window.location = url;	
			 return false;
		}
		
		accessToken = accessToken[1];

		return fetch(`https://api.spotify.com/v1/search?type=TRACK&q=${searchTerm}`, 
			{
				headers: { Authorization: `Bearer ${accessToken}` } 
			}).then( response => { return response.json() }).then(
             json => {
             	if (!json.tracks) {
                return [];
               }
               return json.tracks.items.map( track => ({
			           id: track.id,
                 name: track.name,
                 artist: track.artists[0].name,
                 album: track.album.name,
                 uri: track.uri,
                 preview_url: track.preview_url
               })
			 )
           })
		},

	savePlaylist: (playlistName, trackURIs) => {
		if (!playlistName || !trackURIs.length) {
			return
		};
    Spotify.getAccessToken();
    let headers = {Authorization: `Bearer ${accessToken}`};
    let userId;
    let playlistID;

    return fetch('https://api.spotify.com/v1/me', {
      headers: headers
    }).then(response => {
    
      return response.json()
    }).then(data => {
      userId = data.id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          name: playlistName
        })
      })
    }).then(response => {

      return response.json()
    }).then(data => {
      playlistID = data.id
      return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistID}/tracks`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          uris: trackURIs
        })
      })
    })
  }
};


export default Spotify;