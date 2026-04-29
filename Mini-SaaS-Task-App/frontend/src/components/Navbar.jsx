import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, LogOut } from 'lucide-react';

export default function Navbar() {
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-white/60 backdrop-blur-xl border-b border-white/50 sticky top-0 z-10 shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center gap-2 text-primary-600 hover:text-primary-700 transition-colors">
              <CheckCircle2 size={28} strokeWidth={2.5} />
              <span className="font-bold text-xl tracking-tight text-slate-900">TaskFlow</span>
            </Link>
          </div>
          <div className="flex items-center">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 rounded-md hover:bg-slate-100"
            >
              <LogOut size={18} />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
