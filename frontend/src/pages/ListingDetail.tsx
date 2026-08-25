import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchListingById } from "../api/listings";
import type { Listing } from "../types";
import Loader from "../components/Loader";
import { MapPin, Eye } from "lucide-react";

export default function ListingDetail() {
  const { id } = useParams<{ id: string }>();
  const [listing, setListing] = useState<Listing | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetchListingById(id)
      .then((res) => setListing(res.listing))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader />;
  if (!listing) return <p className="py-20 text-center text-white/40">Listing not found.</p>;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link to="/marketplace" className="text-sm text-white/50 hover:text-white">← Back to Marketplace</Link>

      <div className="glass-card mt-4 grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
        <div className="flex h-64 items-center justify-center rounded-xl bg-white/5">
          {listing.images?.[0] ? (
            <img src={listing.images[0]} alt={listing.title} className="h-full w-full rounded-xl object-cover" />
          ) : (
            <span className="text-sm text-white/30">No image available</span>
          )}
        </div>

        <div>
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400">
            {listing.category}
          </span>
          <h1 className="mt-3 font-display text-2xl font-semibold">{listing.title}</h1>
          <p className="mt-2 text-2xl font-bold">
            {listing.price > 0 ? `₹${listing.price}` : "Free"}
          </p>
          <p className="mt-4 text-sm text-white/60">{listing.description}</p>

          <div className="mt-6 flex items-center gap-4 text-xs text-white/40">
            {listing.location && <span className="flex items-center gap-1"><MapPin size={12} />{listing.location}</span>}
            <span className="flex items-center gap-1"><Eye size={12} />{listing.views} views</span>
          </div>

          <div className="mt-6 border-t border-white/10 pt-6">
            <p className="text-sm text-white/50">Posted by</p>
            <p className="font-medium">{listing.owner.name}</p>
            {listing.owner.college && <p className="text-xs text-white/40">{listing.owner.college}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
