import React from 'react';
import "./CreateReview.css";
import { Rate } from "antd";

export default function createReview() {
  return (
    <div className="flex-container">
      <div className="headerReview">Review</div>

      <div className="boxReview">
        <div className="providerNameReview">Dog & Cat</div>
        <div className="rate">
          <Rate style={{ fontSize: "36px", marginTop: "10px", color: "#F6AB4A" }} />
        </div>
        <form>
          <textarea className="textReview" placeholder="Comment"></textarea>
        </form>
        <button className="sendReview">Send Review</button>
      </div>
    </div>
  )
}
