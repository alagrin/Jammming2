import React from 'react';
import './TrackList.css';
import Track from '../Track/Track'

class TrackList extends React.PureComponent {
	render() {
		return (
			<div className="TrackList">
			{
				this.props.tracks.map( (track, index) => <Track key={`track-${index}`} track={track} addTrack={this.props.addTrack} isRemoval={this.props.isRemoval} onRemove={this.props.onRemove}/>)
			}
			</div>
		);
	};
}

export default TrackList;