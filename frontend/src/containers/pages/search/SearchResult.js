import React from "react";
import "./SearchResult.css";
import SearchCard from "../../component/SearchCard/SearchCard";

function SearchResult() {
  return (
    <div>
      <div className="show-map"></div>
      <div className="show-result">
        <i>Search Results</i>
      </div>
      <SearchCard />
    </div>
  );
}

export default SearchResult;
