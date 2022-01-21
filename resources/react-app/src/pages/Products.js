import React, {useEffect, useState } from 'react';
import { Navigate, Link } from "react-router-dom"; 
import './Assemblies.css';
const initialState='';
import { decodeToken, isExpired } from "react-jwt"; 

const Products= () => {
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
				const response = await fetch('http://localhost:8000/api/products', {
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
				<h1 id = 'title'>Products</h1>
				<button className="w-100 btn btn-lg btn-primary"><Link to='/addproduct'> Add</Link></button>
			</div>
			<div>
					<table id = 'factories'>
					<tr>
							<th>
								Name
							</th>
							<th>
								Lenght
							</th>
							<th>
								Height
							</th>
							<th>
								Width
							</th>
							<th>
								Type
							</th>
							<th>
								Status
							</th>
							<th>
								Orders
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
						<td>{factory.name}</td>
						<td>{factory.lenght}</td>
						<td>{factory.height}</td>
						<td>{factory.width}</td>
						<td>{factory.type}</td>
						<td>{factory.status}</td>
						<td>{factory.orders}</td>
						<td><button className="w-100 btn btn-lg btn-primary"><Link to={`/edit-product/${factory.id}`}> Edit</Link></button></td>
						<td><button className="w-100 btn btn-lg btn-primary"><Link to={`/deleteproduct/${factory.id}`}> Delete</Link></button></td>
						</tr>
						))}
						</tbody>
					</table>
			</div>
		</div>
	</>}
	{expiredd &&  <>
		<div>
			<div>
				<h1>Please login</h1>
			</div>
		</div>
	</>}
	</>		
				
	);
}
export default Products;