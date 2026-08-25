import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createListingRequest, fetchCategories } from "../api/listings";

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
      <div className="glass-card p-8">
        <h1 className="mb-1 font-display text-2xl font-semibold">Post a listing</h1>
        <p className="mb-6 text-sm text-white/50">Sell, exchange, donate, offer a skill, or request something.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input placeholder="Title" className="input-field" {...register("title")} />
            {errors.title && <p className="mt-1 text-xs text-red-400">{errors.title.message}</p>}
          </div>

          <div>
            <textarea placeholder="Description" rows={4} className="input-field" {...register("description")} />
            {errors.description && <p className="mt-1 text-xs text-red-400">{errors.description.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="input-field" {...register("category")}>
              <option value="">Category</option>
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select className="input-field" {...register("type")}>
              <option value="sell">Sell</option>
              <option value="exchange">Exchange</option>
              <option value="donate">Donate</option>
              <option value="skill">Skill</option>
              <option value="request">Request</option>
            </select>
          </div>
          {errors.category && <p className="text-xs text-red-400">{errors.category.message}</p>}

          <div className="grid grid-cols-2 gap-3">
            <input type="number" placeholder="Price (0 for free)" className="input-field" {...register("price")} />
            <select className="input-field" {...register("condition")}>
              <option value="new">New</option>
              <option value="like-new">Like New</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="used">Used</option>
            </select>
          </div>

          <input placeholder="Location (e.g. Hostel Block C)" className="input-field" {...register("location")} />

          {serverError && <p className="text-sm text-red-400">{serverError}</p>}

          <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
            {submitting ? "Posting..." : "Post listing"}
          </button>
        </form>
      </div>
    </div>
  );
}
