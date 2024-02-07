import { Link } from 'react-router-dom';

export default function Header() {
    return (
        <header>
            <div className="summary">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/search">Search</Link></li>
                    <li><Link to="/library">Library</Link></li>
                    <li><Link to="/login">Profile</Link></li>
                </ul>
            </div>
        </header>
    )
}