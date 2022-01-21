import React, {useEffect, useState } from 'react';
import { Navigate, Link } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt"; 

/* global localStorage, */

const AddFactory = () => {
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
		else{}
		},[])
	
	
	const submit = async (e) => {
			e.preventDefault();
			
				const response= await fetch("http://localhost:8000/api/factories", {
					method:'POST',
					headers:{'Content-type': 'application/json',
							'Accept': 'application/json',
							'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
								},
					credentials: 'include',
					body: JSON.stringify({
						company: company,
						city: city,
						adress: adress,
						workerCount: count,
						status: statuss
					})
				});
				const tokenas = await response.json();
				if(tokenas.success)
				{
				//localStorage.setItem("accessToken", tokenas.token);
				setRedirect(true);
				}
				else{
					setError('Login credentials are invalid');
					setCorrect(true); 
				}
			}
		if(redirect) {
			return <Navigate to="/factories"/>
		}
	
	return(
	<>
	{logined && !expiredd &&<>
		<form onSubmit={submit}>
			<h1 className="h3 mb-3 fw-normal">Add factory</h1>
			<table>
				<tbody>
				<tr>Company: </tr>
						<tr>
				<input type="company" className="form-control" placeholder="Company" value={company} required
					onChange={e=> setCompany(e.target.value)}
				/>
				</tr>
				<tr>City: </tr>
						<tr>
				<input type="city" className="form-control" placeholder="City" value={city} required
					onChange={e=> setCity(e.target.value)}
				/>
				</tr>
				<tr>Adress: </tr>
						<tr>
				<input type="adress" className="form-control" placeholder="Adress" value={adress} required
					onChange={e=> setAdress(e.target.value)}
				/>
				</tr>
				<tr>Worker count: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Worker count" value={count}required
					onChange={e=> setCount(e.target.value)}
				/>
				</tr>
				<tr>Status: </tr>
						<tr>
				<input type="status" className="form-control" placeholder="Status" value={statuss} required
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
			<button className="w-100 btn btn-lg btn-primary" type="submit">Add factory</button>
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

export default AddFactory;