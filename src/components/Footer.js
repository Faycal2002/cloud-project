import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white px-4 sm:px-6 py-2 sm:py-3 text-xs sm:text-sm shadow-inner">
      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 sm:flex-row sm:justify-between sm:gap-3">
        <div className="text-center sm:text-left">© 2026 Cloud Project</div>
        <div className="text-center text-green-400">Energy-Saving Mode Enabled</div>
        <div className="text-center sm:text-right">v1.0</div>
      </div>
    </footer>
  );
}

export default Footer;