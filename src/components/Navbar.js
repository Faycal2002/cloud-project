import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 px-8 py-4 flex justify-between items-center">
            <div>
                <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition">
                    Industrial Control
                </Link>
            </div>
            <ul className="flex gap-8 list-none">
                <li><Link to="/login" className="text-white hover:text-blue-400 transition">Login</Link></li>
                <li><Link to="/register" className="text-white hover:text-blue-400 transition">Register</Link></li>
                <li><Link to="/profil" className="text-green-400">Help?</Link></li>
                
            </ul>
        </nav>
    );
}

export default Navbar;
