import React from 'react';
class Toggle extends React.Component{
	constructor(props) {
		super(props);
		this.state={isToggleOn:true};
		this.handleChick=this.handleChick.bind(this);
	}
	handleChick()
	{
     // this.setState(prevState=>({
     // 	isToggleOn: !prevState.isToggleOn
     // }));
     this.setState(function(prevState){
     	return({
     		isToggleOn:!prevState.isToggleOn
     	})
     })
     // this.setState({
     // 	isToggleOn:! this.state.isToggleOn
     // })

		console.log(2);
		console.log(this.state.isToggleOn);
	}
	render()
	{
		return (
			<button onClick={this.handleChick}>
			{
				this.state.isToggleOn ? 'ON':'OFF'
			}</button>)
	}

}
export default Toggle;