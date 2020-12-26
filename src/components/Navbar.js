import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom'

const Navbar = (props) => {
    const handleClick = () => {
        axios.delete('http://localhost:3001/logout', {withCredentials: true})
        .then (resp => {
            props.handleLogout()
            props.history.push('/')
        })
        .catch(error => console.log(error))
    }

    return (
        <div>
            <Link to='/'>Home</Link>  
            {
                props.loggedInStatus ? 
                <Link to='/logout' onClick={handleClick}>Log Out</Link> :
                <>
                    <Link to='/login'>Log In</Link>
                    <Link to='/signup'>Sign Up</Link> 
                </>  
            }  
        </div>
    )
}

export default Navbar
