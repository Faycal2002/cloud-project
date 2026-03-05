import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white h-12 flex items-center justify-between px-6 text-sm shadow-inner">
      <div>© 2026 Cloud Project</div>
      <div className="text-green-400">Energy-Saving Mode Enabled</div>
      <div>v1.0</div>
    </footer>
  );
}

export default Footer;