import { useState } from 'react';
import { Link } from 'react-router-dom';
import bg from "../assets/bg.jpg"

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Register:', name, email, password);
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
                            <input
                                type="text"
                                placeholder="Full Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
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
                                placeholder="Mot de passe"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button
                                type="submit"
                                className="px-4 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition font-medium"
                            >
                                Sign Up
                            </button>
                            <Link to ="/Login" className="flex justify-center text-white">
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
