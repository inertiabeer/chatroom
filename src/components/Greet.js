import React from 'react';
function UserGreeting(props)
{
	return <h1>Welcome back!{props.isLoggedIn?'myson':'friends'}</h1>
};
function GuestGreeting(props)
{
	return <h1>Please sign up.</h1>
};
function Greeting(props)
{
	const isLoggedIn=props.isLoggedIn;
	if(isLoggedIn)
	{
		return <UserGreeting isLoggedIn={props.isLoggedIn}/>;
	}
	else
		return <GuestGreeting />;
};

export default Greeting;