import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup(props) {
 
  const [credentials, setCredentials] = useState({ name:"",email: "", password: "" , cpassword:""});
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    if((credentials.password===credentials.cpassword))
    {
      e.preventDefault();
      const url = `http://localhost:5001/api/auth/createuser`;
      const {name,email,password,cpassword} = credentials;
  
      const response = await fetch(url, {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({name,email,password})
      });
      const json = await response.json();
     //console.log(json);
      if (json.success) {
          localStorage.setItem('token', json.authtoken);
          navigate("/");
          props.showAlert("Account created successfully","success");
      } else {
          props.showAlert("Sorry, a user with this email already exist","danger");
      }
    }
    else
    {
       e.preventDefault();
      props.showAlert("passwords doesnt match","danger");
     }
    
};

const onChange = (e) => {
    setCredentials({
        ...credentials,
        [e.target.name]: e.target.value
    });
};

 
 
 
  return (
    <div className='container mt-3'>
      <h2>Create an account for Notebook</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="name" className="form-control" id="name" name="name" onChange={onChange}  aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" name="email" id="email"onChange={onChange} aria-describedby="emailHelp"/>
            <div id="email" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="password" minLength={5} required  onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" name="cpassword" id="cpassword" minLength={5}  required  onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
