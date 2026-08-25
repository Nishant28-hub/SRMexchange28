import { Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 py-12 text-center text-xs text-white/40">
      <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 rounded-full bg-emerald-400"></span>
          <span className="font-display font-semibold text-white/80">RExchange SRM</span>
          <span>• SRM Institute of Science and Technology</span>
        </div>
        <p className="flex items-center gap-1.5 text-white/40">
          Crafted for SRMIST students <Sparkles size={13} className="text-emerald-400" />
        </p>
      </div>
    </footer>
  );
}
