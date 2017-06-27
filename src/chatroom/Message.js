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
				<p><b>{this.state.name}</b>&nbsp;&nbsp;{this.state.time}</p>
				<h2><p>{this.state.message}</p></h2>
			</div>
		);
	}
}
export default Message;