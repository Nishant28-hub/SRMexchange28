import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { fetchMyListings } from "../api/listings";
import type { Listing } from "../types";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { Plus, Award } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyListings()
      .then((res) => setListings(res.listings))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* macOS User Profile Banner */}
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="mac-window mb-10 overflow-hidden"
      >
        {/* Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span>
          </div>
          <div className="text-[11px] font-mono text-white/40">srmist.edu.in/dashboard/@{user?.email.split("@")[0]}</div>
          <div className="w-10"></div>
        </div>

        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="font-display text-3xl font-bold text-white">Welcome back, {user?.name.split(" ")[0]} 👋</h1>
              <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 text-xs text-emerald-300 font-mono">
                Verified SRM
              </span>
            </div>
            <p className="mt-1 text-xs text-white/50 flex items-center gap-3">
              <span>{user?.college || "SRMIST"} • {user?.branch || "Engineering"}</span>
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <Award size={13} /> {user?.reputation ?? 0} Campus Reputation
              </span>
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/create-listing" className="btn-primary gap-2 text-sm shadow-[0_4px_20px_rgba(16,185,129,0.35)]">
              <Plus size={16} /> Post New Listing
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-white">Your active listings</h2>
          <p className="text-xs text-white/40">Manage your active posts or trade offers.</p>
        </div>
        <span className="rounded-full bg-white/[0.05] border border-white/10 px-3 py-1 text-xs font-mono text-white/60">
          {listings.length} item{listings.length === 1 ? "" : "s"}
        </span>
      </div>

      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card my-8 flex flex-col items-center justify-center p-14 text-center border border-white/10"
        >
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-3 text-2xl">
            📦
          </div>
          <h3 className="font-display text-base font-semibold text-white">No active listings</h3>
          <p className="mt-1 text-xs text-white/40 max-w-sm mb-4">You haven't posted any items or notes for exchange yet.</p>
          <Link to="/create-listing" className="btn-primary text-xs gap-1.5">
            <Plus size={14} /> Create your first listing
          </Link>
        </motion.div>
      ) : (
        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence>
            {listings.map((listing, i) => (
              <motion.div
                key={listing._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, delay: i * 0.05 }}
              >
                <ListingCard listing={listing} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
