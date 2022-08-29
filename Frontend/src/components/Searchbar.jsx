import React from "react";

const SearchBar = () => {
  return (
    <div className="relative w-124 h-12 input-main">
      <input
        type="text"
        className="w-full h-full px-7 py-4 outline-none"
        placeholder="Search for Videos"
      />
    </div>
  );
};

export default SearchBar;
