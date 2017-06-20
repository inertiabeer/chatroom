import React from 'react';
function Fancy(props)
{
	return (
		<div  className={'Fancy-'+props.color}>
			{props.children}
		</div>)
};
function Dialog(props)
{
	return (
		<Fancy color="blue">
			<h1 className="Dialog-title">
			{props.title}</h1>
			<p className="Dialog-message">
			{props.message}</p>
			{props.children}

		</Fancy>)
};
function WelcomeDialog()
{
	return(
		<Dialog title="welcome" message="It is a welcome message"/>)
}
class SignUpDialog extends React.Component{
	constructor(props) {
		super(props);
		this.handleChange=this.handleChange.bind(this);
		this.handleSignUp=this.handleSignUp.bind(this);
		this.state={login:''};

	}
	handleChange(e)
	{
		this.setState({login:e.target.value});
	}
	handleSignUp()
	{
		console.log('hello '+this.state.login);
	}
	render()
	{
		return (
			<Dialog title="Sign UP" message="sign up our site's numbers and you ">
			<input value={this.state.login} onChange={this.handleChange}/>
			<button onClick={this.handleSignUp}>Sign me Up!</button>

			</Dialog>)
	}
}
export default SignUpDialog;