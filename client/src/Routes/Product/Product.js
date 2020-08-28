import React, { useEffect, useState } from "react"
import axios from "axios"
import { Col, Card, Row } from "antd"
import Meta from "antd/lib/card/Meta"
import ImageSlider from "../../utils/ImageSlider"
import SearchFeature from "./Section/SearchFeature"
import styled from "styled-components"
import { Helmet } from "react-helmet"

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
`

function Product() {
  const [Products, setProducts] = useState([])
  const [Skip, setSkip] = useState(0)
  const [PostSize, setPostSize] = useState(0)
  const [SearchTerm, setSearchTerm] = useState("")
  const [Limit, setLimit] = useState(8)

  useEffect(() => {
    // let body = {
    //   skip: Skip,
    //   limit: Limit,
    // };

    getProducts();
  }, []);

  const getProducts = (body) => {
    axios.post("/api/product/products", body).then((response) => {
      // console.log("22222", response.data)
      if (response.data.success) {
        // if (body.loadMore) {
        //   setProducts([...Products, ...response.data.productInfo])
        // } else {
          setProducts(response.data.productInfo)
        // }
        // setPostSize(response.data.postSize)
      } else {
        alert("상품들을 가져오는데 실패 했습니다.")
      }
    })
  }

  // const loadMoreHandler = () => {
  //   let skip = Skip + Limit;

  //   let body = {
  //     skip: skip,
  //     limit: Limit,
  //     loadMore: true,
  //   };

  //   getProducts(body);
  //   setSkip(skip);
  // };

  const renderCards = Products.sort((a, b) => {
    let aContinents = a.continents
    let bContinents = b.continents

    if (aContinents < bContinents) {
      return 1
    } else if (aContinents > bContinents) {
      return -1
    } else {
      return 0
    }
  }).map((product, index) => {
    // console.log("dddd", product)
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
    )
  })

  const updateSearchTerm = (newSearchTerm) => {
    let body = {
      // skip: 0,
      // limit: Limit,
      searchTerm: newSearchTerm,
    }
    // setSkip(0)
    setSearchTerm(newSearchTerm)
    getProducts(body)
  }

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
            
            <SearchFeature refreshFunction={updateSearchTerm}/>
          </div>
        </div>
        <br />
        <br />
        <Row gutter={(16, 16)}>{renderCards}</Row>
        <br />
        {/* {PostSize >= Limit && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              color: "black",
            }}
          >
            <Button1
              variant="contained"
              color="primary"
              onClick={loadMoreHandler}
            >
              기
            </Button1>
          </div>
        )} */}
      </div>
    </>
  )
}

export default Product
