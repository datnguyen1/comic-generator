import { useParams } from 'react-router-dom';

const ComicDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="px-4 py-6 sm:px-0">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Comic Details</h2>
      <div className="bg-white shadow rounded-lg p-6">
        <p className="text-gray-500">Comic ID: {id}</p>
        {/* Comic details will be loaded here */}
      </div>
    </div>
  );
};

export default ComicDetailPage;
