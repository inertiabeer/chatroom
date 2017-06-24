import React from 'react';
import {BrowserRouter as Router,Route,Link} from'react-router-dom';
const ParamsExample=()=>(
<Router>
	<div>
		<h2>url test</h2>
		<ul>
			<li>
				<Link to="/baidu">Baidu</Link>
			</li>
			<li>
				<Link to='/google'>Google</Link>
			</li>
			<li>
				<Link to='/yahoo'>Yahoo</Link>
			</li>
			<li>
				<Link to='/alibaba'>Ali</Link>
			</li>
		</ul>
		<Route path="/:id" component={Child}></Route>
	</div>
</Router>
)
const Child=function(props){
	return(
	<div>
		<h3>名字是：{props.match.params.id}</h3>
	</div>)
}
export default ParamsExample;