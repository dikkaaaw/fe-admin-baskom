import { PropTypes } from "prop-types";
import { FaFilter } from "react-icons/fa";
import "./searchBar.scss";

const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <form className="search-bar" onSubmit={(e) => e.preventDefault()}>
      <div className="filter-box">
        <FaFilter className="filter-icon" />
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="search-input"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </form>
  );
};

SearchBar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.string.isRequired,
};

export default SearchBar;
