import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import { render } from "react-dom";
import {HashRouter, Route, Routes, unstable_HistoryRouter} from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Services from './pages/services';
import Factories from './pages/factories';
import Assemblies from './pages/assemblies';
import Products from './pages/products';
import About from './pages/about';
import Profile from './pages/profile';
import EditFactory from './pages/EditFactory';
import Addfactory from './pages/Addfactory';
import NotFound from './pages/NotFound';
import DeleteFactory from './pages/DeleteFactory';
import DeleteAssembly from './pages/DeleteAssembly';
import DeleteProduct from './pages/DeleteProduct';
import EditAssembly from './pages/EditAssembly';
import AddAssembly from './pages/AddAssembly';
import EditProduct from './pages/EditProduct';
import AddProduct from './pages/AddProduct';


function App() {
  return (
	<HashRouter>
		<Nav/>
			<Routes>
				<Route path ="*" element={<NotFound/>} />
				<Route forceRefresh={true} path='/' element={<Home/>} />
				<Route path="/login" element={<Login/>} />
				<Route path="/register" element={<Register/>} />
				<Route path="/services" element={<Services/>} />
				<Route path="/factories" element={<Factories/>} />
				<Route path="/assemblies" element={<Assemblies/>} />
				<Route path="/products" element={<Products/>} />
				<Route path="/about" element={<About/>} />
				<Route path="/profile" element={<Profile/>} />
				<Route path="/edit-factory/:id" element={<EditFactory/>} />
				<Route path="/addfactory" element={<Addfactory/>} />
				<Route path="/deletefactory/:id" element={<DeleteFactory/>} />
				
				<Route path="/edit-assembly/:id" element={<EditAssembly/>} />
				<Route path="/addassembly" element={<AddAssembly/>} />
				<Route path="/deleteassembly/:id" element={<DeleteAssembly/>} />
				
				<Route path="/edit-product/:id" element={<EditProduct/>} />
				<Route path="/addproduct" element={<AddProduct/>} />
				<Route path="/deleteproduct/:id" element={<DeleteProduct/>} />
			</Routes>
		</HashRouter>
  );
}

export default App;
