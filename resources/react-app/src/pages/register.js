import React, { SyntheticEvent, useState } from 'react';
import { Navigate } from "react-router-dom"; 

const initialState='';
const initialState1=false;
const Register = () => {
	const [name,setName] = useState(initialState);
	const [email,setEmail] = useState(initialState);
	const [password,setPassword] = useState(initialState);
	const [password_confirm,setPassword_C] = useState(initialState);
	const [redirect, setRedirect] = useState(initialState1);
	const [correct, setCorrect] = useState(initialState);
	const [error,setError] = useState(initialState);
	

		const submit = async (e) => {
			e.preventDefault();
			
				const response= await fetch('http://localhost:8000/api/register', {
					method:'POST',
					headers:{'Content-type': 'application/json'},
					body: JSON.stringify({
						name,
						email,
						password,
						password_confirm
					})
				});
				const tokenas = await response.json();
				if(tokenas.error)
				{
					if(tokenas.error.email)
					{
						setError(tokenas.error.email);
					}
					else if(tokenas.error.password)
					{
						setError(tokenas.error.password);
					}
					else{
						setError('Serverio klaida');
					}
						setCorrect(true);
				}
				else{
					setRedirect(true); 
				}
		}
		if(redirect) {
			return <Navigate to="/login"/>
		}

	
	
	return(
	<>
		<form onSubmit={submit}>			
			<h1 className="h3 mb-3 fw-normal">Please sign in</h1>
				<table>
					<tbody>
						<tr>Nickname: </tr>
						<tr>
							<input type="name" className="form-control" placeholder="Nickname" required
								onChange={e=> setName(e.target.value)}
							/>
						</tr>
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
						<tr>Confirm password: </tr>
						<tr>
							<input type="password" className="form-control" placeholder="Confirm password" required
							onChange={e=> setPassword_C(e.target.value)}
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
		{error && <>
		</>
		}
	</>
	);
};

export default Register;