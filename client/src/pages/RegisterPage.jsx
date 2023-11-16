import Loader from '../components/Loader'

import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';

export default function RegisterPage () {
    
    
    
    return (
        <div className="register-page">
            <h1>register</h1>
            <form>
                <label htmlFor="username">Username</label>
                    <input type="text" name="username" placeholder="Username" required/>
                <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Password" required/>
                 <button><Link to="/register">Confirm</Link></button>
            </form>
        </div>
    )
}