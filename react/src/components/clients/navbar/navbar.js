import React,{useState} from "react"
import { useEffect } from "react";
import { Nav, Navbar, Container, NavDropdown, Form, FormControl, Button, Toast } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from '../../Images/4998317.jpg'
import './navbar.css'


const NavbarClient = () => {
    const user = useSelector((state) => state.user)
    return (
    <div>
        <div className="page">
  <nav className="page__menu menu">
    <ul className="menu__list r-list">
      {user&&<li className="menu__group"><h4 style={{position:"relative",top:'25%', color: '#dea31b'}} >שלום ל{user.name}</h4></li>}

    {user&&!user.isEmployee?<>
      <li className="menu__group"><Link to={''} className="menu__link r-link text-underlined">דף הבית</Link></li>
      <li className="menu__group"><Link  className="menu__link r-link text-underlined" to='Myqueues'> התורים שלי</Link></li>
      <li className="menu__group"><Link className="menu__link r-link text-underlined" to='Shop'> המוצרים שלנו</Link></li>
      <li className="menu__group"><Link className="menu__link r-link text-underlined" to='HairDressers'> הספרים שלנו</Link></li>
      </>:<>
      <li className="menu__group"><Link className="menu__link r-link text-underlined" to='emp'>מערכת שעות</Link></li>
      <li className="menu__group"><Link className="menu__link r-link text-underlined" to='editDetails'>עדכון פרטי מעצב</Link></li>
           </>}
                               <li  className="menu__group"><Link className="menu__link r-link text-underlined" to='About'> אודות הסטודיו</Link></li>

                               <div className="row d-flex justify-content-center">
        <img className="logo" src={logo}></img>
      </div>               
    </ul>
  </nav>
 
</div>
</div>
      
    )
}


export default NavbarClient


