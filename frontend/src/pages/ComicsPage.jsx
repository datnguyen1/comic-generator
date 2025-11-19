const ComicsPage = () => {
  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Comics</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {/* Comics will be loaded here */}
        <div className="text-center py-12 col-span-full">
          <p className="text-gray-500">No comics yet. Create your first comic!</p>
        </div>
      </div>
    </div>
  );
};

export default ComicsPage;
