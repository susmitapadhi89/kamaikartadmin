const UserProfileCard = ({ userData }) => {
  return (
    <div className="bg-white   p-6">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between">
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-xl lg:text-xl font-bold text-gray-900 mb-1">
                User ID {userData.id}
              </h1>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {userData.driverId}
                </span>
                Joined at: {userData.joinDate}
              </p>
            </div>
            <div className="hidden lg:flex items-center space-x-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>

          {/* <div className="border-l-4 border-blue-500 pl-4 py-1">
            <h2 className="text-xl font-semibold text-gray-800">
              {userData.name}
            </h2>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-gray-600 mt-1">
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                {userData.email}
              </span>
              <span className="hidden sm:block text-gray-300">•</span>
              <span className="flex items-center gap-2">
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                {userData.phone}
              </span>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default UserProfileCard;
