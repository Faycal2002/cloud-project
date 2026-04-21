import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { api } from '../utils/api';
import bg from "../assets/bg.jpg"

function Register() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await api.register(firstName, lastName, email, password);
            if (response?.user) {
                localStorage.setItem('cloudProjectUser', JSON.stringify(response.user));
            }
            navigate('/dashboard');
        } catch (err) {
            setError(err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (

        <div className="h-screen bg-cover bg-center"
            style={{ backgroundImage: `url(${bg})` }}
        >
            <div className="h-full w-full backdrop-blur-md bg-black/10 ">

                <div className="p-20 max-w-6xl mx-auto">
                    <div className="max-w-md mx-auto bg-white/50 backdrop-blur-xl border border-white/20 p-8 rounded-2xl shadow-2xl">
                        <h1 className="text-3xl font-bold mb-6 text-center">Register</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            {error && (
                                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded px-3 py-2">
                                    {error}
                                </p>
                            )}
                            <input
                                type="text"
                                placeholder="First Name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="text"
                                placeholder="Last Name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                disabled={loading}
                                className="px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
                            >
                                {loading ? 'Creating account...' : 'Sign Up'}
                            </button>
                            <Link to="/Login" className="flex justify-center text-white">
                                <button type="button">I already have an account</button>
                            </Link>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
