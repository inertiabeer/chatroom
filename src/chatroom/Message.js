import React, { Component } from 'react';
const nameStyle={
	color:'#ccc',
	fontSize:'2em',
	marginRight:'3em',

};
const bubble={
fontSize:'2.4em',
position:'relative'

}
const triangle=
{
	width:'0',
	height:'0',
	border:'0.8rem solid #fff',
	borderRight:'3rem solid #f2f7f3',
	position:'absolute',
	top:'0',
	left:'-1rem',
	transform: 'rotate(30deg)',
	zIndex: '-1'



}
const container=
{
	backgroundColor:'#f2f7f3',
	marginLeft:'1rem',
	borderRadius: '8px',
	zIndex:'100',
	width:'auto',
	display:'inline-block',
	wordBreak:'break-all',
	paddingLeft:'10px',
	paddingRight:'10px'


}
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
				<p><span style={nameStyle}>{this.state.name}</span>&nbsp;&nbsp;{this.state.time}</p>
				
				<div style={bubble}>
				<div style={triangle}></div>
				<div style={container}><p>{this.state.message}</p></div>
				</div>
			</div>
		);
	}
}
export default Message;