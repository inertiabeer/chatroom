import React from 'react';
function Avatar(props)
{
	return(
		<img src={props.user.url} alt={props.user.name}/>
	)
}
function UserInfo(props)
{
	return (<div>
		<Avatar user={props.user} />
		<div>
			{props.user.name}
		</div>
	</div>)
}
function Comment(props)
{
	return (
		<div>
			<UserInfo user={props.author}/>
			<div >{props.text}</div>
			<div>{props.date.toLocaleTimeString()}</div>
		</div>)
}
export default Comment;