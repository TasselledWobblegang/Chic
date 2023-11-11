import React from 'react'

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
        <h1>Signup</h1>
        <button onClick= {singupHandler}>click here to signup</button>
        <input id='password' placeholder='password'></input>
        <input id='username' placeholder='username'></input>
    </>
    )
}
export default Signup;