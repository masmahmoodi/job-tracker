import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(e) {
    setForm((preForm) => {
      return { ...preForm, [e.target.name]: e.target.value };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://127.0.0.1:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to login");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setForm({ email: "", password: "" });
      navigate("/applications");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-8rem)] max-w-6xl items-center">
      <div className="grid w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/45 shadow-2xl shadow-black/30 backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]">
        <div className="hidden border-r border-white/10 bg-gradient-to-br from-amber-300/10 via-black to-black p-10 lg:flex lg:flex-col lg:justify-between">
          <div className="space-y-6">
            <img src={logo} alt="Sharks logo" className="h-24 w-24 object-contain" />
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-200/70">
                Sharks Tracker
              </p>
              <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white">
                Stay sharp through every application round.
              </h1>
            </div>
          </div>
          <p className="max-w-md text-lg leading-8 text-stone-300">
            A focused dashboard for serious job searching. Track roles, keep notes, and
            move through your pipeline with confidence.
          </p>
        </div>

        <div className="p-6 sm:p-10 lg:p-12">
          <div className="mx-auto max-w-md">
            <p className="text-sm font-semibold uppercase tracking-[0.35em] text-amber-200/70">
              Login
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight text-white">
              Welcome back
            </h2>
            <p className="mt-3 text-stone-400">
              Sign in to manage your applications and keep your pipeline moving.
            </p>

            <form onSubmit={handleSubmit} className="mt-10 space-y-5">
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
                value="Login"
                className="w-full cursor-pointer rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 px-6 py-3 font-semibold text-black transition hover:scale-[1.01] hover:shadow-lg hover:shadow-amber-300/20"
              />
            </form>

            <p className="mt-6 text-sm text-stone-400">
              New here?{" "}
              <Link to="/signup" className="font-medium text-amber-200 transition hover:text-amber-100">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
