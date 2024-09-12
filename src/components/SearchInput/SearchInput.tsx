import React, { useState } from 'react';
import { StyledSearchBar } from './SearchInputStyle';

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
      <StyledSearchBar
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search for photos..."
        aria-label="Search for photos"
      />
    </div>
  );
};

export default SearchInput;
