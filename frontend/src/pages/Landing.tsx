import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, HandCoins, Recycle, Sparkles, Users, Zap, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Active Students", value: "2,400+", change: "+18% this month" },
  { label: "Items Exchanged", value: "6,800+", change: "Saved ₹14L+" },
  { label: "CO2 Saved (kg)", value: "3,150", change: "Campus Green Goal" },
  { label: "Partner Hostels", value: "18", change: "KTR & RMP" },
];

const features = [
  { icon: Recycle, title: "Exchange & Donate", desc: "Trade items or give them away instead of letting them gather dust in your hostel room." },
  { icon: BookOpen, title: "Notes & Resources", desc: "Share and discover semester notes, sorted cleanly by branch, cycle and subject code." },
  { icon: Users, title: "Skill Exchange", desc: "Teach a skill, learn a skill — connect with coders, designers, and mentors on campus." },
  { icon: Sparkles, title: "AI Recommendations", desc: "Get matched with listings, notes and peers relevant to your department and year." },
  { icon: HandCoins, title: "Opportunity Board", desc: "Internships, referrals, hackathon teammates and campus club events in one hub." },
  { icon: Zap, title: "Verified & Safe", desc: "Every account is strictly verified with @srmist.edu.in email for 100% peer trust." },
];

const testimonials = [
  { name: "Ananya R.", role: "Final Year, CSE", quote: "Sold three textbooks and found my hackathon team here in the same week." },
  { name: "Rehan K.", role: "Second Year, ECE", quote: "The notes section alone got me through my semester exams without panic." },
  { name: "Priya S.", role: "Third Year, Biomed", quote: "Loved how easy it was to give away lab coats and calculators before shifting rooms." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 350, damping: 25 },
  },
};

export default function Landing() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-12">
      {/* Hero Section */}
      <motion.section 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center gap-6 py-16 text-center"
      >
        {/* macOS Floating Pill Badge */}
        <motion.div variants={itemVariants} className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs text-emerald-300 backdrop-blur-xl shadow-[0_0_25px_rgba(16,185,129,0.2)]">
          <ShieldCheck size={14} className="text-emerald-400" />
          <span>Exclusively for verified <strong>@srmist.edu.in</strong> students</span>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          variants={itemVariants}
          className="max-w-3xl font-display text-4xl font-extrabold tracking-tight sm:text-6xl md:text-7xl"
        >
          Exchange More.{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Waste Less.
          </span>{" "}
          Grow at SRM.
        </motion.h1>

        {/* Hero Subtitle */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl text-base leading-relaxed text-white/60 sm:text-lg"
        >
          The official campus circular economy for SRMIST students. Trade textbooks, lab gear, tech gadgets, cycle passes and semester notes in a verified circle.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4 pt-2"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/register" className="btn-primary gap-2 px-7 py-3 text-sm font-semibold shadow-[0_8px_30px_rgba(16,185,129,0.35)]">
              Join your campus <ArrowRight size={16} />
            </Link>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link to="/marketplace" className="btn-outline px-6 py-3 text-sm">
              Browse Marketplace
            </Link>
          </motion.div>
        </motion.div>

        {/* macOS Window Interactive Showcase Mockup */}
        <motion.div 
          variants={itemVariants}
          className="mac-window mt-12 w-full max-w-4xl overflow-hidden p-1 shadow-[0_30px_100px_rgba(0,0,0,0.8)]"
        >
          {/* macOS Titlebar */}
          <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]"></span>
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]"></span>
              <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span>
            </div>
            <div className="rounded-md bg-white/[0.05] border border-white/10 px-3 py-0.5 text-xs text-white/50 font-mono">
              rexchange-srmist.internal/live-feed
            </div>
            <div className="w-12"></div>
          </div>

          {/* Window Body with Micro Cards */}
          <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3 bg-black/20 text-left">
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:bg-white/[0.06] hover:border-emerald-500/40">
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">LIVE OFFER</span>
              <p className="mt-2 text-sm font-semibold text-white">Engineering Mechanics & Maths Notes</p>
              <p className="mt-1 text-xs text-white/40">Hostel Block G • Free donation</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:bg-white/[0.06] hover:border-cyan-500/40">
              <span className="rounded bg-cyan-500/20 px-2 py-0.5 text-[10px] font-mono text-cyan-300">EXCHANGE</span>
              <p className="mt-2 text-sm font-semibold text-white">Casio fx-991EX ClassWiz Calc</p>
              <p className="mt-1 text-xs text-white/40">Biomed Branch • Trade for Arduino</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-md transition-all hover:bg-white/[0.06] hover:border-emerald-500/40">
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-300">PEER SKILL</span>
              <p className="mt-2 text-sm font-semibold text-white">Full Stack React / Node Mentorship</p>
              <p className="mt-1 text-xs text-white/40">Tech Park 6th Floor • Free</p>
            </div>
          </div>
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 gap-4 pb-20 md:grid-cols-4"
      >
        {stats.map((s) => (
          <motion.div 
            key={s.label} 
            whileHover={{ y: -5, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="glass-card p-6 text-center border border-white/10"
          >
            <p className="font-display text-3xl font-extrabold text-white md:text-4xl">{s.value}</p>
            <p className="mt-1 text-xs font-medium text-white/60">{s.label}</p>
            <span className="mt-2 inline-block text-[10px] text-emerald-400/80 font-mono">{s.change}</span>
          </motion.div>
        ))}
      </motion.section>

      {/* Features Section */}
      <section className="pb-24">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-mono">CAMPUS ECOSYSTEM</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl text-white">Everything SRM students need</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div 
              key={f.title} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-card p-7 border border-white/10 group"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 transition-all duration-300 group-hover:scale-110 group-hover:bg-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <f.icon size={22} />
              </div>
              <h3 className="mb-2 font-display text-lg font-semibold text-white group-hover:text-emerald-300 transition-colors">{f.title}</h3>
              <p className="text-sm leading-relaxed text-white/50">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="pb-24">
        <div className="mb-12 text-center">
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-mono">STUDENT VOICES</span>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight md:text-4xl text-white">What peers are saying</h2>
        </div>
        
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.name} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="glass-card p-7 border border-white/10 relative"
            >
              <span className="text-3xl text-emerald-400/30 leading-none">&ldquo;</span>
              <p className="text-sm leading-relaxed text-white/80 italic mt-1">{t.quote}</p>
              <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-white">{t.name}</p>
                  <p className="text-xs text-white/40">{t.role}</p>
                </div>
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] text-emerald-300 font-mono">Verified</span>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
