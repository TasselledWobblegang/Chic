import React from 'react'

const Login = () => {

    let loginHandler = () => {

        let username =  document.querySelector('#username').value;
        let password = document.querySelector('#password').value;

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
            console.log(res)
        })
    };

return (
    <>
        <div id='loginBox'>
            <h1>Login</h1>
            <button onClick= {loginHandler}>click here to Login</button>
            <input id='password' placeholder='password'></input>
            <input id='username' placeholder='username'></input>
        </div>
    </>
    )
}

export default Login