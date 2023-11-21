import React from 'react';

import { useRegisterUserMutation, useLoginUserMutation } from '../features/api/authApi';

export default function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    
    const [registerUser, registerUserRequest] = useRegisterUserMutation();
    const [loginUser, loginUserRequest] = useLoginUserMutation();
    
   // const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
   // const [isUserRegistering, setIsUserRegistering] = React.useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {
            const result = await registerUser({ username, password });
            if (result.data.success) {
                setMessage('Registering done !');
            } else {
                setMessage('Error during registering.');
            }
        } catch (error) {
         setMessage('Query error during registering.');
        }
    };
    
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
        const result = await loginUser({ username, password });
        if (result.data.success) {
            setMessage('Login done !');
        } else {
            setMessage('Login error.');
            }
        } catch (error) {
        setMessage('Login query error.');
        }
    };
    
    
    
    
        
        // LOGIN
        /*
        if (isUserLoggedIn) {
            { console.log('Already connected') }
            setMessage('Already connected!');
            return;
        }
        */
        
         /*
        const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{3,20}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    
        // Regex Inscription or Unrecognized Mode
        if (isUserRegistering) {
            if (!username.match(usernameRegex)) {
                setMessage('Username must contain between 3 and 20 alphanumeric characters.');
                return;
            }
        
            if (!password.match(passwordRegex)) {
                setMessage('Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, and one digit.');
                return;
            }
        } else {
            if (!username.match(usernameRegex) || !password.match(passwordRegex)) {
                setMessage('Unrecognized username or password.');
                return;
             }
        }
        */
        /*
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
            if (response.ok) {
                const data = await response.json();
                { console.log('Connection Done') }
                setIsUserLoggedIn(true);
                setMessage(data.message);
            } else {
                { console.log('Authentication Error') }
                setMessage('Authentication Error');
            }
        } catch (error) {
             { console.log('Query Error') }
            setMessage('Query Error');
        }
        */
        /*
        //REGISTER
        try {
            const response = await fetch('http://localhost:3001/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log(data);
        } catch (error) {
            console.error('Fetch error:', error.message);
        }
    }
    */
    /*
    const handleLogout = () => {
        { console.log('Disconnection Done') }
        setIsUserLoggedIn(false);
    }
    */
    
    return (
        <div className="login-page">
            <h1>Profile</h1>
               <form>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    name="username"
                    placeholder="Username" required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Password" required
                    onChange={(e) => setPassword(e.target.value)}
                />
                 <button type="submit" onSubmit={handleLogin}>Login</button>
                <button type="submit" onSubmit={handleRegister}>Register</button>
            </form>
            {message && <p>{message}</p>}
            { console.log('Username : ' + username) }
            { console.log('Password : ' + password) }
        </div>
    )
}