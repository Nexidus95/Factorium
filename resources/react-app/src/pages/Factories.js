import React, {useEffect, useState } from 'react';
import { Navigate, Link } from "react-router-dom"; 
import './Factories.css';
const initialState='';
import { decodeToken, isExpired } from "react-jwt"; 

const Factories= () => {
	const[name, setName] = useState([]);
	const[email, setEmail] = useState(initialState);
	const[created, setCreated] = useState(initialState);
	const[doneit, setDoneit] = useState(false);
	const [error,setError] = useState(initialState);
	const [expiredd,setExpire] = useState(false);
	
	const logined= window.localStorage.getItem("accessToken");
	
	useEffect(()=> {
		const expired = isExpired(logined);
		if(expired || !logined)
		{
			setExpire(true);
			window.localStorage.clear();
		}
		else{
		(
			async()=> {
				//console.log(localStorage.getItem("accessToken"));
				if(!doneit){
				const response = await fetch('http://localhost:8000/api/factories', {
					headers:{'Content-type': 'application/json',
					'Accept': 'application/json',
					'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
						},
				});
				const content = await response.json();
				if(!content.error)
				{
					setName(content);
					setDoneit(true);
				}
				else{
					setError(content.error);
				}
			}
			}
		)();
		}
	});
	
	return(
	<>
	{logined && setDoneit && !expiredd && <>
		<div>
			<div>
				<h1 id = 'title'>Factories</h1>
				<button className="w-100 btn btn-lg btn-primary"><Link to='/addfactory'> Add</Link></button>
			</div>
			<div>
					<table id = 'factories'>
					<tr>
							<th>
								Company
							</th>
							<th>
								City
							</th>
							<th>
								Adress
							</th>
							<th>
								Status
							</th>
							<th>
								Workers
							</th>
							<th>
								Edit
							</th>
							<th>
								Delete
							</th>
						</tr>
						<tbody>
						{name.map((factory)=>(
						<tr key={factory.id}>
						<td>{factory.company}</td>
						<td>{factory.city}</td>
						<td>{factory.adress}</td>
						<td>{factory.status}</td>
						<td>{factory.workerCount}</td>
						<td><button className="w-100 btn btn-lg btn-primary"><Link to={`/edit-factory/${factory.id}`}> Edit</Link></button></td>
						<td><button className="w-100 btn btn-lg btn-primary"><Link to={`/deletefactory/${factory.id}`}> Delete</Link></button></td>
						</tr>
						))}
						</tbody>
					</table>
			</div>
		</div>
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
}
export default Factories;