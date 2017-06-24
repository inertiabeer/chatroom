import React from 'react';
import Blog from '../components/Blog.js';
import Clock from '../components/Clock.js';
import LoginControl from '../components/LoginControl.js';
import Calculator from '../components/BoilIf.js';
import {BrowserRouter as Router,Route,Link} from 'react-router-dom';
const Basic=function(){
	return(
	<Router>
		<div>
			<ul>
				<li>
					<Link to='/'>Home</Link>
				</li>
				<li>
					<Link to='/about'>About</Link>
				</li>
				<li>
					<Link to='/clock'>Clock</Link>
				</li>

			</ul>
			<hr/>
			<Route exact path='/' component={LoginControl}></Route>
			<Route path="/about" component={Calculator}></Route>
			<Route path='/clock' component={Clock}></Route>

		</div>
	</Router>
	);
};
export default Basic;
