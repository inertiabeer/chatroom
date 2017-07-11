import React, { Component } from 'react';
 class Send extends Component {
		constructor(props) {
		super(props);
		this.state={
			value:"",
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
		let m_value=this.state.value;
		console.log(m_value=='');//这里需要调用value的字符值

        if (this.state.value.toString() != "") {
            socket.emit('client', this.state.value);
            this.setState({value: ''});
        } else {

            this.setState({value: ''});
        }
	}
	handleKey(event){
		let key=(event.keyCode?event.keyCode:event.which);
		let m_value=this.state.value.toString();//m_value='\n';因为这是一个keyup事件

		if(key=='13')
		{
			
			if(m_value=='\n')
			{

                this.setState({value:''});
			}
			else
			{
				
			  socket.emit('client',this.state.value);
		       this.setState({value:''});

			}

		}

	}
	render() {
		return (
			<div className='send'>
			<textarea rows="6" type="text" value={this.state.value} onKeyUp={this.handleKey} onChange={this.handleChange} placeholder={this.state.placeHolder}/>

			<button onClick={this.handleSubmit}>发送消息</button>
			</div>
		);
	}
}
export default Send;