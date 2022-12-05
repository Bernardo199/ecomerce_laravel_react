// import component react-boostrapt
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

// component login & register
import { Login } from "../Login/Login";
import  Register from "../Register/Register";
import { useState } from "react";

const NavbarHeader = () => {
    // set background color navbar
    const [bgNav, setBgNav] = useState(false);

    const setBackgroundNav = () => {
        if(window.scrollY >= 100) {
            setBgNav(true);
        } else {
            setBgNav(false);
        }
    }

    const token = localStorage.getItem('token');

    window.addEventListener('scroll', setBackgroundNav);

    return (
        <Navbar expand="lg" className='navbar' style={bgNav ? {background: 'rgba(25, 25, 25, 0.6)'} : {background: 'white'}}>
            <Container className='d-flex justify-content-between'>
                <Navbar.Brand href="#" className='navbar-brand text-warning'><h2 style={{ textShadow: '2px 2px 2px darkblue' }}>Surya Mart <span>Tuban</span></h2></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                <Nav className="login-system d-flex gap-3">
                    {
                        !token &&  <Nav.Link><Login /></Nav.Link>
                    }
                    <Nav.Link> <Register className='register' /></Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarHeader;