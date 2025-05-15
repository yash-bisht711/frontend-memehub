import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

function Navigation() {
  const location = useLocation();

  const navItems = [
    { name: "Feed", path: "/" },
    { name: "Create Meme", path: "/create" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const authButtons = [
    { name: "Login", path: "/login" },
    { name: "Register", path: "/register" },
  ];

  return (
    <nav className="bg-white dark:bg-zinc-900 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-blue-600">
          MemeHub 🚀
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`text-sm font-medium ${
                location.pathname === item.path
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-4">
          {authButtons.map((btn) => (
            <Link
              key={btn.path}
              to={btn.path}
              className="px-4 py-1 rounded-md border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition"
            >
              {btn.name}
            </Link>
          ))}
        </div>

        <div className="md:hidden">
          <Menu className="w-6 h-6 text-gray-600 dark:text-gray-300" />
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
