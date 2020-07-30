import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";

function Product() {
  const [Products, setProducts] = useState([]);
  useEffect(() => {
    axios.post("/api/product/products").then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert("상품을 가져오는데 실패 했습니다.");
      }
    });
  }, []);

  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={7} xs={24} key={index}>
        <Card
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta title={product.title} description={`$${product.price}`} />
        </Card>
      </Col>
    );
  });

  return (
    <div
      style={{ width: "75%", margin: "3rem auto", border: "1px solid white" }}
    >
      <div style={{ textAlign: "center" }}>
        <h1 style={{ color: "white" }}>상품</h1>
      </div>

      {/* Filter  */}

      {/* Search */}

      {/* Cards */}

      <Row gutter={(16, 16)}>{renderCards}</Row>
    </div>
  );
}

export default Product;
