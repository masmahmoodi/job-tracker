import { Link, NavLink, useNavigate } from "react-router-dom"
import {useAuth} from "../context/AuthContext.jsx"


import logo from "../assets/logo.png"

export default function Navbar() {
  const navigate = useNavigate()
  const {token, user, logout} = useAuth()


  function handleLogout() {
    logout()
    navigate("/login")
  }

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-3 py-2 text-center text-sm font-medium transition sm:px-4 ${
      isActive
        ? "bg-amber-300/15 text-amber-200 ring-1 ring-amber-200/30"
        : "text-stone-300 hover:bg-white/5 hover:text-white"
    }`

  return (
    <header className="sticky top-0 z-30 pt-4">
      <div className="rounded-[2rem] border border-white/10 bg-black/55 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-xl sm:px-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Link
            to={token ? "/applications" : "/login"}
            className="flex items-start gap-3 sm:items-center"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-200/15 via-amber-400/10 to-amber-700/15 ring-1 ring-amber-200/25">
              <img src={logo} alt="Sharks logo" className="h-11 w-11 object-contain" />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-amber-200/70">
                Sharks Tracker
              </p>
              <p className="max-w-[14rem] text-base font-semibold leading-tight text-white sm:max-w-none sm:text-lg lg:text-xl">
                Organize job applications and compare resumes to roles
              </p>
            </div>
          </Link>

          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
            <nav className="grid grid-cols-1 gap-2 xs:grid-cols-2 sm:flex sm:flex-wrap sm:items-center">
              {token ? (
                <>
                  <NavLink to="/applications" className={navLinkClass}>
                    Dashboard
                  </NavLink>
                  <NavLink to="/applications/create" className={navLinkClass}>
                    New Application
                  </NavLink>
                </>
              ) : (
                <>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/signup" className={navLinkClass}>
                    Sign Up
                  </NavLink>
                </>
              )}
            </nav>

            {token && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="hidden min-w-[190px] rounded-3xl border border-white/10 bg-white/5 px-4 py-3 text-left md:block">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-stone-400">
                    Active User
                  </p>
                  <p className="mt-1 truncate text-sm font-medium text-amber-100">
                    {user?.name || user?.email || "Signed in"}
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-full bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:scale-[1.02] hover:shadow-lg hover:shadow-amber-300/20 sm:w-auto"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
