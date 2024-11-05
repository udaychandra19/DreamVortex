import React, { useState } from 'react';

export default function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [alert, setAlert] = useState(false);
    const [message, setMessage] = useState('');

    const forgotpass = () => {
        setForgot(true);
    };

    const alerting = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 2000);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        const data = isSignedIn ?
            (forgot ? { username, password } : { username, password }) :
            { username, email, password };

        try {
            const response = await fetch(isSignedIn ? (forgot ? 'http://localhost:5500/reset' : 'http://localhost:5500/login') : 'http://localhost:5500/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();
            if (response.ok) {
                setForgot(false);
                props.handleLogin();
                props.userid(username);
                setMessage(responseData.message);
                console.log(responseData.message);
            } else {
                console.error(responseData.error);
                setMessage("Invalid Credentials");
                alerting();
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Invalid Login Credentials");
            alerting();
        }
    };

    const handleSignOut = () => {
        forgot ? setForgot(false) : setIsSignedIn(false);
    };

    const handleSignin = () => {
        setIsSignedIn(true);
    };

    return (
        <div>
            <div className="container" style={{ width: '500px' }}>
                <div className="row justify-content-center" style={{ width: "500px", marginTop: "120px", marginBottom: "0px" }}>
                    <div className="col-lg-8 col-md-6" style={{ width: "500px" }}>
                        <div className="card shadow">
                            <div className="card-body" style={{ width: "470px", height: !isSignedIn ? '530px' : '480px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <h2 className="card-title text-center mb-4" style={{ marginTop: "18px", textDecoration: "underline" }}>Welcome to DreamVortex</h2>
                                {alert && <div className="alert text-center alert-danger" role="alert" style={{ margin: "0px", marginBottom: "10px" }}>
                                    {message}
                                </div>}
                                <form onSubmit={handleLogin}>
                                    <div className="form-group">
                                        <label className="label-group my-1" htmlFor="username">Username :</label>
                                        <input
                                            type="text"
                                            className="form-control my-1"
                                            id="username"
                                            name="username"
                                            value={username}
                                            placeholder='Enter Name'
                                            onChange={(e) => { setUsername(e.target.value) }}
                                        />
                                    </div>
                                    {!isSignedIn && (<div className="form-group my-3">
                                        <label className="label-group my-1" htmlFor="password">Email :</label>
                                        <input
                                            type="email"
                                            className="form-control my-1"
                                            id="email"
                                            name="email"
                                            value={email}
                                            placeholder='Email Address'
                                            onChange={(e) => { setEmail(e.target.value) }}
                                        />
                                    </div>)}
                                    <div className="form-group my-3">
                                        <label className="label-group my-1" htmlFor="password">{!forgot ? 'Password :' : 'New Password :'}</label>
                                        <input
                                            type="password"
                                            className="form-control my-1"
                                            id="password"
                                            name="password"
                                            value={password}
                                            placeholder={!forgot ? 'Enter Password' : 'Enter New Password'}
                                            onChange={(e) => { setPassword(e.target.value) }}
                                        />
                                    </div>
                                    <div className="text-center"><button type="submit" className="btn btn-dark" style={{ width: "100%", marginTop: "13px" }}>{!isSignedIn ? "Sign Up" : "Login"}</button></div>
                                </form>
                                {!isSignedIn && <div className='text-center' style={{ marginTop: "10px", marginBottom: "10px" }}>Already have an account?<button className='btn btn-link' style={{ padding: "0px", marginBottom: "5px", marginLeft: "5px", textDecoration: "none" }} onClick={handleSignin}>Login</button></div>}
                                {!forgot && isSignedIn && <button className='btn btn-link' style={{ padding: "0px", marginBottom: "7px", marginTop: "7px", textDecoration: "none" }} onClick={forgotpass}>Forgot Password?</button>}
                                {isSignedIn && <div className="text-center"><button button className='btn btn-dark' style={{ width: "90px", marginBottom: "13px", marginTop: forgot ? "15px" : "0px" }} onClick={handleSignOut}>&larr; back</button></div>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
