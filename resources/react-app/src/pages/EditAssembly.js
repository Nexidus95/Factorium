import React, { SyntheticEvent, useState,useEffect  } from 'react';
import { Navigate, Link } from "react-router-dom"; 
import { useParams } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

/* global localStorage, */

const EditAssembly = () => {
	const initialState1=false;
	const initialState='';
	const [company,setCompany] = useState(initialState);
	const [city,setCity] = useState(initialState);
	const [user,setUser] = useState(initialState);
	const [thisuser,setThisuser] = useState(false);
	const [expiredd,setExpire] = useState(false);
	const [adress,setAdress] = useState(initialState);
	const [count,setCount] = useState(initialState);
	const [statuss,setStatus] = useState(initialState);
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
		getAssemblies();
		}
	},[])
	const getAssemblies = async () =>{
		const decoded = decodeToken(logined);
	
			const stud_id = params.id;
		
				const response = await fetch(`http://localhost:8000/api/assemblies/${stud_id}`, {
					headers:{'Content-type': 'application/json',
					'Accept': 'application/json',
					'Authorization':  ' bearer ' + localStorage.getItem("accessToken")
						},
				});
				const content = await response.json();
				if(content.user_id == decoded.sub)
				{
					setCompany(content.name);
					setCity(content.type);
					setAdress(content.stage);
					setCount(content.status);
					setStatus(content.comment);
				}
				else{
					setThisuser(true);
				}						
	}
	const submit = async (e) => {
			e.preventDefault();
			
			const stud_id = params.id;
				const response= await fetch(`http://localhost:8000/api/assemblies/${stud_id}`, {
					method:'PUT',
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
					setError('Login credentials are invalid');
					setCorrect(true); 
				}
			}
		if(redirect) {
			return <Navigate to="/assemblies"/>
		}
	
	return(
	<>
	{logined && !thisuser && !expiredd &&<>
		<form onSubmit={submit}>
			<h1 className="h3 mb-3 fw-normal">Add assembly</h1>
			<table>
				<tbody>
				<tr>Name: </tr>
						<tr>
				<input type="company" className="form-control" placeholder="Name" value={company} required
					onChange={e=> setCompany(e.target.value)}
				/>
				</tr>
				<tr>Type: </tr>
						<tr>
				<input type="city" className="form-control" placeholder="Type" value={city} required
					onChange={e=> setCity(e.target.value)}
				/>
				</tr>
				<tr>Stage: </tr>
						<tr>
				<input type="number" className="form-control" placeholder="Stage" value={adress} required
					onChange={e=> setAdress(e.target.value)}
				/>
				</tr>
				<tr>Status: </tr>
						<tr>
				<input type="status" className="form-control" placeholder="Status" value={count}required
					onChange={e=> setCount(e.target.value)}
				/>
				</tr>
				<tr>Comment: </tr>
						<tr>
				<input type="comment" className="form-control" placeholder="Comment" value={statuss} required
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
			<button className="w-100 btn btn-lg btn-primary" type="submit">Edit assembly</button>
			</tr>
			</tbody>
			</table>
		</form>
		<button className="w-100 btn btn-lg btn-primary"><Link to={`/assemblies`}> Back</Link></button>
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
export default EditAssembly;