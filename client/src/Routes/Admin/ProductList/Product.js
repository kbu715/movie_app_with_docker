import React, { useState, useEffect } from "react";
import { Table, PageHeader, Tag, Space, Button } from "antd";
import axios from "axios";
const { Column } = Table;

function Product() {
  const [Product, setProduct] = useState([]);

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = () => {
    axios.get("/api/product/management").then((response) => {
      if (response.data.success) {
        setProduct(response.data.products);
      } else {
        console.log("불러오기 실패");
      }
    });
  };
//==========================================================================
  const onProductDeleteHandler = (_id) => {
    const variables = {
      _id,
    };

    axios.post("/api/product/removeFromProduct", variables).then((response) => {
      if (response.data.success) {
        alert("상품 삭제 성공")
        getProduct();
      } else {
        alert("리스트에서 지우는데 실패했습니다.");
      }
    });
  };

  return (
    <PageHeader
      title="Product List"
      className="site-page-header"
      subTitle="상품 관리"
      tags={<Tag color="blue">상품 목록</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />

          <Table dataSource={Product}>
              {/* 이미지 넣을수 있음 좋겟당 */}
            <Column title="ID" dataIndex="_id" key="id" />
            <Column title="상품명" dataIndex="title" key="name" />
            <Column title="sold" dataIndex="sold" key="sold" />
            <Column title="가격" dataIndex="price" key="price" />
            <Column
              title="상품삭제"
              key="action"
              dataIndex="_id"
              render={(dataIndex) => (
                <Space size="middle">
                  <Button
                    ghost
                    type="primary"
                    danger
                    style={{ border: "1.5px solid" }}
                    onClick={() => onProductDeleteHandler(dataIndex)}
                  >
                    <span style={{ color: "red" }}>삭제</span>
                  </Button>
                </Space>
              )}
            />
          </Table>
        </div>
      </div>
    </PageHeader>
  );
}

export default Product;
