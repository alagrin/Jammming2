import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
	render() {
		return (
			<div className="Playlist">
			  <input placeholder={this.props.playlistName}/>
			  <TrackList tracks={this.props.playlistTracks} removeTrack={this.props.removeTrack} isRemoval={this.props.isRemoval}/>
			  <a className="Playlist-save">SAVE TO SPOTIFY</a>
			</div>
      );
	}
};

export default Playlist;