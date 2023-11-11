import React from 'react'

const Signup= () => {

    let singupHandler = () =>{
        const userInfo = {
            username: '',
            password: ''
        }
        fetch('localhost:3000/signup', {
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
    }

return (
    <>
        <h1>Signup</h1>
        <button onClick= {singupHandler}>click here to signup</button>
    </>
    )
}
export default Signup;