import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Navigate, Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

/* global localStorage, */

const EditProduct = () => {
	const initialState1=false;
	const initialState='';
	const [name,setname] = useState(initialState);
	const [lenght,setlenght] = useState(null);
	const [height,setheight] = useState(null);
	const [width,setwidth] = useState(null);
	const [type,settype] = useState(initialState);
	const [statuss,setStatus] = useState(initialState);
	const [orders,setorders] = useState(null);
	const [thisuser,setThisuser] = useState(false);
	const [expiredd,setExpire] = useState(false);
	const [redirect, setRedirect] = useState(initialState1);
	const [correct, setCorrect] = useState(initialState);
	const refresh = () => window.location.reload(false);
	const [error,setError] = useState(initialState);
	const logined= window.localStorage.getItem("accessToken");
	const params = useParams();
		
	useEffect(() => {
		const expired = isExpired(logined);
		if(expired || !logined)
		{
			setExpire(true);
			window.localStorage.clear();
		}
		else{
			getUsers();
		}
	},[])
	const getUsers = async () =>{
		const decoded = decodeToken(logined);
	
			const stud_id = params.id;
		
				const response = await fetch(`http://localhost:8000/api/products/${stud_id}`, {
					headers:{'Content-type': 'application/json',
					'Accept': 'application/json',
					'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
						},
				});
				const content = await response.json();	
				if(content.user_id == decoded.sub)
				{ 
					setname(content.name);
					setlenght(content.lenght);
					setheight(content.height);
					setwidth(content.width);
					settype(content.type);
					setStatus(content.status);
					setorders(content.orders);
				}
				else{
					setThisuser(true);
				}
		}
	const submit = async (e) => {
			e.preventDefault();
			
			const stud_id = params.id;
			//console.log(stud_id);
				const response= await fetch(`http://localhost:8000/api/products/${stud_id}`, {
					method:'PUT',
					headers:{'Content-type': 'application/json',
							'Accept': 'application/json',
							'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
								},
					credentials: 'include',
					body: JSON.stringify({
						name: name,
						lenght: lenght,
						height: height,
						width: width,
						type: type,
						status: statuss,
						orders: orders
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
			return <Navigate to="/products"/>
		}
	
		return(
	<>
	{logined && !expiredd &&<>
		<form onSubmit={submit}>
			<h1 className="h3 mb-3 fw-normal">Add product</h1>
			<table>
				<tbody>
				<tr>Name: </tr>
						<tr>
				<input type="name" className="form-control" placeholder="Name" value={name}required
					onChange={e=> setname(e.target.value)}
				/>
				</tr>
				<tr>Lenght: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Lenght" value={lenght} required
					onChange={e=> setlenght(e.target.value)}
				/>
				</tr>
				<tr>Height: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Height" value={height} required
					onChange={e=> setheight(e.target.value)}
				/>
				</tr>
				<tr>Width: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Width" value={width} required
					onChange={e=> setwidth(e.target.value)}
				/>
				</tr>
				<tr>Type: </tr>
						<tr>
				<input type="name" className="form-control" placeholder="Type" value={type} required
					onChange={e=> settype(e.target.value)}
				/>
				</tr>
				<tr>Status: </tr>
						<tr>
				<input type="status" className="form-control" placeholder="Status" value={statuss} required
					onChange={e=> setStatus(e.target.value)}
				/>
				<tr>Orders: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Orders" value={orders} required
					onChange={e=> setorders(e.target.value)}
				/>
				</tr>
				</tr>
				<tr>
				{correct && <>
				<h3>{error}</h3>
					</>
				}
				</tr>
			<tr>
			<button className="w-100 btn btn-lg btn-primary" type="submit">Edit product</button>
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
export default EditProduct;