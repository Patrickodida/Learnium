import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="border-b bg-white">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" className="w-8 h-8" alt="logo" />
          <span className="font-bold text-lg">Learnium</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link to="/courses" className="hover:text-blue-600">
            Courses
          </Link>
          {user ? (
            <>
              {/* Role-based links */}
              {user.role === "ADMIN" && (
                <Link to="/admin" className="hover:text-blue-600">
                  Admin Panel
                </Link>
              )}

              {user.role === "INSTRUCTOR" && (
                <Link to="/instructor-dashboard" className="hover:text-blue-600">
                  Instructor Dashboard
                </Link>
              )}

              {user.role === "STUDENT" && (
                <Link to="/dashboard" className="hover:text-blue-600">
                  Dashboard
                </Link>
              )}
              
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link
                to="/signup"
                className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
export default Navbar;
