import { Outlet, NavLink, Link } from 'react-router-dom';

const navClass = ({ isActive }) =>
  [
    'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors',
    isActive
      ? 'border-blue-600 text-gray-900'
      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
  ].join(' ');

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <Link to="/" className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-gray-900 tracking-tight">Comic Generator</span>
              </Link>
              <div className="hidden sm:ml-8 sm:flex sm:gap-6">
                <NavLink to="/" end className={navClass}>
                  Home
                </NavLink>
                <NavLink to="/comics" className={navClass}>
                  Comics
                </NavLink>
                <NavLink to="/comics/create" className={navClass}>
                  Create
                </NavLink>
                <NavLink to="/manga-ai" className={navClass}>
                  Manga AI
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
