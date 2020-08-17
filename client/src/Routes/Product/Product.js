import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Col, Card, Row } from "antd";
import Meta from "antd/lib/card/Meta";
import ImageSlider from "../../utils/ImageSlider";
import SearchFeature from "./Section/SearchFeature";
import "./mystyle.css";
import styled from "styled-components";

const Button1 = styled.button`
  color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: #151515;
  margin-left: 20px;
  padding: 5px;
  box-shadow: 0 1.5rem 2rem rgba(156, 136, 255, 0.2);
`;

function Product() {
  const [Products, setProducts] = useState([]);
  const [Skip, setSkip] = useState(0);
  const [Limit, setLimit] = useState(8);
  const [PostSize, setPostSize] = useState(0);
  const [SearchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    let body = {
      skip: Skip,
      limit: Limit,
    };

    getProducts(body);
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      if (response.data.success) {
        if (body.loadMore) {
          setProducts([...Products, ...response.data.productInfo]);
        } else {
          setProducts(response.data.productInfo);
        }
        setPostSize(response.data.postSize);
      } else {
        alert("상품들을 가져오는데 실패 했습니다.");
      }
    });
  };

  const loadMoreHandler = () => {
    let skip = Skip + Limit;

    let body = {
      skip: skip,
      limit: Limit,
      loadMore: true,
    };

    getProducts(body);
    setSkip(skip);
  };
  //#f7f7f7
  //f7f7f7
  //#91CCF1
  //style={{ marginRight: "0px", marginLeft: "0px", height: "100%" }}
  const renderCards = Products.map((product, index) => {
    return (
      <Col lg={6} md={7} xs={24} key={index}>
        <Card
          style={{
            width: "70%",
            height: "80%",
            border: "6px solid #9c88ff",
            backgroundColor: "white",
            // borderColor: "white",
            borderRadius: "5px",
            marginBottom: "50px",
          }}
          hoverable={true}
          cover={
            <a href={`/product/${product._id}`}>
              <ImageSlider images={product.images} />
            </a>
          }
        >
          <Meta
            title={product.title}
            description={`${product.price}원`}
            style={{
              position: "releative",
              textAlign: "center",
              fontSize: "18px",
            }}
          />
        </Card>
      </Col>
    );
  });

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      skip: 0,
      limit: Limit,
      searchTerm: newSearchTerm,
    };
    setSkip(0);
    setSearchTerm(newSearchTerm);
    getProducts(body);
  };

  return (
    <div style={{ width: "75%", margin: "3rem auto" }}>
      {/* Filter  */}

      {/* Search */}
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

      {/* Cards */}

      <Row gutter={(16, 16)}>{renderCards}</Row>

      <br />

      {PostSize >= Limit && (
        <div
          style={{ display: "flex", justifyContent: "center", color: "black" }}
        >
          <Button1
            variant="contained"
            color="primary"
            onClick={loadMoreHandler}
          >
            더보기
          </Button1>
        </div>
      )}
    </div>
  );
}

export default Product;
