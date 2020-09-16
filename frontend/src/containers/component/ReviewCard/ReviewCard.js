import React from "react";
import { Rate } from "antd";
import "./ReviewCard.css";

function ReviewCard() {
  return (
    <div>
      <div className="review-card">
        <p>“ ใช้บริการกับทางเว็บไซต์แล้ว ดูแลน้องได้ดีมากๆ เลยครับ“</p>
        <div className="show-rate-review">
          <Rate
            disabled
            defaultValue={2}
            style={{ marginTop: "-50px", color: "#F6D04A" }}
          />
          <p>นายประยุตท์ จันอังคาร</p>
        </div>
      </div>
    </div>
  );
}

export default ReviewCard;
