import { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx"

import logo from "../assets/logo.png";

export default function SignupPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/applications" replace />
  }

  function handleChange(e) {
    setForm((preForm) => {
      return { ...preForm, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to signup");
      }

      setForm({ name: "", email: "", password: "" });
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center">
      <div className="grid w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/45 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[0.95fr_1.05fr]">
        <div className="hidden border-r border-white/10 bg-gradient-to-br from-black via-black to-amber-300/10 p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <img src={logo} alt="Sharks logo" className="h-24 w-24 object-contain" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200/70">
                Build Your System
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
                Turn your search into a repeatable process.
              </h1>
            </div>
          </div>
          <p className="max-w-md text-lg leading-8 text-stone-300">
            Create your account and start tracking companies, roles, notes, and next moves
            in one focused workspace.
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">
              Sign Up
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Create your account
            </h2>
            <p className="mt-3 text-stone-400">
              Set up your dashboard and start tracking opportunities the professional way.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
              <div>
                <label className="mb-2 block text-sm font-medium text-stone-200">Name</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-200">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-stone-200">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-amber-300/50 focus:ring-2 focus:ring-amber-200/20"
                />
              </div>

              {error && (
                <p className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                  {error}
                </p>
              )}

              <input
                type="submit"
                value="Create Account"
                className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 px-6 py-3 font-semibold text-black transition hover:scale-[1.01] hover:shadow-lg hover:shadow-amber-300/20"
              />
            </form>

            <p className="mt-6 text-sm text-stone-400">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-amber-200 transition hover:text-amber-100">
                Log in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
