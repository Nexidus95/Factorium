import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import './nav.css';
import Dropdown from './Dropdown';

function Nav() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const logined= window.localStorage.getItem("accessToken");

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const refresh = () => window.location.reload(false);

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };
  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Factorium
          <i class='fab fa-firstdraft' />
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
		  {logined && <>
		  <li className='nav-item'>
            <Link to='/factories' className='nav-links' onClick={closeMobileMenu}>
              Fabrics
            </Link>
          </li>
		  <li className='nav-item'>
            <Link to='/assemblies' className='nav-links' onClick={closeMobileMenu}>
              Assemblies
            </Link>
          </li>
		  <li className='nav-item'>
            <Link to='/products' className='nav-links' onClick={closeMobileMenu}>
              Products
            </Link>
          </li>
		  <li className='nav-item'>
            <Link to='/profile' className='nav-links' onClick={closeMobileMenu}>
              Profile
            </Link>
          </li>
		  </>
		  }


          <li className='nav-item'>
            <Link
              to='/about'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              About
            </Link>
          </li>
		  {!logined && <>
          <li>
            <Link
              to='/login'
              className='nav-links-mobile'
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
		  </>
		  }
		  {logined && <>
          <li>
            <Link
              to='/login'
              className='nav-links-mobile'
              onClick={closeMobileMenu,refresh}
            >
              Logout
            </Link>
          </li>
		  </>
		  }
        </ul>
        <Button />
      </nav>
    </>
  );

}

export default Nav;
				
