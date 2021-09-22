import React, { useEffect, useState } from "react";
import axios from "axios";
import { Col, Row } from "antd";
import ImageSlider from "../../utils/ImageSlider";
import SearchFeature from "./Section/SearchFeature";

import { Helmet } from "react-helmet";

function Product() {
  const [Products, setProducts] = useState([]);
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        setProducts(response.data.productInfo);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const renderCards = Products.sort((a, b) => {
    let aContinents = a.continents;
    let bContinents = b.continents;

    if (aContinents < bContinents) {
      return 1;
    } else if (aContinents > bContinents) {
      return -1;
    } else {
      return 0;
    }
  }).map((product, index) => {
    return (
      <Col lg={6} md={8} xs={20} key={index}>
        <a href={`/product/${product._id}`}>
          <ImageSlider images={product.images} />
        </a>

        <div
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          {product.title}
        </div>

        <div
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: "12px",
            marginTop: "10px",
            color: "#999999",
          }}
        >
          {product.description}
        </div>
        <br />
        <br />
        <div
          style={{
            position: "relative",
            textAlign: "center",
            fontSize: "20px",
          }}
        >
          {product.price}원
        </div>
      </Col>
    );
  });

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      searchTerm: newSearchTerm,
    };

    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <>
      <Helmet>
        <title>Product | Nomflix</title>
      </Helmet>
      <div style={{ width: "75%", margin: "3rem auto" }}>
        <div
          style={{
            display: "flex",
          }}
        >
          <span
            style={{
              color: "white",
              fontSize: "3rem",
              fontWeight: "600",
              width: "50%",
              marginLeft: "10px",
            }}
          >
            Store
          </span>
          <div
            style={{
              justifyContent: "flex-end",
              textAlign: "right",
              width: "50%",
            }}
          >
            <SearchFeature refreshFunction={updateSearchTerm} />
          </div>
        </div>
        <br />
        <br />
        <Row gutter={(16, 16)}>{renderCards}</Row>
        <br />
      </div>
    </>
  );
}

export default Product;
