import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, ShoppingBag, PlusCircle, LayoutDashboard, UserPlus, LogIn } from "lucide-react";
import { useAuth } from "../context/AuthContext";

interface DockItemProps {
  to: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  isActive: boolean;
  badge?: string;
}

function DockItem({ to, icon: Icon, label, isActive, badge }: DockItemProps) {
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    setTimeout(() => setBouncing(false), 600);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col items-center p-2 focus:outline-none"
    >
      {/* macOS Floating Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.85 }}
            animate={{ opacity: 1, y: -28, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="pointer-events-none absolute -top-2 whitespace-nowrap rounded-lg border border-white/15 bg-black/80 px-2.5 py-1 text-[11px] font-medium text-white shadow-xl backdrop-blur-xl"
          >
            {label}
            {badge && (
              <span className="ml-1.5 rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] text-emerald-300 font-mono">
                {badge}
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* macOS Dock Icon with Spring Magnification */}
      <motion.div
        animate={
          bouncing
            ? { y: [0, -16, 0, -8, 0], scale: [1, 1.25, 1, 1.1, 1] }
            : { y: hovered ? -8 : 0, scale: hovered ? 1.35 : 1 }
        }
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 18,
        }}
        className={`flex h-11 w-11 items-center justify-center rounded-2xl border transition-colors duration-200 ${
          isActive
            ? "border-emerald-400/50 bg-gradient-to-b from-emerald-500/25 to-emerald-500/10 text-emerald-300 shadow-[0_0_20px_rgba(16,185,129,0.35)]"
            : "border-white/10 bg-white/[0.06] text-white/70 hover:border-white/25 hover:bg-white/[0.12] hover:text-white"
        }`}
      >
        <Icon size={20} className="transition-transform duration-200 group-hover:scale-105" />
      </motion.div>

      {/* macOS Active App Indicator Dot */}
      {isActive && (
        <motion.span
          layoutId="activeDockDot"
          className="absolute -bottom-0.5 h-1 w-1 rounded-full bg-emerald-400 shadow-[0_0_6px_#34d399]"
        />
      )}
    </Link>
  );
}

export default function MacDock() {
  const location = useLocation();
  const { user } = useAuth();

  return (
    <div className="fixed bottom-5 left-1/2 z-40 -translate-x-1/2">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 24, delay: 0.3 }}
        className="flex items-center gap-1.5 rounded-3xl border border-white/20 bg-black/40 px-3 py-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.2)] backdrop-blur-2xl"
      >
        <DockItem
          to="/"
          icon={Home}
          label="Home"
          isActive={location.pathname === "/"}
        />
        <DockItem
          to="/marketplace"
          icon={ShoppingBag}
          label="Marketplace"
          isActive={location.pathname.startsWith("/marketplace") || location.pathname.startsWith("/listings")}
        />
        <DockItem
          to="/create-listing"
          icon={PlusCircle}
          label="Post Listing"
          isActive={location.pathname === "/create-listing"}
          badge="Trade"
        />
        
        {/* Divider */}
        <div className="mx-1 h-8 w-px bg-white/15" />

        {user ? (
          <DockItem
            to="/dashboard"
            icon={LayoutDashboard}
            label={`Dashboard (${user.name.split(" ")[0]})`}
            isActive={location.pathname === "/dashboard"}
            badge="Live"
          />
        ) : (
          <>
            <DockItem
              to="/login"
              icon={LogIn}
              label="Log In"
              isActive={location.pathname === "/login"}
            />
            <DockItem
              to="/register"
              icon={UserPlus}
              label="Join Campus"
              isActive={location.pathname === "/register"}
              badge="Free"
            />
          </>
        )}
      </motion.div>
    </div>
  );
}
