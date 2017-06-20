import React from 'react';
class EssayForm extends React.Component
{
	constructor(props) {
		super(props);
		this.state={
			value:'please write essay about your favorite DOM element.'
		};
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);
	}
	handleChange(event)
	{
		this.setState({value:event.target.value});

	}
	handleSubmit(event)
	{
		alert('An essay was submitted: '+this.state.value);
		event.preventDefault();
	}
	render(){
		return(
			<form action="" onSubmit={this.handleSubmit}>
			<label htmlFor="">
			Name:
			<textarea name="" id="" cols="30" rows="10" value={this.state.value} onChange={this.handleChange}></textarea>
			</label>
			<input type="submit" value='Submit'/>
			</form>)
	}


}
export default EssayForm