import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends React.PureComponent {
	render() {
		return (
			<div className="TrackList">
			{
				this.props.tracks.map( (track, index) => <Track key={`track-${index}`} track={track} addTrack={this.props.addTrack}/>)
			}
			</div>
		);
	};
}

export default TrackList;