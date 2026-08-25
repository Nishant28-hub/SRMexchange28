import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createListingRequest, fetchCategories } from "../api/listings";
import { PlusCircle } from "lucide-react";

const schema = z.object({
  title: z.string().min(3, "Title is too short"),
  description: z.string().min(10, "Description is too short"),
  category: z.string().min(1, "Choose a category"),
  type: z.enum(["sell", "exchange", "donate", "skill", "request"]),
  price: z.coerce.number().min(0).optional(),
  condition: z.enum(["new", "like-new", "good", "fair", "used"]).optional(),
  location: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function CreateListing() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { type: "sell", condition: "good", price: 0 },
  });

  useEffect(() => {
    fetchCategories().then((res) => setCategories(res.categories)).catch(() => {});
  }, []);

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSubmitting(true);
    try {
      const res = await createListingRequest(values);
      navigate(`/listings/${res.listing._id}`);
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        (err?.message === "Network Error" || !err?.response
          ? "Unable to connect to backend server. Please ensure the backend server is running."
          : "Could not create listing");
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
        className="mac-window overflow-hidden"
      >
        {/* macOS Window Titlebar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-black/40 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56] shadow-[0_0_8px_rgba(255,95,86,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e] shadow-[0_0_8px_rgba(255,189,46,0.6)]"></span>
            <span className="h-3 w-3 rounded-full bg-[#27c93f] shadow-[0_0_8px_rgba(39,201,63,0.6)]"></span>
          </div>
          <div className="text-[11px] font-mono text-white/40">srmist.edu.in/create-listing</div>
          <div className="w-10"></div>
        </div>

        <div className="p-8">
          <div className="mb-6">
            <h1 className="font-display text-2xl font-bold text-white">Post a campus listing</h1>
            <p className="text-xs text-white/50">Sell, exchange, donate, offer a skill, or request an item from SRM peers.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input placeholder="Listing Title (e.g. Engineering Maths Book / Bicycle)" className="input-field" {...register("title")} />
              {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
            </div>

            <div>
              <textarea placeholder="Description (condition, details, meetup preference...)" rows={4} className="input-field" {...register("description")} />
              {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <select className="input-field bg-[#0c120f]" {...register("category")}>
                  <option value="">Select Category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <p className="mt-1 text-xs text-red-400">{errors.category.message}</p>}
              </div>
              <select className="input-field bg-[#0c120f]" {...register("type")}>
                <option value="sell">Sell (₹)</option>
                <option value="exchange">Exchange (Trade)</option>
                <option value="donate">Donate (Free)</option>
                <option value="skill">Skill Exchange</option>
                <option value="request">Item Request</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <input type="number" placeholder="Price (0 for free)" className="input-field" {...register("price")} />
              <select className="input-field bg-[#0c120f]" {...register("condition")}>
                <option value="new">Brand New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good Condition</option>
                <option value="fair">Fair Condition</option>
                <option value="used">Heavily Used</option>
              </select>
            </div>

            <input placeholder="Hostel / Campus Block (e.g. SRM KTR Block G, Tech Park)" className="input-field" {...register("location")} />

            {serverError && (
              <motion.div 
                initial={{ opacity: 0, y: -5 }} 
                animate={{ opacity: 1, y: 0 }} 
                className="rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300"
              >
                {serverError}
              </motion.div>
            )}

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit" 
              disabled={submitting} 
              className="btn-primary mt-2 gap-2 text-sm font-semibold disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-black border-t-transparent"></span>
                  Publishing listing...
                </>
              ) : (
                <>
                  <PlusCircle size={16} /> Publish Listing
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
