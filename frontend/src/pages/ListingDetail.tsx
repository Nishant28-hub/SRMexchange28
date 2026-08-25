import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fetchListingById } from "../api/listings";
import type { Listing } from "../types";
import Loader from "../components/Loader";
import { MapPin, Eye, ArrowLeft, Mail, ShieldCheck } from "lucide-react";

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
      <Link to="/marketplace" className="inline-flex items-center gap-2 text-xs text-white/50 hover:text-emerald-300 transition-colors mb-4">
        <ArrowLeft size={14} /> Back to Marketplace
      </Link>

      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="mac-window overflow-hidden"
      >
        {/* macOS Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span>
          </div>
          <div className="text-[11px] font-mono text-white/40">srmist.edu.in/listings/{listing._id.slice(-6)}</div>
          <div className="w-10"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 p-8 md:grid-cols-2">
          {/* Image Showcase */}
          <div className="flex min-h-72 items-center justify-center rounded-2xl bg-black/40 border border-white/10 overflow-hidden relative group">
            {listing.images?.[0] ? (
              <img 
                src={listing.images[0]} 
                alt={listing.title} 
                className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105" 
              />
            ) : (
              <div className="flex flex-col items-center gap-2 text-white/30">
                <span className="text-4xl opacity-40">📦</span>
                <span className="text-xs">No image provided</span>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-xs text-emerald-300 font-medium">
                  {listing.category}
                </span>
                <span className="rounded-md bg-white/[0.05] border border-white/10 px-2 py-0.5 text-[10px] font-mono uppercase text-cyan-300">
                  {listing.type}
                </span>
              </div>

              <h1 className="mt-4 font-display text-2xl font-bold text-white">{listing.title}</h1>
              
              <p className="mt-2 font-display text-3xl font-extrabold text-emerald-400">
                {listing.price > 0 ? `₹${listing.price}` : "Free"}
              </p>

              <p className="mt-4 text-sm leading-relaxed text-white/70">{listing.description}</p>

              <div className="mt-6 flex items-center gap-4 text-xs text-white/40 font-mono">
                {listing.location && (
                  <span className="flex items-center gap-1 text-white/60">
                    <MapPin size={13} className="text-emerald-400" /> {listing.location}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Eye size={13} /> {listing.views} views
                </span>
              </div>
            </div>

            {/* Owner Details & Contact Card */}
            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-wider text-white/40 font-mono">Listed by</p>
                  <p className="font-semibold text-white text-base mt-0.5">{listing.owner.name}</p>
                  <p className="text-xs text-white/50">{listing.owner.college || "SRMIST"}</p>
                </div>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 text-[11px] text-emerald-300 font-mono">
                  <ShieldCheck size={13} /> Verified
                </span>
              </div>

              <div className="mt-5 flex gap-3">
                <a 
                  href={`mailto:${listing.owner.email}?subject=Interested in your RExchange listing: ${encodeURIComponent(listing.title)}`}
                  className="btn-primary flex-1 gap-2 text-xs font-semibold"
                >
                  <Mail size={14} /> Contact via College Email
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
