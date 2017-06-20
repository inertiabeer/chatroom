import React from 'react';
function Warning(props)
{
	if(!props.warn)
	{
		return null;
	}
	return (
		<div>
			Warning!
		</div>);
}
class Page extends React.Component{
	constructor(props) {
		super(props);
		this.state={Warning:true}
		this.handleToggleChick=this.handleToggleChick.bind(this);

	}
	handleToggleChick()
	{
		this.setState(function(prevState)
		{
			return {
				Warning:!prevState.Warning
			}
		});
	}
	render()
	{
		return (
			<div>
				<Warning warn={this.state.Warning}/>
				<button onClick={this.handleToggleChick}>
				{this.state.Warning?'Hide':'Show'}</button>
			</div>)
	}
}
export default Page;