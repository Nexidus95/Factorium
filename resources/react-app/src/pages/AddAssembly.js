import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Navigate, Link } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";  

/* global localStorage, */

const AddAssembly= () => {
	const initialState1=false;
	const initialState='';
	const [company,setCompany] = useState(initialState);
	const [city,setCity] = useState(initialState);
	const [adress,setAdress] = useState(initialState);
	const [count,setCount] = useState(null);
	const [statuss,setStatus] = useState(initialState);
	const [redirect, setRedirect] = useState(initialState1);
	const [correct, setCorrect] = useState(initialState);
	const refresh = () => window.location.reload(false);
	const [error,setError] = useState(initialState);
	const logined= window.localStorage.getItem("accessToken");
	const [expiredd,setExpire] = useState(false);
		
		useEffect(() => {
		const expired = isExpired(logined);
		if(expired || !logined)
		{
			setExpire(true);
			window.localStorage.clear();
		}
		},[])
		
	const submit = async (e) => {
			e.preventDefault();
			
				const response= await fetch('http://localhost:8000/api/assemblies', {
					method:'POST',
					headers:{'Content-type': 'application/json',
							'Accept': 'application/json',
							'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
								},
					credentials: 'include',
					body: JSON.stringify({
						name: company,
						type: city,
						stage: adress,
						status: count,
						comment: statuss
					})
				});
				const tokenas = await response.json();
				if(tokenas.success)
				{
				//localStorage.setItem("accessToken", tokenas.token);
				setRedirect(true);
				}
				else{
					setError('Error, check data and try again');
					setCorrect(true); 
				}
			}
		if(redirect) {
			return <Navigate to="/assemblies"/>
		}
	
	return(
	<>
		{logined && !expiredd &&<>
		<form onSubmit={submit}>
			<h1 className="h3 mb-3 fw-normal">Add assembly</h1>
			<table>
				<tbody>
				<tr>Name: </tr>
						<tr>
				<input type="company" className="form-control" placeholder="Name" required
					onChange={e=> setCompany(e.target.value)}
				/>
				</tr>
				<tr>Type: </tr>
						<tr>
				<input type="city" className="form-control" placeholder="Type" required
					onChange={e=> setCity(e.target.value)}
				/>
				</tr>
				<tr>Stage: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Stage"  required
					onChange={e=> setAdress(e.target.value)}
				/>
				</tr>
				<tr>Status: </tr>
						<tr>
				<input type="status" className="form-control" placeholder="Status" required
					onChange={e=> setCount(e.target.value)}
				/>
				</tr>
				<tr>Comment: </tr>
						<tr>
				<input type="comment" className="form-control" placeholder="Comment" required
					onChange={e=> setStatus(e.target.value)}
				/>
				</tr>
				<tr>
				{correct && <>
				<h3>{error}</h3>
					</>
				}
				</tr>
			<tr>
			<button className="w-100 btn btn-lg btn-primary" type="submit">Add assembly</button>
			</tr>
			</tbody>
			</table>
		</form>
		</>}
		{expiredd && <>
		<div>
			<div>
				<h1>Please login</h1>
			</div>
		</div>
		</>}
		</>
	);
};

export default AddAssembly;