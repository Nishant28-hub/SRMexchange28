import { Link } from "react-router-dom";
import { MapPin, Eye, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import type { Listing } from "../types";

export default function ListingCard({ listing }: { listing: Listing }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 350, damping: 22 }}
      className="h-full"
    >
      <Link
        to={`/listings/${listing._id}`}
        className="glass-card group flex h-full flex-col overflow-hidden border border-white/10 hover:border-emerald-500/40 transition-colors duration-300"
      >
        {/* Card Image Container with Zoom */}
        <div className="relative flex h-48 w-full items-center justify-center overflow-hidden bg-black/40 text-white/20">
          {listing.images?.[0] ? (
            <img 
              src={listing.images[0]} 
              alt={listing.title} 
              className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" 
            />
          ) : (
            <div className="flex flex-col items-center gap-1">
              <span className="text-2xl opacity-40">📦</span>
              <span className="text-xs text-white/30">No image provided</span>
            </div>
          )}
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          
          {/* Quick Peek Floating Arrow */}
          <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/50 text-white/70 backdrop-blur-md border border-white/15 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-1">
            <ArrowUpRight size={14} className="text-emerald-300" />
          </div>
        </div>

        {/* Card Body */}
        <div className="flex flex-1 flex-col gap-2.5 p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/30 px-3 py-0.5 text-xs font-medium text-emerald-300">
              {listing.category}
            </span>
            <span className="rounded-md bg-white/[0.05] border border-white/10 px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider text-cyan-300">
              {listing.type}
            </span>
          </div>

          <h3 className="line-clamp-1 font-display font-semibold text-white group-hover:text-emerald-300 transition-colors">
            {listing.title}
          </h3>

          <p className="line-clamp-2 text-xs leading-relaxed text-white/50">
            {listing.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3.5 text-sm">
            <span className="font-display font-bold text-base text-emerald-400">
              {listing.price > 0 ? `₹${listing.price}` : "Free"}
            </span>
            <div className="flex items-center gap-3 text-xs text-white/40 font-mono">
              {listing.location && (
                <span className="flex items-center gap-1 text-white/60">
                  <MapPin size={12} className="text-emerald-400/80" />
                  {listing.location}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Eye size={12} />
                {listing.views}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
