import { Link, useLocation, useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import { useEffect, useRef, useState } from 'react';
import leafGreen from '../assets/leaf-green.svg';

function Navbar() {
    const location = useLocation();
    const navigate = useNavigate();
    const [loggingOut, setLoggingOut] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [user, setUser] = useState(null);
    const menuRef = useRef(null);

    const isAppPage = ['/dashboard', '/devices', '/energy'].includes(location.pathname);

    useEffect(() => {
        const storedUser = localStorage.getItem('cloudProjectUser');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch {
                setUser(null);
            }
        } else {
            setUser(null);
        }
    }, [location.pathname]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const displayName = user
        ? [user.firstName, user.lastName].filter(Boolean).join(' ') || user.username || 'User'
        : 'User';

    const initials = displayName
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0]?.toUpperCase())
        .join('') || 'U';

    const handleLogout = async () => {
        try {
            setLoggingOut(true);
            await api.logout();
            localStorage.removeItem('cloudProjectUser');
        } finally {
            setLoggingOut(false);
            setMenuOpen(false);
            navigate('/login');
        }
    };

    return (
        <nav className="relative z-50 bg-gray-800 px-3 sm:px-5 md:px-8 py-3 md:py-4 flex items-center justify-between gap-3">
            <div>
                <Link to="/" className="flex items-center gap-2 md:gap-3 text-white text-lg sm:text-xl md:text-2xl font-bold hover:text-blue-400 transition">
                    <span className="whitespace-nowrap">Industrial Control</span>
                    <img src={leafGreen} alt="Green leaf" className="h-6 w-6 md:h-8 md:w-8 drop-shadow-sm" />
                </Link>
            </div>
            {isAppPage && (
                <div className="relative z-50" ref={menuRef}>
                    <button
                        type="button"
                        onClick={() => setMenuOpen((previous) => !previous)}
                        className="flex items-center gap-2 md:gap-3 rounded-full border border-white/10 bg-white/5 px-2 sm:px-3 py-2 text-left text-white shadow-sm transition hover:bg-white/10"
                    >
                        <span className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-blue-600 text-xs sm:text-sm font-bold text-white">
                            {initials}
                        </span>

                        <span className="hidden sm:flex max-w-[120px] md:max-w-[180px] flex-col leading-tight">
                            <span className="truncate text-sm font-semibold text-white">{displayName}</span>
                            <span className="text-xs text-gray-300">Account</span>
                        </span>

                        <svg className="h-4 w-4 text-gray-300" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 10.94l3.71-3.71a.75.75 0 1 1 1.06 1.06l-4.24 4.25a.75.75 0 0 1-1.06 0L5.21 8.29a.75.75 0 0 1 .02-1.08Z" clipRule="evenodd" />
                        </svg>
                    </button>

                    {menuOpen && (
                        <div className="absolute right-0 mt-3 w-[92vw] max-w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl z-50">
                            <div className="flex items-center gap-3 border-b border-gray-100 px-4 py-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                                    {initials}
                                </div>
                                <div className="min-w-0">
                                    <p className="truncate text-sm font-semibold text-gray-900">{displayName}</p>
                                    <p className="truncate text-xs text-gray-500">{user?.email || 'Signed in user'}</p>
                                </div>
                            </div>

                            <button
                                onClick={handleLogout}
                                disabled={loggingOut}
                                className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                            >
                                <svg className="h-4 w-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M10 17l5-5-5-5" />
                                    <path d="M15 12H3" />
                                    <path d="M21 3v18" />
                                </svg>
                                {loggingOut ? 'Signing out...' : 'Sign out'}
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
}

export default Navbar;
