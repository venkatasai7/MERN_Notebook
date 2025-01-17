import React,{useEffect} from 'react'
import {
  Link, useLocation
} from "react-router-dom";

import { useNavigate } from 'react-router-dom';

 

const NavBar = (props) => {
  let navigate = useNavigate();
  let location = useLocation();
  useEffect(() => {
    //console.log(location)
  }, [location]);
  const HandleLogout=()=>{
    localStorage.removeItem('token')
    navigate("/login");
    props.showAlert("Loggout successful","success");
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Notebook</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/" ? "active": "" }`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about" ? "active": "" }`} aria-current="page" to="/About">About</Link>
        </li>
        </ul>
          
      {!localStorage.getItem('token')?(<form className="d-flex">
      <Link className="btn btn-primary mx-1" to="/login" role="button">Log in</Link>
      <Link className="btn btn-primary mx-1" to="/signup" role="button">Sign up</Link>
      </form>) : <button 
      onClick={HandleLogout} className="btn btn-primary mx-3">Log out</button>}
    </div>
  </div> 
</nav>
    </div>
  )
}

export default NavBar
