import { Outlet, NavLink, Link, useLocation } from 'react-router-dom';

const navClass = ({ isActive }) =>
  [
    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
    isActive
      ? 'border-indigo-600 text-gray-900'
      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-800',
  ].join(' ');

const Layout = () => {
  const location = useLocation();
  const onCreate =
    location.pathname === '/comics/create' || location.pathname.startsWith('/comics/create/');

  // Comics highlights for /comics and /comics/:id, but not for /comics/create.
  const comicsClass = ({ isActive }) => navClass({ isActive: isActive && !onCreate });

  return (
    <div className="min-h-screen">
      <nav className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                <span
                  aria-hidden
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 via-violet-600 to-rose-500 text-white shadow"
                >
                  <span className="text-sm font-extrabold">C</span>
                </span>
                <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                  Comic Generator
                </span>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:gap-6">
                <NavLink to="/" end className={navClass}>
                  Home
                </NavLink>
                <NavLink to="/comics" className={comicsClass}>
                  Comics
                </NavLink>
                <NavLink to="/comics/create" className={navClass}>
                  Create
                </NavLink>
                <NavLink to="/guide" className={navClass}>
                  Guide
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="min-h-[calc(100vh-4rem)]">
        <div className="max-w-5xl mx-auto py-8 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
