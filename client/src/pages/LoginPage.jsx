import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);
    const [isUserRegistering, setIsUserRegistering] = React.useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (isUserLoggedIn) {
            setMessage('Already connected!');
            return;
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
    
        try {
            const response = await fetch('http://localhost:3001/login', {
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
                setMessage(data.message);
            } else {
                setMessage('Authentication Error');
            }
        } catch (error) {
            setMessage('Query Error');
        }
    }
    
    const handleLogout = () => {
        setIsUserLoggedIn(false);
    }
    
    return (
        <div className="login-page">
            <h1>Profile</h1>
            { console.log('Before') }
            { console.log(username) }
            { console.log(password) }
            { console.log(isUserLoggedIn) }
            { console.log(isUserRegistering) }
            { console.log(message) }
            {isUserLoggedIn ? 
                (<button onClick={handleLogout}>Disconnection</button>) : 
                (<form onSubmit={handleSubmit}>
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
                    <button type="submit">{isUserRegistering ? 'Register' : 'Connection'}</button>
                    <button onClick={() => setIsUserRegistering(!isUserRegistering)}>
                        {isUserRegistering ? 'Press to Login' : 'Press to Register'}
                    </button>
                </form>
                )
            }
            {message && <p>{message}</p>}
            { console.log('After') }
            { console.log(username) }
            { console.log(password) }
            { console.log(isUserLoggedIn) }
            { console.log(isUserRegistering) }
            { console.log(message) }
        </div>
    )
}