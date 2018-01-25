import React from 'react';
import './Track.css';

class Track extends React.Component {
	constructor(props) {
		super(props);
		this.renderAction = this.renderAction.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.onRemove = this.onRemove.bind(this);
	}

	handleAdd() {
		this.props.addTrack(this.props.track);
	}

	onRemove() {
		this.props.onRemove(this.props.track);
	}

	renderAction() {
		if(this.props.isRemoval) {
			return <a className="Track-action" onClick={this.onRemove}>-</a>
		}
		if(!this.props.isRemoval) {
			return <a className="Track-action" onClick={this.handleAdd}>+</a>
		}
	};

	render() {
		return (
			<div className="Track">
            <div className="Track-information">
              <h3>{this.props.track.name}</h3>
                <p>{this.props.track.artist} || {this.props.track.album} </p>
            </div>
              { this.renderAction() }
            </div>
            );
	}
};

export default Track;