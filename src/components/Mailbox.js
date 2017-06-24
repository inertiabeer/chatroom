import React from 'react';
function Mailbox(props)
{
	const unreadMessage=props.unreadMessage;
	return (
		<div><h1>hello!</h1>
		{
			unreadMessage.length>0&&
			<h2>
				you hava {unreadMessage.length} unread message;
			</h2>
		}</div>)
};
export default Mailbox;