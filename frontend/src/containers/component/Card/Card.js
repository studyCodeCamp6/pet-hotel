import React from "react";
import "./Card.css";

function Card() {
  return (
    <div className="card-componant">
      <div className="card-content">
        <div>
          <div>
            <div className="name-customer">
              <b>Dog & Cat</b>
              <span>
                <i class="fas fa-mobile-alt"></i>
              </span>
            </div>
            <div className="address-wrap">
              AddressAddressAddressAddressAddressAddressAddressAddressAddressAddress
            </div>
          </div>

          <div className="task-content">
            <div>
              <b>Pet Name</b>
              {}
              <b>Pet Type</b>
              {}
            </div>
            <div>
              <b>Date</b>
            </div>
            <div>
              <b>Price</b>
              {}
              <b>Baht</b>
            </div>
          </div>
        </div>
        <hr />
        <div className="show-status">
          <span>
            <i>Wait for Accept.</i>
          </span>
          <span className="show-button">
                  <button className="show-button-cancel">Cancel</button>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Card;
