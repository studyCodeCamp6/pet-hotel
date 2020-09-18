import React from "react";
import { withRouter } from "react-router-dom";
import { Carousel, Dropdown } from "antd";
import "./Home.css";
import ArticleCard from "../component/ArticleCard/ArticleCard";
import Footer from "../component/Footer/Footer";
import ReviewCard from "../component/ReviewCard/ReviewCard";

// const contentStyle = {
//   height: "183px",
//   color: "#626262",
//   lineHeight: "183px",
//   textAlign: "center",
//   background: "#364d79",

// };

function Home() {
  return (
    <div style={{ height: "100vh"}}>
      <Carousel fade>
        <div>
          <h3 className="carousel">1</h3>
        </div>
        <div>
          <h3  className="carousel">2</h3>
        </div>
        <div>
          <h3  className="carousel">3</h3>
        </div>

      </Carousel>

      <div>
          <div>Location Area</div>
        <select id="typePet" name="typePet">
          <option placeholder="ประเภทสัตว์เลี้ยง">ประเภทสัตว์เลี้ยง</option>
          <option value="cat">cat</option>
          <option value="dog">dog</option>
          <option value="all">ทั้งหมด</option>
        </select>
        <button>ค้นหา</button>
      </div>

      <ArticleCard />
      <b>Review</b>
      <b>ProviderName</b>
      <ReviewCard />
      <Footer />
    </div>
  );
}

export default withRouter(Home);
