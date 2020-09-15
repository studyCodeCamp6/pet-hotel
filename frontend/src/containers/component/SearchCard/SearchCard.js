import React from "react";
import { Rate } from "antd";
import "./SearchCard.css";

function SearchCard() {
  return (
    <div className="cards-component">
      <div className="cards-content">
        <b>Cat & Dog</b>
        <Rate
          disabled
          defaultValue={2}
          className="show-rate"
          style={{ marginTop: "-5px", color: "#F6D04A" }}
        />
        <p>198 ซอยจุฬา 11 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กทม 10330</p>
        <div className="show-price-Day">
          <p>Price (Dog/Day)</p>
          <div><span>{3300000}</span><p>Baht</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
