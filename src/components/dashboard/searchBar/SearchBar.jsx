import { FaFilter } from "react-icons/fa";
import "./searchBar.scss";

const SearchBar = () => {
  return (
    <form className="search-bar">
      <div className="filter-box">
        <FaFilter className="filter-icon" />
      </div>
      <input type="text" placeholder="Search..." className="search-input" />
      <button type="submit" className="search-button">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
