import { Link } from "react-router-dom";
import { MapPin, Eye } from "lucide-react";
import type { Listing } from "../types";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <Link
      to={`/listings/${listing._id}`}
      className="glass-card group flex flex-col overflow-hidden transition hover:-translate-y-1"
    >
      <div className="flex h-40 items-center justify-center bg-white/5 text-white/20">
        {listing.images?.[0] ? (
          <img src={listing.images[0]} alt={listing.title} className="h-full w-full object-cover" />
        ) : (
          <span className="text-xs">No image</span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-xs text-emerald-400">
            {listing.category}
          </span>
          <span className="text-xs uppercase tracking-wide text-cyan-400">{listing.type}</span>
        </div>
        <h3 className="line-clamp-1 font-medium text-white">{listing.title}</h3>
        <p className="line-clamp-2 text-sm text-white/50">{listing.description}</p>
        <div className="mt-auto flex items-center justify-between pt-2 text-sm">
          <span className="font-semibold text-white">
            {listing.price > 0 ? `₹${listing.price}` : "Free"}
          </span>
          <div className="flex items-center gap-3 text-xs text-white/40">
            {listing.location && (
              <span className="flex items-center gap-1"><MapPin size={12} />{listing.location}</span>
            )}
            <span className="flex items-center gap-1"><Eye size={12} />{listing.views}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
