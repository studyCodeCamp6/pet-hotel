import React from "react";
import ReviewCard from "../../component/ReviewCard/ReviewCard";
import { Rate } from "antd";
import "./Booking.css";

function Booking() {
  return (
    <div>
      <div className="search-show-map-booking"></div>
      <div className="name-provider-booking">
        <b>Dog & Cat</b>
        <div>
          <Rate disabled defaultValue={2} style={{ color: "#F6D04A" }} />
        </div>
      </div>
      <div className="grid-container">
        <div className="item1">
          <p>198 ซอยจุฬา 11 ถนนพระราม 4 แขวงวังใหม่ เขตปทุมวัน กทม 10330</p>
        </div>
        <div className="item2">
          <p>
            DescriptionproviderDescriptionproviderDescriptionproviderDescriptionproviderDescriptionproviderDescriptionproviderDescriptionproviderDescriptionproviderDescriptionprovider
          </p>
        </div>
        <div className="item3">
          <b>Service</b>
        </div>
        <div className="item4">
          <p>Feeding , Take a walk, etc. Feeding , Take a walk, etc</p>
        </div>
        <div className="item5">
          <form>
            <select name="pet" id="pet">
              <option placeholder="ประเภทสัตว์เลี้ยง">ประเภทสัตว์เลี้ยง</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
            </select>
          </form>
        </div>
        <div className="item6">
          <form>
            <select name="petId" id="petId">
              <option placeholder="เลือกสัตว์เลี้ยงที่ลงทะเบียนแล้ว">
                เลือกสัตว์เลี้ยงที่ลงทะเบียนแล้ว
              </option>
              <option value="PetId1">PetId1</option>
              <option value="PetId2">PetId2</option>
            </select>
          </form>
        </div>
        <div className="item7">Startdate</div>
        <div className="item8">EndDate</div>
        <div className="item9">
          <p>Note</p>
        </div>
        <div className="item10">
          <form>
            <textarea className="note-booking" placeholder=""></textarea>
          </form>
        </div>
        <div className="item11">
          <div>300 bath/day/pet</div>
          <div>
            <p>4 day</p>
            <div>
              <p>total</p>
              <p>1,200</p>
              <p>Baht</p>
            </div>
          </div>
        </div>
        <div className="item12">
          <button>Booking Now !</button>
        </div>
        <div className="item13">
          <b>Review</b>
        </div>
      </div>

      <ReviewCard />
    </div>
  );
}

export default Booking;
