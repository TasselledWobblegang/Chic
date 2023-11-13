import React from 'react'
import styles from '../styles/login.css'
import { Link } from 'react-router-dom';

const Signup= () => {

    let singupHandler = () => {

        let username =  document.querySelector('#username').value;
        let password = document.querySelector('#password').value;

        const userInfo = {
            username: username,
            password: password
        };

        fetch('/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type' : 'Application/JSON'
            },
            body: JSON.stringify(userInfo)
        })
        .then((res) => res.json())
        .then((res) => {
            console.log(res)
        })
    };

return (
    <>
    <div id='loginBox'>
        <img id='logo' src='https://www.wrkmode.com/images/id/logo_chic.gif'></img>
        <input id='loginUsername' placeholder='username'></input>
        <input id='loginPassword' placeholder='password'></input>
        <button id='loginButton' onClick= {singupHandler}>click here to signup</button>
        <Link id='signupLink' to='/login' style= {{margin : 10}}>
            Click here to login
        </Link>
    </div>
    </>
    )
}
export default Signup;