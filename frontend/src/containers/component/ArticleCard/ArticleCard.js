import React from "react";
import "./ArticleCard.css";
import { Card } from "antd";

const { Meta } = Card;

function ArticleCard() {
  return (
    <div>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
      >
        <Meta title="Europe Street beat" description="www.instagram.com" />
      </Card>
      ,
    </div>
  );
}

export default ArticleCard;
