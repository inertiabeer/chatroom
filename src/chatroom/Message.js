import React, { Component } from 'react';
 class Message extends Component {
	constructor(props)
	{
		super(props)
		this.state={
			time:this.props.time,
			message:this.props.message,
			name:this.props.name
		}
	}
	render() {
		return (
			<div>
				<h2>{this.state.name}</h2>
				<p>{this.state.time}</p>
				<p><h2>{this.state.message}</h2></p>
			</div>
		);
	}
}
export default Message;