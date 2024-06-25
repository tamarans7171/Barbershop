import React, { useState } from "react";
import { Nav, Navbar, Container, NavDropdown, Form, FormControl, Button, Toast } from 'react-bootstrap';
import sprey_hair from '../../../Images/sprey_hair.jpg'
import { Link } from "react-router-dom";


export default function Shoppingcart() {
    return (

<div>
<p>+ 1 -</p>
<img className='images' src={sprey_hair} />
<p>מתיר קשרים</p> 
<p>מחיר: 60 ש"ח</p>
<nav>
    <Nav.Link ><Link to='/Spreyhair'> ראה מוצר</Link></Nav.Link>
</nav>
<p>סה"כ:   ש"ח</p>

</div>
    )
}

