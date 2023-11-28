import React from 'react';

export default function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isUserLoggedIn, setIsUserLoggedIn] = React.useState(false);

    // Regex Inscription and Unrecognized User
    const usernameRegex = /^(?=.*[a-zA-Z\d]).{3,20}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[a-zA-Z\d\W_]{8,}$/;

    // Register
    const handleRegister = async () => {
        if (!username.match(usernameRegex)) {
            setMessage('Username must contain between 3 and 20 alphanumeric characters.');
            return;
        }
        
        if (!password.match(passwordRegex)) {
            setMessage('Password must be at least 8 characters long with at least one uppercase letter, one lowercase letter, one digit, and one special character.');
            return;
        }
        
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
                console.log('Authentication Error', response.status, response.statusText);
                setMessage('Authentication Error');
            }
        } catch (error) {
             console.log('Register Query Error', error);
            setMessage('Register Query Error');
        }
    }

    // Login
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
                console.log('Login Error', response.status, response.statusText);
                setMessage('Login Error');
            }
        } catch (error) {
            console.log('Login Query Error', error);
            setMessage('Login Query Error.');
        }
    }

    // Logout
    const handleLogout = () => {
        { console.log('Disconnection Done') }
        setIsUserLoggedIn(false);
    }


    return (
        <div className="login-page">
            <h1>Profile</h1>
            {isUserLoggedIn ? (
                <div>
                    <h2>Welcome to Heaven Listeners, {username}!</h2>
                    <button type="button" onClick={handleLogout}>Logout</button>
                </div>
            ) : (
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
            )}
            {message && <p>{message}</p>}
            { console.log('Username : ' + username) }
            { console.log('Password : ' + password) }
            { console.log('Message : ' + message) }
            { console.log('isUserLoggedIn: ' + isUserLoggedIn) }
        </div>
    )
}