import React from "react";
import "./SearchResult.css";
import SearchCard from "../../component/SearchCard/SearchCard";

function SearchResult() {
  return (
    <div className="search-results">
      <div className="search-show-map"></div>
      <div className="search-center">
        <i>Search Results</i>
        <div className="search-show-result">
          <SearchCard />
          <button>ค้นหาเพิ่มเติม</button>
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
