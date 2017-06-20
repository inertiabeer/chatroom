import React from 'react';
const numbers=[1,2,3,4,5,6,7];
const listItems=numbers.map(function(number){
	return <li>{number}</li>
});
function NumberList(props)
{
	const numbers=props.numbers;
	const listItems=numbers.map((number)=>
		<li key={number.toString()}>
			{number}
		</li>);
	return (
		<ul>{listItems}</ul>)
}
export default NumberList;
