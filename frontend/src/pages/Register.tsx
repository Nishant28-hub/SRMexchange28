import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const schema = z.object({
  name: z.string().min(2, "Name is too short"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  college: z.string().optional(),
  branch: z.string().optional(),
  year: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = async (values: FormValues) => {
    setServerError(null);
    setSubmitting(true);
    try {
      await registerUser(values);
      navigate("/dashboard");
    } catch (err: any) {
      const message =
        err?.response?.data?.message ||
        (err?.message === "Network Error" || !err?.response
          ? "Unable to connect to backend server. Please ensure the backend server is running."
          : "Something went wrong");
      setServerError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6 py-12">
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
          <div className="text-[11px] font-mono text-white/40">srmist.edu.in/signup</div>
          <div className="w-10"></div>
        </div>

        <div className="p-8">
          <h1 className="mb-1 font-display text-2xl font-bold text-white">Create your account</h1>
          <p className="mb-6 text-xs leading-relaxed text-white/50">
            Sign up to buy, sell, exchange and connect on campus.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <input placeholder="Full name" className="input-field" {...register("name")} />
              {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
            </div>
            <div>
              <input placeholder="Email address (college or personal)" className="input-field" {...register("email")} />
              {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
            </div>
            <div>
              <input type="password" placeholder="Password (min 6 characters)" className="input-field" {...register("password")} />
              {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input placeholder="College / Campus (e.g. SRMIST)" defaultValue="SRMIST" className="input-field" {...register("college")} />
              <input placeholder="Branch (e.g. CSE / Biomed)" className="input-field" {...register("branch")} />
            </div>
            <input placeholder="Year of Study (e.g. 1st Year)" className="input-field" {...register("year")} />

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
                  Creating account...
                </>
              ) : (
                <>
                  Create account <ArrowRight size={15} />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-6 text-center text-xs text-white/50">
            Already have an account? <Link to="/login" className="text-emerald-400 font-medium hover:underline">Log in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
