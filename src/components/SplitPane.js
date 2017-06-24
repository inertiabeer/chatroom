import React from 'react';
function SplitPane(props)
{
	return(
		<div>
			<div className="left">
				{props.left}
			</div>
			<div className="right">
				{props.right}
			</div>
		</div>
		)
}
export default SplitPane;
