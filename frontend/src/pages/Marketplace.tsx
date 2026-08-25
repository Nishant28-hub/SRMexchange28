import { useEffect, useState } from "react";
import { fetchListings, fetchCategories, type ListingFilters } from "../api/listings";
import type { Listing } from "../types";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { Search, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Marketplace() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<ListingFilters>({});
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.categories)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    fetchListings(filters)
      .then((res) => setListings(res.listings))
      .finally(() => setLoading(false));
  }, [filters]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header & Search */}
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-1">
            <Sparkles size={13} />
            <span>Live Campus Catalog</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-white">Campus Marketplace</h1>
          <p className="text-sm text-white/50">Browse verified listings available at SRMIST right now.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilters((f) => ({ ...f, search: searchInput }));
          }}
          className="flex items-center gap-2"
        >
          <div className="relative w-full sm:w-72">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value);
                if (e.target.value === "") {
                  setFilters((f) => ({ ...f, search: undefined }));
                }
              }}
              placeholder="Search books, gadgets, notes..."
              className="input-field pl-10 text-xs"
            />
          </div>
        </form>
      </div>

      {/* macOS Pill Filter Bar */}
      <div className="mb-8 flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl w-fit">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setFilters((f) => ({ ...f, category: undefined }))}
          className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
            !filters.category
              ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
              : "text-white/60 hover:text-white hover:bg-white/[0.05]"
          }`}
        >
          All
        </motion.button>
        {categories.map((c) => (
          <motion.button
            key={c}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilters((f) => ({ ...f, category: c }))}
            className={`rounded-xl px-4 py-1.5 text-xs font-medium transition-all duration-200 ${
              filters.category === c
                ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                : "text-white/60 hover:text-white hover:bg-white/[0.05]"
            }`}
          >
            {c}
          </motion.button>
        ))}
      </div>

      {/* Listings Grid */}
      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card my-12 flex flex-col items-center justify-center p-16 text-center border border-white/10"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 mb-4 text-2xl">
            🏷️
          </div>
          <h3 className="font-display text-lg font-semibold text-white">No listings found</h3>
          <p className="mt-1 text-xs text-white/40 max-w-sm">No one has posted an item matching this category yet. Be the first on campus!</p>
        </motion.div>
      ) : (
        <motion.div 
          layout
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
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
