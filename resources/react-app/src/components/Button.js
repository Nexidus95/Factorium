import React , {Component} from 'react';
import './Button.css';
import {Link } from 'react-router-dom';

export function Button(){
	
	const logined= window.localStorage.getItem("accessToken");
	const click = () =>{
		localStorage.clear();
		window.location.reload(false);
		window.location.href="/";
	}
	return(
	<>
		{!logined && <><Link to= 'login'>
			<button className='btn'>Login</button>
		</Link>
		</>}
		{logined && <>
			<button onClick={click}className='btn'>Logout</button>
		</>
		}
	</>
	);
}
