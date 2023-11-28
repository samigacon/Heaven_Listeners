import React from 'react';

import { useRegisterUserMutation, useLoginUserMutation } from '../features/api/authApi';

export default function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
    
    /*
    if (isUserLoggedIn) {
        setMessage('Already connected!');
        return;
    }
    */

    const handleRegister = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/register', {
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
                console.log('Authentication Done');
                setMessage(data.message);
            } else {
                console.log('Authentication Error');
                setMessage('Authentication Error');
            }
        } catch (error) {
             console.log('Register Query Error');
            setMessage('Register Query Error');
        }
    }

    const handleLogin = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/login', {
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
                setIsUserLoggedIn(true);
                console.log('Login Done');
                setMessage(data.message);
            } else {
                console.log('Login Error');
                setMessage('Login Error');
            }
        } catch (error) {
            console.log('Login Query Error');
            setMessage('Login Query Error.');
        }
    }
     
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
                        placeholder="Username"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                    />
                <label htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <button type="button" onClick={handleLogin}>Login</button>
                <button type="button" onClick={handleRegister}>Register</button>
            </form>
            {message && <p>{message}</p>}
            { console.log('Username : ' + username) }
            { console.log('Password : ' + password) }
            { console.log('isUserLoggedIn: ' + isUserLoggedIn) }
        </div>
    )
}