import React from 'react';
class Select extends React.Component
{
	constructor(props) {
		super(props);
		this.state={value:'coconut'};
		this.handleChange=this.handleChange.bind(this);
		this.handleSubmit=this.handleSubmit.bind(this);

	}
	handleChange(event)
	{
		this.setState({value:event.target.value})
	}
	handleSubmit(event)
	{ 
		alert('your favorite is : '+this.state.value);
		event.preventDefault();
	}
	render()
	{
		return (
			<form action="" onSubmit={this.handleSubmit}>
			<label htmlFor="">Pick your favorite: 
			<select name="" id="" value={this.state.value}
			onChange={this.handleChange}
			>
			<option value="cao">cao</option>
			<option value="qi">qi</option>
			<option value="bin">bin</option>
			<option value="nice">nice</option></select></label>
			<input type="submit" value='Submit'/></form>)
	}
}
export default Select;