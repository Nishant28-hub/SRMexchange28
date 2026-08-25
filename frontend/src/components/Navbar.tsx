import { Link, useNavigate } from "react-router-dom";
import { Leaf, Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
    <header className="sticky top-0 z-50 glass border-x-0 border-t-0 shadow-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3.5">
        {/* macOS Style Traffic Dots + Logo */}
        <Link to="/" className="group flex items-center gap-3 font-display text-lg font-semibold">
          <div className="hidden sm:flex items-center gap-1.5 pr-1">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f56]/80 shadow-[0_0_8px_rgba(255,95,86,0.5)] transition-all group-hover:opacity-100 opacity-60"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]/80 shadow-[0_0_8px_rgba(255,189,46,0.5)] transition-all group-hover:opacity-100 opacity-60"></span>
            <span className="h-2.5 w-2.5 rounded-full bg-[#27c93f]/80 shadow-[0_0_8px_rgba(39,201,63,0.5)] transition-all group-hover:opacity-100 opacity-60"></span>
          </div>
          <motion.span 
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400/30 to-cyan-500/20 text-emerald-300 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Leaf size={18} />
          </motion.span>
          <span className="tracking-tight text-white/90">
            RExchange <span className="rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-1.5 py-0.5 text-xs text-emerald-300 font-mono">SRM</span>
          </span>
        </Link>

        {/* macOS Dock-like Navigation Pill */}
        <nav className="hidden items-center gap-1 text-sm rounded-full bg-white/[0.04] border border-white/10 px-3 py-1.5 backdrop-blur-xl shadow-inner md:flex">
          <Link to="/marketplace" className="relative px-3.5 py-1 text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10">
            Marketplace
          </Link>
          {user && (
            <>
              <Link to="/dashboard" className="relative px-3.5 py-1 text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10">
                Dashboard
              </Link>
              <Link to="/create-listing" className="relative px-3.5 py-1 text-white/70 hover:text-white transition-colors duration-200 rounded-full hover:bg-white/10">
                Post a Listing
              </Link>
            </>
          )}
        </nav>

        {/* User Controls */}
        <div className="hidden items-center gap-3 md:flex">
          {user ? (
            <>
              <div className="flex items-center gap-2 rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs text-white/70">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>{user.name.split(" ")[0]}</span>
              </div>
              <motion.button 
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLogout} 
                className="btn-outline text-xs px-4 py-2"
              >
                Logout
              </motion.button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline text-xs px-4 py-2">
                Login
              </Link>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                <Link to="/register" className="btn-primary text-xs px-4 py-2 gap-1.5 shadow-[0_0_20px_rgba(16,185,129,0.35)]">
                  <Sparkles size={13} />
                  Get Started
                </Link>
              </motion.div>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden rounded-lg p-2 text-white/70 hover:bg-white/10 hover:text-white transition-colors" 
          onClick={() => setOpen(!open)} 
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div 
            initial={{ opacity: 0, height: 0, scale: 0.98 }}
            animate={{ opacity: 1, height: "auto", scale: 1 }}
            exit={{ opacity: 0, height: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="glass mx-4 mb-4 flex flex-col gap-2.5 rounded-2xl p-4 text-sm md:hidden overflow-hidden"
          >
            <Link to="/marketplace" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors">
              Marketplace
            </Link>
            {user && (
              <>
                <Link to="/dashboard" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <Link to="/create-listing" onClick={() => setOpen(false)} className="px-3 py-2 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors">
                  Post a Listing
                </Link>
              </>
            )}
            <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
              {user ? (
                <button onClick={handleLogout} className="btn-outline w-full py-2">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setOpen(false)} className="btn-outline text-center py-2">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setOpen(false)} className="btn-primary text-center py-2">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
