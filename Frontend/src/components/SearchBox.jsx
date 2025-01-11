import React from 'react';

const SearchBox = ({ searchTerm, handleSearch }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        placeholder="Search Users"
        value={searchTerm}
        onChange={(event) => handleSearch(event.target.value)} // Pass the input value
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
    </div>
  );
};

export default SearchBox;
