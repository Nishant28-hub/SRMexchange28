import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { fetchMyListings, fetchListings, deleteListingRequest, updateListingRequest } from "../api/listings";
import type { Listing } from "../types";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { Plus, Award, Package, ShoppingBag, Shield, Trash2, CheckCircle2, Search, ExternalLink } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();
  const [myListings, setMyListings] = useState<Listing[]>([]);
  const [allListings, setAllListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"mine" | "all" | "card">("mine");
  const [searchQuery, setSearchQuery] = useState("");
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);

  const loadData = () => {
    setLoading(true);
    Promise.all([
      fetchMyListings().catch(() => ({ listings: [] })),
      fetchListings({ limit: 50 }).catch(() => ({ listings: [] })),
    ])
      .then(([myRes, allRes]) => {
        setMyListings(myRes.listings || []);
        setAllListings(allRes.listings || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) return;
    try {
      await deleteListingRequest(id);
      setMyListings((prev) => prev.filter((item) => item._id !== id));
      setAllListings((prev) => prev.filter((item) => item._id !== id));
      setActionSuccess(`Deleted "${title}" successfully`);
      setTimeout(() => setActionSuccess(null), 4000);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to delete listing");
    }
  };

  const handleStatusToggle = async (listing: Listing) => {
    const nextStatus: "active" | "completed" = listing.status === "active" ? "completed" : "active";
    try {
      await updateListingRequest(listing._id, { status: nextStatus });
      setMyListings((prev) =>
        prev.map((item) => (item._id === listing._id ? { ...item, status: nextStatus } : item))
      );
      setAllListings((prev) =>
        prev.map((item) => (item._id === listing._id ? { ...item, status: nextStatus } : item))
      );
      setActionSuccess(`Status updated to ${nextStatus.toUpperCase()}`);
      setTimeout(() => setActionSuccess(null), 3000);
    } catch (err: any) {
      alert(err.response?.data?.message || "Failed to update status");
    }
  };

  const filteredListings = (activeTab === "mine" ? myListings : allListings).filter((item) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      item.title.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
    );
  });

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Toast Notification */}
      <AnimatePresence>
        {actionSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-950/90 px-4 py-2.5 text-xs text-emerald-200 shadow-2xl backdrop-blur-xl"
          >
            <CheckCircle2 size={16} className="text-emerald-400" />
            <span>{actionSuccess}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* macOS User Profile Window Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="mac-window mb-8 overflow-hidden"
      >
        {/* Window Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span>
          </div>
          <div className="text-[11px] font-mono text-white/40">
            srmist.edu.in/dashboard/@{user?.email ? user.email.split("@")[0] : "user"}
          </div>
          <div className="w-10"></div>
        </div>

        {/* Banner Content */}
        <div className="flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-emerald-400/40 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 font-display text-2xl font-bold text-emerald-300 shadow-[0_0_25px_rgba(16,185,129,0.25)]">
              {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h1 className="font-display text-2xl font-bold text-white md:text-3xl">
                  {user?.name || "Campus Member"}
                </h1>
                {user?.role === "admin" && (
                  <span className="rounded-full border border-purple-400/40 bg-purple-500/20 px-2.5 py-0.5 text-[11px] font-mono text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                    🛡️ Administrator
                  </span>
                )}
                <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-mono text-emerald-300">
                  Verified SRM
                </span>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-3 text-xs text-white/50">
                <span>{user?.email}</span>
                <span>•</span>
                <span>{user?.college || "SRMIST"}</span>
                <span>•</span>
                <span>Branch: {user?.branch || "BME"}</span>
                <span>•</span>
                <span>Year: {user?.year || "1"}</span>
              </p>
            </div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/create-listing" className="btn-primary gap-2 text-xs shadow-[0_4px_20px_rgba(16,185,129,0.35)] md:text-sm">
              <Plus size={16} /> Post New Listing
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Interactive macOS Stats Grid */}
      <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="mac-window flex items-center gap-3.5 p-4 border border-white/10 bg-white/[0.03]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
            <Package size={22} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-white">{myListings.length}</div>
            <div className="text-[11px] text-white/50">Your Active Listings</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="mac-window flex items-center gap-3.5 p-4 border border-white/10 bg-white/[0.03]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400">
            <ShoppingBag size={22} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-white">{allListings.length}</div>
            <div className="text-[11px] text-white/50">Campus Marketplace</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="mac-window flex items-center gap-3.5 p-4 border border-white/10 bg-white/[0.03]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
            <Award size={22} />
          </div>
          <div>
            <div className="font-display text-2xl font-bold text-white">{user?.reputation ?? 100}</div>
            <div className="text-[11px] text-white/50">Reputation Score</div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -4, scale: 1.02 }}
          className="mac-window flex items-center gap-3.5 p-4 border border-white/10 bg-white/[0.03]"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15 text-purple-400">
            <Shield size={22} />
          </div>
          <div>
            <div className="font-display text-xl font-bold text-white uppercase">{user?.role || "Student"}</div>
            <div className="text-[11px] text-white/50">Account Status</div>
          </div>
        </motion.div>
      </div>

      {/* Tab Controls & Search Bar */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* macOS Pill Segmented Control */}
        <div className="flex rounded-2xl border border-white/10 bg-black/40 p-1 backdrop-blur-xl">
          <button
            onClick={() => setActiveTab("mine")}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
              activeTab === "mine"
                ? "bg-white/15 text-white shadow-md"
                : "text-white/50 hover:text-white"
            }`}
          >
            My Listings ({myListings.length})
          </button>
          <button
            onClick={() => setActiveTab("all")}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
              activeTab === "all"
                ? "bg-white/15 text-white shadow-md"
                : "text-white/50 hover:text-white"
            }`}
          >
            {user?.role === "admin" ? "🛡️ All Campus Posts (Moderate)" : "All Campus Posts"} ({allListings.length})
          </button>
          <button
            onClick={() => setActiveTab("card")}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all ${
              activeTab === "card"
                ? "bg-white/15 text-white shadow-md"
                : "text-white/50 hover:text-white"
            }`}
          >
            🪪 Campus ID Card
          </button>
        </div>

        {activeTab !== "card" && (
          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              type="text"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/[0.05] py-1.5 pl-9 pr-3 text-xs text-white placeholder-white/40 focus:border-emerald-400 focus:outline-none"
            />
          </div>
        )}
      </div>

      {/* TAB CONTENT: Campus Digital ID Card */}
      {activeTab === "card" && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: "spring", stiffness: 350, damping: 25 }}
          className="mx-auto max-w-md"
        >
          <div className="mac-window relative overflow-hidden border border-emerald-500/30 bg-gradient-to-b from-emerald-950/40 via-black/60 to-black/80 p-8 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
            {/* Holographic Watermark Accent */}
            <div className="pointer-events-none absolute -right-12 -top-12 h-44 w-44 rounded-full bg-emerald-500/10 blur-3xl" />
            <div className="pointer-events-none absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <div className="font-display text-sm font-bold tracking-wider text-emerald-300">
                  SRM INSTITUTE OF SCIENCE & TECHNOLOGY
                </div>
                <div className="text-[10px] font-mono text-white/40">OFFICIAL DIGITAL STUDENT ID</div>
              </div>
              <span className="rounded-md border border-emerald-400/40 bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">
                ACTIVE
              </span>
            </div>

            <div className="my-6 flex items-center gap-5">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-emerald-400/60 bg-gradient-to-br from-emerald-500/30 to-cyan-500/30 font-display text-3xl font-bold text-white shadow-xl">
                {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
              </div>
              <div className="space-y-1">
                <h3 className="font-display text-xl font-bold text-white">{user?.name}</h3>
                <p className="font-mono text-xs text-emerald-400">{user?.email}</p>
                <p className="text-xs text-white/60">
                  {user?.branch || "BME"} • Year {user?.year || "1"}
                </p>
                {user?.role === "admin" && (
                  <p className="text-[11px] font-mono text-purple-300">Role: Campus Admin</p>
                )}
              </div>
            </div>

            <div className="border-t border-white/10 pt-4 flex items-center justify-between text-[11px] text-white/50 font-mono">
              <div>Campus: SRMIST KTR</div>
              <div>Reputation: {user?.reputation ?? 100} PTS</div>
            </div>
          </div>
        </motion.div>
      )}

      {/* TAB CONTENT: Listings (My Listings or All Campus Moderation) */}
      {activeTab !== "card" && (
        <>
          {loading ? (
            <Loader />
          ) : filteredListings.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card my-8 flex flex-col items-center justify-center p-14 text-center border border-white/10"
            >
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-3 text-2xl">
                📦
              </div>
              <h3 className="font-display text-base font-semibold text-white">No listings found</h3>
              <p className="mt-1 text-xs text-white/40 max-w-sm mb-4">
                {searchQuery
                  ? "No matching items for your search filter."
                  : activeTab === "mine"
                  ? "You haven't posted any items or notes for exchange yet."
                  : "No campus listings available at this moment."}
              </p>
              {activeTab === "mine" && (
                <Link to="/create-listing" className="btn-primary text-xs gap-1.5">
                  <Plus size={14} /> Create your first listing
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {filteredListings.map((listing, i) => (
                  <motion.div
                    key={listing._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.35, delay: i * 0.04 }}
                    className="relative group"
                  >
                    <ListingCard listing={listing} />

                    {/* Action Bar overlay for owner or admin */}
                    {(activeTab === "mine" || user?.role === "admin") && (
                      <div className="mt-2 flex items-center justify-between rounded-xl border border-white/10 bg-black/40 p-2 backdrop-blur-xl">
                        <button
                          onClick={() => handleStatusToggle(listing)}
                          className={`rounded-lg px-2.5 py-1 text-[11px] font-mono transition-colors ${
                            listing.status === "active"
                              ? "bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30"
                              : "bg-amber-500/20 text-amber-300 hover:bg-amber-500/30"
                          }`}
                        >
                          {listing.status === "active" ? "Mark Completed" : "Mark Active"}
                        </button>

                        <div className="flex items-center gap-2">
                          <Link
                            to={`/listings/${listing._id}`}
                            className="rounded-lg p-1.5 text-white/50 hover:bg-white/10 hover:text-white"
                            title="View Listing"
                          >
                            <ExternalLink size={14} />
                          </Link>
                          <button
                            onClick={() => handleDelete(listing._id, listing.title)}
                            className="rounded-lg p-1.5 text-red-400/70 hover:bg-red-500/20 hover:text-red-300"
                            title="Delete Listing"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
