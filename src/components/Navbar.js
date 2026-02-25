import { Link } from 'react-router-dom';

function Navbar() {
    return (
        <nav className="bg-gray-800 px-8 py-4 flex justify-between items-center">
            <div>
                <Link to="/" className="text-white text-2xl font-bold hover:text-blue-400 transition">
                    industrial Control
                </Link>
            </div>
            <ul className="flex gap-8 list-none">
                <li><Link to="/profil" className="text-white hover:text-blue-400 transition">Help?</Link></li>
                
            </ul>
        </nav>
    );
}

export default Navbar;
