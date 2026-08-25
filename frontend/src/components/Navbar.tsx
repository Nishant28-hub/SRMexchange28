import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
            <Leaf size={18} />
          </span>
          <span>RExchange <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-xs text-emerald-400 font-mono">SRM</span></span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-white/70 md:flex">
          <Link to="/marketplace" className="hover:text-white">Marketplace</Link>
          {user && <Link to="/dashboard" className="hover:text-white">Dashboard</Link>}
          {user && <Link to="/create-listing" className="hover:text-white">Post a Listing</Link>}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <span className="text-sm text-white/60">Hi, {user.name.split(" ")[0]}</span>
              <button onClick={handleLogout} className="btn-outline text-sm">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-sm">Login</Link>
              <Link to="/register" className="btn-primary text-sm">Get Started</Link>
            </>
          )}
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="glass mx-4 mb-4 flex flex-col gap-3 rounded-xl p-4 text-sm md:hidden">
          <Link to="/marketplace" onClick={() => setOpen(false)}>Marketplace</Link>
          {user && <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>}
          {user && <Link to="/create-listing" onClick={() => setOpen(false)}>Post a Listing</Link>}
          {user ? (
            <button onClick={handleLogout} className="btn-outline">Logout</button>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="btn-outline text-center">Login</Link>
              <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-center">Get Started</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
