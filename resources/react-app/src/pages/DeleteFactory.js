import React, { SyntheticEvent, useState, useEffect } from 'react';
import { Navigate, Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

/* global localStorage, */

const Deletefactory = () => {
	const initialState1=false;
	const initialState='';
	const [redirect, setRedirect] = useState(initialState1);
	const [correct, setCorrect] = useState(initialState);
	const refresh = () => window.location.reload(false);
	const [error,setError] = useState(initialState);
	const logined= window.localStorage.getItem("accessToken");
	const params = useParams();
	const [thisuser,setThisuser] = useState(false);
	const [expiredd,setExpire] = useState(false);
	
	
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
		
				const response = await fetch(`http://localhost:8000/api/factories/${stud_id}`, {
					headers:{'Content-type': 'application/json',
					'Accept': 'application/json',
					'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
						},
				});
				const content = await response.json();	
				if(content.user_id == decoded.sub)
				{ 
				}
				else{
					setThisuser(true);
				}
		}
	
	
	const handleClick = async (e) => {
			e.preventDefault();
			
			const stud_id = params.id;
			//console.log(stud_id);
				const response= await fetch(`http://localhost:8000/api/factories/${stud_id}`, {
					method:'Delete',
					headers:{'Authorization':  ' bearer ' + localStorage.getItem("accessToken")}
					})
				setRedirect(true);
			}
			
		if(redirect) {
			return <Navigate to="/factories"/>
		}
	
	return(
	<>
		{logined && !expiredd&& !thisuser && <>
			<h1 className="h3 mb-3 fw-normal">Are you sure?</h1>
			<button className="w-100 btn btn-lg btn-primary" onClick={handleClick}>Yes</button>
			<button className="w-100 btn btn-lg btn-primary"><Link to='/factories'> NO</Link></button>	
		</>}
		{expiredd &&<>
		<div>
			<div>
				<h1>Please login</h1>
			</div>
		</div>
		</>}
				{thisuser && <>
		<div>
			<div>
				<h1>You are not authorized to view this</h1>
			</div>
		</div>
		</>}
		</>
	);
};
export default Deletefactory;