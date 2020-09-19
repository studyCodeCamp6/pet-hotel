import React from "react";
import "./ArticleCard.css";
import { Card } from "antd";

const { Meta } = Card;

function ArticleCard() {
  return (
    <div className="article-card">
      {/* <div>
          <img></img>
      </div>
      <div>
      <Meta title="บทความ" description="หนูมาลีมีลูกแมวเหมียว ลูกแมวเมียว ลูกแมวเมี้ยว หนูมาลีมีลูกแมวเหมียว ลูกแมวเมียว ลูกแมวเมี้ยวหนูมาลีมี ลูกแมวเหมียว ลูกแมวเมียวลูกแมวเมี้ยว" />
      </div> */}
      
      <Card
        style={{ width: 303, height:331 }}
        cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        
      >
        <Meta title="บทความ" description="หนูมาลีมีลูกแมวเหมียว ลูกแมวเมียว ลูกแมวเมี้ยว หนูมาลีมีลูกแมวเหมียว ลูกแมวเมียว ลูกแมวเมี้ยวหนูมาลีมี ลูกแมวเหมียว ลูกแมวเมียวลูกแมวเมี้ยว" />
      </Card>

    </div>
  );
}

export default ArticleCard;
