import React from 'react'
import  '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';



const Login = ( {setSSID} ) => {

    const navigator = useNavigate()

    let loginHandler = () => {

        let username =  document.querySelector('#loginUsername').value;
        let password = document.querySelector('#loginPassword').value;

        const userInfo = {
            username: username,
            password: password
        };

        fetch('/auth/login', {
            method: 'POST',
            headers: {
                'Content-type' : 'Application/JSON'
            },
            body: JSON.stringify(userInfo)
        })
        .then((res) => res.json())
        .then((res) => {
            if(res.err){
               alert(res.err)
            }
            else{
            setSSID(res)
            navigator('/dashboard')
            }
        })
    };

return (
    <>
        <div id='loginBox'>
            <img id='logo' src='https://www.wrkmode.com/images/id/logo_chic.gif'></img>
            <input id='loginUsername' placeholder='username'></input>
            <input id='loginPassword' placeholder='password'></input>
            <button id='loginButton'onClick= {loginHandler}>Login</button>
            <Link id='signupLink' to='/signup'>
            Click here to Signup
            </Link>
        </div>
    </>
    )
}

export default Login