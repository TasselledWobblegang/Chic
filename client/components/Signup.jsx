import React from 'react'
import styles from '../styles/login.css'
import { Link, useNavigate } from 'react-router-dom';

//Look into what useNavigate does in react router
//useNavigator seems like its making a redirection

// On line 49 fix that route the to sends to the wrong location

const Signup= ({ setSSID }) => {

    const navigator = useNavigate()

    let singupHandler = () => {

        let username =  document.querySelector('#loginUsername').value;
        let password = document.querySelector('#loginPassword').value;

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
            if(res.err){
                alert(res.err)
             }
             else{
             setSSID(res)
             navigator('/dashboard')
             }
        })
        .catch(err => console.log('error from fetch:', err));
    };

return (
    <>
    <div id='inputBox'>
        <text id='chic'>CHIC</text>
        <input id='input' placeholder='USERNAME'></input>
        <input id='input' placeholder='PASSWORD'></input>
        <button id='signupLoginButton' onClick= {singupHandler}>SIGN UP</button>
        <Link id='userLink' to='/login'>
            CLICK HERE TO LOGIN
        </Link>
    </div>
    </>
    )
}
export default Signup;