const HomePage = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Welcome to Comic Generator
        </h2>
        <p className="text-xl text-gray-600 mb-8">
          Create amazing comics with ease
        </p>
        <div className="flex justify-center gap-4">
          <a
            href="/comics/create"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Get Started
          </a>
          <a
            href="/comics"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            View Comics
          </a>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
