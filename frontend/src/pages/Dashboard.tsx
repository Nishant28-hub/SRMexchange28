import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { fetchMyListings } from "../api/listings";
import type { Listing } from "../types";
import ListingCard from "../components/ListingCard";
import Loader from "../components/Loader";
import { Plus } from "lucide-react";

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
      <div className="glass-card mb-10 flex flex-col gap-6 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold">Welcome back, {user?.name.split(" ")[0]}</h1>
          <p className="text-sm text-white/50">{user?.college || "Your campus"} · Reputation {user?.reputation ?? 0}</p>
        </div>
        <Link to="/create-listing" className="btn-primary gap-2">
          <Plus size={16} /> New Listing
        </Link>
      </div>

      <h2 className="mb-4 text-lg font-medium">Your listings</h2>

      {loading ? (
        <Loader />
      ) : listings.length === 0 ? (
        <p className="py-16 text-center text-white/40">You haven't posted anything yet.</p>
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
