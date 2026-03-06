import { Outlet, Link } from "react-router-dom";
import { useState } from "react";

const Layout = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex justify-between h-16 items-center">

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Comic Generator
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex md:space-x-8">
              <Link
                to="/"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm font-medium"
              >
                Home
              </Link>

              <Link
                to="/comics"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm font-medium"
              >
                Comics
              </Link>

              <Link
                to="/comics/create"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm font-medium"
              >
                Create
              </Link>

              <Link
                to="/manga-ai"
                className="text-gray-500 hover:text-gray-700 inline-flex items-center text-sm font-medium"
              >
                Manga AI
              </Link>
            </div>

            {/* Hamburger Button */}
            <div className="flex items-center md:hidden">
              <button
                onClick={() => setOpen(!open)}
                className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

          </div>

          {/* Mobile Menu */}
          {open && (
            <div className="md:hidden pb-3 space-y-1">
              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Home
              </Link>

              <Link
                to="/comics"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Comics
              </Link>

              <Link
                to="/comics/create"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Create
              </Link>

              <Link
                to="/manga-ai"
                onClick={() => setOpen(false)}
                className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
              >
                Manga AI
              </Link>
            </div>
          )}

        </div>
      </nav>

      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;