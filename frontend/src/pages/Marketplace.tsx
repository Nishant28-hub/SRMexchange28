import { useEffect, useState } from "react";
import { fetchListings, fetchCategories, type ListingFilters } from "../api/listings";
import type { Listing } from "../types";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { Search } from "lucide-react";

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
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Marketplace</h1>
          <p className="text-sm text-white/50">Browse what your campus is offering right now.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            setFilters((f) => ({ ...f, search: searchInput }));
          }}
          className="flex items-center gap-2"
        >
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
            <input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search listings..."
              className="input-field pl-9"
            />
          </div>
        </form>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        <button
          onClick={() => setFilters((f) => ({ ...f, category: undefined }))}
          className={`rounded-full px-3 py-1 text-xs ${!filters.category ? "bg-emerald-500 text-black" : "glass text-white/60"}`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilters((f) => ({ ...f, category: c }))}
            className={`rounded-full px-3 py-1 text-xs ${filters.category === c ? "bg-emerald-500 text-black" : "glass text-white/60"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <p className="py-20 text-center text-white/40">No listings found. Be the first to post one.</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </div>
      )}
    </div>
  );
}
