import React from 'react';
import {
	BrowserRouter as Router,
	Route,
	Link,
	Redirect,
	withRouter
}from 'react-router-dom';
const  AuthExample=()=>(
	<Router>
		<div>
			<AuthButton></AuthButton>
			<ul>
				<li>
					<Link to='/public'>Public Page</Link>
				</li>
				<li>
					<Link to="/protected">Protected</Link>
				</li>
			</ul>
			<Router path='/public' component={Public}></Router>
			<Router path='/login' component={login}></Router>
			<Router path='/protected' component={Protected}></Router>
		</div>
	</Router>
	);
const Public=()=><h3>Public</h3>
const Protected=()=><h3>Protected</h3>
class