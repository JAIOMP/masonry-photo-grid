import React, { useState } from 'react';
import './SearchInput.css';

interface SearchInputProps {
  onSearch: (query: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        className="search-bar"
        onChange={handleInputChange}
        placeholder="Search for photos..."
        aria-label="Search for photos"
      />
    </div>
  );
};

export default SearchInput;
