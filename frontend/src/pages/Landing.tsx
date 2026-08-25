import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HandCoins, Recycle, Sparkles, Users, Zap } from "lucide-react";

const stats = [
  { label: "Active Students", value: "2,400+" },
  { label: "Items Exchanged", value: "6,800+" },
  { label: "CO2 Saved (kg)", value: "3,150" },
  { label: "Partner Colleges", value: "12" },
];

const features = [
  { icon: Recycle, title: "Exchange & Donate", desc: "Trade items or give them away instead of letting them gather dust." },
  { icon: BookOpen, title: "Notes & Resources", desc: "Share and discover semester notes, sorted by branch and subject." },
  { icon: Users, title: "Skill Exchange", desc: "Teach a skill, learn a skill — connect with mentors on campus." },
  { icon: Sparkles, title: "AI Recommendations", desc: "Get matched with listings, notes and people relevant to you." },
  { icon: HandCoins, title: "Opportunity Board", desc: "Internships, referrals, hackathon teams and events in one place." },
  { icon: Zap, title: "Verified & Trusted", desc: "Every account is verified with a college email, kept within your campus." },
];

const testimonials = [
  { name: "Ananya R.", role: "Final Year, CSE", quote: "Sold three textbooks and found my hackathon team here in the same week." },
  { name: "Rehan K.", role: "Second Year, ECE", quote: "The notes section alone got me through my exams." },
  { name: "Priya S.", role: "Third Year, Design", quote: "Loved how easy it was to give away stuff before I moved hostels." },
];

export default function Landing() {
  return (
    <div className="mx-auto max-w-7xl px-6">
      <section className="flex flex-col items-center gap-6 py-24 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs text-emerald-400 font-medium"
        >
          🎓 Exclusively for SRM Institute of Science and Technology (SRMIST)
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="max-w-3xl font-display text-4xl font-bold leading-tight md:text-6xl"
        >
          Exchange More.{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Waste Less.
          </span>{" "}
          Grow Together at SRM.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-xl text-white/60"
        >
          RExchange SRM is the campus marketplace where verified SRMIST students trade items,
          skills, notes and opportunities — all within our trusted campus community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Link to="/register" className="btn-primary gap-2">
            Join your campus <ArrowRight size={16} />
          </Link>
          <Link to="/marketplace" className="btn-outline">Browse Marketplace</Link>
        </motion.div>
      </section>

      <section className="grid grid-cols-2 gap-4 pb-20 md:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="glass-card p-6 text-center">
            <p className="font-display text-2xl font-bold text-white md:text-3xl">{s.value}</p>
            <p className="mt-1 text-xs text-white/50">{s.label}</p>
          </div>
        ))}
      </section>

      <section className="pb-24">
        <h2 className="mb-10 text-center font-display text-3xl font-semibold">Everything your campus needs</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="glass-card p-6">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <f.icon size={20} />
              </div>
              <h3 className="mb-2 font-medium">{f.title}</h3>
              <p className="text-sm text-white/50">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="pb-24">
        <h2 className="mb-10 text-center font-display text-3xl font-semibold">What students are saying</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.name} className="glass-card p-6">
              <p className="text-sm text-white/70">&ldquo;{t.quote}&rdquo;</p>
              <p className="mt-4 text-sm font-medium">{t.name}</p>
              <p className="text-xs text-white/40">{t.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
