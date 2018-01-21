import React from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      searchResults:[
        { name: "Name",
          artist: "Artist",
          album: "Album",
          id: '1' },
        { name: 'Name',
          artist: "Artist",
          album: "Album",
          id: '2' },
        { name: 'Name',
          artist: "Artist",
          album: "Album",
          id: '3' }
        ],

        playlistName: "New Playlist",
        
        playlistTracks: [
        {name: 'Name',
        artist: "Artist",
        album: "Album",
        id: '4' },
        {name: 'Name',
        artist: "Artist",
        album: "Album",
        id: '5' }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
  };


  addTrack(track) {
	  let tracks = [...this.state.playlistTracks];
	  if(!tracks.find(playlistTrack => playlistTrack.id === track.id)) {
	    tracks.push(track);
	    this.setState({
	      playlistTracks: tracks
	    });
	  }
};

  render() {
    return (
     <div>
	 	<h1>Ja<span className="highlight">mmm</span>ing</h1>
	    <div className="App">
		    <SearchBar />
		    <div className="App-playlist">
			    <SearchResults searchResults={this.state.searchResults} addTrack={this.addTrack}/>
			    <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
		    </div>
	  	</div>
	</div>
    );
  }
}

export default App;
