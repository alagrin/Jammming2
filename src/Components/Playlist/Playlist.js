import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends React.Component {
	
	constructor(props) {
		super(props);
		this.onNameChange = this.props.onNameChange.bind(this);
	};

	handleNameChange(e) {
		this.onNameChange(e.target.value);
	};

	render() {
		return (
			<div className="Playlist">
			  <input placeholder="Enter Playlist Name"onChange={this.props.onNameChange}/>
			  <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={this.props.isRemoval}/>
			  <a className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</a>
			</div>
      );
	}
};

export default Playlist;