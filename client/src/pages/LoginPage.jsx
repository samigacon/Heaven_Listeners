import React from 'react';

export default function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [isLoggedIn, setIsLoggedIn] = React.useState(false);
    
    React.useEffect(() => {
        // Initialize Session
        if (localStorage.getItem('userConnected') === null) {
            localStorage.setItem('userConnected', 'false');
        }
        // Keep Session if Connected
        const localUserConnected = localStorage.getItem('userConnected');
        if (localUserConnected === 'true') {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

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
                setMessage('Authentication Done');
                console.log('Message : ' + message);
                
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
                setIsLoggedIn(true);
                setUsername(username);
                localStorage.setItem('userConnected', 'true');
                console.log('Login Done');
                setMessage('Login Done');
            } else {
                console.log('Login Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Login Error');
            }
        } catch (error) {
            console.log('Login Query Error', error);
            setMessage('Login Query Error.');
        }
    }

    // Logout
    const handleLogout = async () => {
        try {
            const response = await fetch('http://samigacon.ide.3wa.io:3001/logout', {
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
                setMessage('Disconnection Done');
                console.log('Message : ' + message);
                localStorage.setItem('userConnected', 'false');
                setIsLoggedIn(false);
            } else {
                console.log('Logout Error' + ' ' + response.status + ' ' + response.statusText);
                setMessage('Logout Error');
            }
        } catch (error) {
            console.log('Logout Query Error', error);
            setMessage('Logout Query Error.');
        }
    }

    return (
        <div className="login-page">
            <h1>Profile</h1>
            { isLoggedIn ? (
                <div>
                    <h2>Welcome to Heaven Listeners !</h2>
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
        </div>
    )
}