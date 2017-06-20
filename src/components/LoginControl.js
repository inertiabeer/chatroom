import React from 'react';
function User(props)
{
	return <h1>Welcome back!</h1>
}
function Guest(props)
{
	return <h1>please sign up!</h1>
}
function Greeting(props)
{
	const isLoggedIn=props.isLoggedIn;
	if(isLoggedIn)
	{
		return <User />
	}
	return <Guest />
}
function LoginButton(props)
{
	return(
		<button onClick={props.onClick}>Login</button>)
}
function LogoutButton(props)
{
	return(<button onClick={props.onClick}>LogOut</button>)
}
class LoginControl extends React.Component{
	constructor(props) {
		super(props);
		this.handleLoginChick=this.handleLoginChick.bind(this);
		this.handleLogoutChick=this.handleLogoutChick.bind(this);
		this.state={isLoggedIn:false};
	}
	handleLoginChick()
	{
		this.setState({isLoggedIn:true});
	}
	handleLogoutChick()
	{
		this.setState({isLoggedIn:false});
	}
	render()
	{
		const isLoggedIn=this.state.isLoggedIn;
		let button=null;
		if(isLoggedIn)
		{
			button=<LoginButton onClick={this.handleLogoutChick}/>;
		}
		else{
		button=<LogoutButton onClick={this.handleLoginChick}/>;}
		return (<div>
			<Greeting isLoggedIn={isLoggedIn}/>
			{button}</div>);
	}
}
export default LoginControl ;