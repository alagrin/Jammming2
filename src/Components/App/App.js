import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults:[
        
        ],

        playlistName: "New Playlist",
        
        playlistTracks: [
        { name: 'Name',
        artist: "Artist",
        album: "Album",
        id: '4' },
        { name: 'Name',
        artist: "Artist",
        album: "Album",
        id: '5' }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  };


  addTrack(track) {
	  let tracks = [...this.state.playlistTracks];
	  if(!tracks.find( playlistTrack => playlistTrack.id === track.id)) {
	    tracks.push(track);
	    this.setState({
	      playlistTracks: tracks
	    });
	  }
  };

  removeTrack(track) {
  	let tracks = [...this.state.playlistTracks];
  	let updatedTracks = tracks.filter( playlistTrack => playlistTrack.id !== track.id);
  	this.setState({
  		playlistTracks: updatedTracks
  	});
  };

  updatePlaylistName(inputName) {
  	this.setState({
  		playlistName: inputName
  	});
  };

  savePlaylist() {
  	const trackURIs = this.state.playlistTracks.map(track => track.uri); 
  	  this.setState({
  	    playlistName: this.state.playlistName,
  		playlistTracks: trackURIs
  	});
  };

  search(term) {
  	Spotify.search(term);
  	this.setState({
  		searchResults: this.state.searchResults
  	});
  };

  render() {
    return (
     <div>
	 	<h1>Ja<span className="highlight">mmm</span>ing</h1>
	    <div className="App">
		    <SearchBar onSearch={this.search}/>
		    <div className="App-playlist">
			    <SearchResults searchResults={this.state.searchResults} addTrack={this.addTrack} isRemoval={false}/>
			    <Playlist onNameChange={this.updatePlaylistName} playlistTracks={this.state.playlistTracks} onRemove={this.removeTrack} isRemoval={true} onSave={this.savePlaylist}/>
		    </div>
	  	</div>
	</div>
    );
  }
}

export default App;
