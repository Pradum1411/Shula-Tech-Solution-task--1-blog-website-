import style from "./css/header.module.css"
import {Link, useNavigate } from "react-router-dom"


export const Header=(a)=>{
    const navigate = useNavigate();
    const token = localStorage.getItem("userid");
     
     const logout = (event) => {
        event.preventDefault(); // Prevents navigation
        localStorage.clear();
        navigate("/login"); // Redirect after logout
    };
     
    return <>
    <center className={`${style.header1}`}>
        <Link to="/" className={`${style.header2}`}>Home</Link>
        <a href="#about" className={`${style.header2}`}>About</a>
        {/* <Link to="#contact" className={`${style.header2}`}>Contact</Link> */}
        <a href="#contact" className={`${style.header2}`}>Contact</a>
        {token ? 
    <Link to="/login" onClick={logout} className={`${style.header2}`}>LogOut</Link>
        
        
    : 
    <Link to="/login" className={`${style.header2}`}>Login</Link>
}

    </center>
    </>
}