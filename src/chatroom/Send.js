import React, { Component } from 'react';
import {Button} from 'antd';
 class Send extends Component {
		constructor(props) {
		super(props);
		this.state={
			value:'',
			placeHolder:'在这里输入消息'
		};
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
		this.handleKey=this.handleKey.bind(this);
	}
	handleChange(event){
		this.setState({value:event.target.value});
	}
	handleSubmit(event)
	{
		socket.emit('client',this.state.value);
		this.setState({value:''});

	}
	handleKey(event){
		var key=(event.keyCode?event.keyCode:event.which);
		if(key=='13')
		{
		socket.emit('client',this.state.value);
		this.setState({value:''});
		}

	}
	render() {
		return (
			<div className='send'>
			<textarea rows="4" type="text" value={this.state.value} onKeyUp={this.handleKey} onChange={this.handleChange} placeholder={this.state.placeHolder}/>

			<Button onClick={this.handleSubmit}>发送消息</Button>
			</div>
		);
	}
}
export default Send;