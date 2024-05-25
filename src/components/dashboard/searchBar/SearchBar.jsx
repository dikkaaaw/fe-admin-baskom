import { useState } from "react";
import { MdOutlineSearch } from "react-icons/md";
import { FaFilter } from "react-icons/fa";
import "./searchBar.scss";

const SearchBar = ({ onSearch, onFilter }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
  };

  const handleFilterClick = () => {
    if (onFilter) {
      onFilter();
    }
  };

  return (
    <form className="search-bar" onSubmit={handleSubmit}>
      <div className="filter-box" onClick={handleFilterClick}>
        <FaFilter className="filter-icon" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        className="search-input"
      />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
