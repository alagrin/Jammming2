const clientID = '5bee5d1156b5451ab432fe706b1dde1e';
const redirectURI = 'http://localhost:3000/';
let userAccessToken = ' ';
let expiresIn;

const Spotify = {
	
	getAccessToken() {
		if(userAccessToken !== '') {
			return userAccessToken;
		} else if (window.location.href.match('/access_token=([^&]*)/') && window.location.href.match('/expires_in=([^&]*)/')) {
			userAccessToken = (window.location.href.match('/access_token=([^&]*)/'))[1];
			expiresIn = (window.location.href.match('/expires_in=([^&]*)/'))[1];
			window.setTimeout(() => userAccessToken = '', expiresIn * 1000);
			window.history.pushState('Access Token', null, '/');
		} else {
			window.location = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirectURI=${redirectURI}`
		}
	},
  
	async search(searchTerm) {
		try {
			let response = await fetch(`https://api.spotify.com/v1/search?type=tracks&q=${searchTerm}`, 
			{
				headers: { Authorization: `Bearer ${userAccessToken}` } 
			}
			  );
			if(response.ok) {
			  let jsonResponse = await response.json();
			  if (!jsonResponse.tracks) {
                return [];
            };
			  return jsonResponse.tracks.map( track => ({
			    id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri 
                
			    }));
		      } throw new Error('Request failed!');
		    } catch(error) {
		  console.log(error);
		};
	}
};

export default Spotify;