import React, { SyntheticEvent, useState } from 'react';
import { Navigate, Link } from "react-router-dom"; 

/* global localStorage, */

const Login = () => {
	const initialState1=false;
	const initialState='';
	const [email,setEmail] = useState(initialState);
	const [password,setPassword] = useState(initialState);
	const [redirect, setRedirect] = useState(initialState1);
	const [correct, setCorrect] = useState(initialState);
	const refresh = () => window.location.reload(false);
	const [error,setError] = useState(initialState);
		
	const submit = async (e) => {
			e.preventDefault();
			
				const response= await fetch('http://localhost:8000/api/login', {
					method:'POST',
					headers:{'Content-type': 'application/json'},
					credentials: 'include',
					body: JSON.stringify({
						email,
						password
					})
				});
				const tokenas = await response.json();
				if(tokenas.success)
				{
				localStorage.setItem("accessToken", tokenas.token);
				setRedirect(true);
				}
				else{
					setError('Login credentials are invalid');
					setCorrect(true); 
				}
			}
		if(redirect) {
			window.location.href="/";
		}
	
	return(
	<>
		<div>
		<form onSubmit={submit}>			
			<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
				<table>
					<tbody>
						<tr>Email: </tr>
						<tr>
							<input type="email" className="form-control" placeholder="Email address" required
							onChange={e=> setEmail(e.target.value)}
						/>
						</tr>
						<tr>Password: </tr>
						<tr>
							<input type="password" className="form-control" placeholder="Password" required
							onChange={e=> setPassword(e.target.value)}
						/>
						</tr>
				<tr>
												{correct && <>
							{error}
							</>
						}
				</tr>
			<button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
			</tbody>
			</table>
		</form>
		<div>
			<button className="w-100 btn btn-lg btn-primary"><Link to='/register'> Register</Link></button>
		</div>
		</div>
		</>
	);
};

export default Login;