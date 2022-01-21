import React, {useEffect, useState } from 'react';
const initialState='';
import { decodeToken, isExpired } from "react-jwt";

const Profile = () => {
	
	const[name, setName] = useState(initialState);
	const[email, setEmail] = useState(initialState);
	const[created, setCreated] = useState(initialState);
	const [thisuser,setThisuser] = useState(false);
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
				const decoded = decodeToken(logined);
				//console.log(localStorage.getItem("accessToken"));
				const response = await fetch('http://localhost:8000/api/user', {
					headers:{'Content-type': 'application/json',
					'Accept': 'application/json',
					'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
						},
				});
				const content = await response.json();
				if(content.user.id == decoded.sub)
				{
					setName(content.user.name);
					setEmail(content.user.email);
					setCreated(content.user.created_at.slice(0, 10));
				}
				else{
					setThisuser(true);
				}
			}
		)();
		}
	});
	
	
	return(
	<>
	{logined && !expiredd&& !thisuser && <>
		<div>
			<div>
				<h1>Profile</h1>
			</div>
			<div>
				<h2>Name: {name}</h2>
				<h2>Email: {email}</h2>
				<h2>Created: {created}</h2>
				<h2>Role: In development </h2>
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

export default Profile;