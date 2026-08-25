import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
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
      <div className="glass-card p-8">
        <h1 className="mb-1 font-display text-2xl font-semibold">Create your account</h1>
        <p className="mb-6 text-sm text-white/50">Use your verified SRM email (@srmist.edu.in) to join.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <input placeholder="Full name" className="input-field" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>
          <div>
            <input placeholder="College email (e.g. name@srmist.edu.in)" className="input-field" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>
          <div>
            <input type="password" placeholder="Password (min 6 characters)" className="input-field" {...register("password")} />
            {errors.password && <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="College / Campus (e.g. SRMIST KTR)" defaultValue="SRMIST" className="input-field" {...register("college")} />
            <input placeholder="Branch (e.g. CSE / Biomed)" className="input-field" {...register("branch")} />
          </div>
          <input placeholder="Year of Study (e.g. 1st Year)" className="input-field" {...register("year")} />

          {serverError && <p className="text-sm text-red-400">{serverError}</p>}

          <button type="submit" disabled={submitting} className="btn-primary mt-2 disabled:opacity-60">
            {submitting ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-white/50">
          Already have an account? <Link to="/login" className="text-emerald-400">Log in</Link>
        </p>
      </div>
    </div>
  );
}
