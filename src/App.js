import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Devices from "./pages/Devices";
import Energy from "./pages/Energy"

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path='/login' element={<Login/>}/>
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/devices" element={<Devices/>} />
                <Route path ="/energy" element={<Energy/>} />
            </Routes>
        </Router>
    );
}

export default App;
