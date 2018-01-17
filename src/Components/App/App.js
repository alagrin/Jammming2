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
        {name: "Name",
        artist: "Artist",
        album: "Album"},
        {name: 'Name',
        artist: "Artist",
        album: "Album" },
        {name: 'Name',
        artist: "Artist",
        album: "Album" }
        ],
        playlistName: "New Playlist",
        playlistTracks: [
        {name: 'Name',
        artist: "Artist",
        album: "Album" },
        {name: 'Name',
        artist: "Artist",
        album: "Album" }
      ]
    };

    this.addTrack = this.addTrack.bind(this);
  };
//Revisit the .find method for clarification

  addTrack(track) {
  let tracks = this.state.playlistTracks;
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
      <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack}/>
      <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks}/>
    </div>
  </div>
</div>
    );
  }
}

export default App;
