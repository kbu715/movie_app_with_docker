import React, { useState } from "react";

import { Table, PageHeader, Tag } from "antd";
const { Column } = Table;

function ProductList(props) {
  console.log(77, props);
  const [History, setHistory] = useState([]);
  setHistory(props.user.userData && props.user.userData.history);
  return (
    <PageHeader
      title="Reservation List"
      className="site-page-header"
      tags={<Tag color="blue">예매</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />

          <Table dataSource={History}>
            <Column title="결제ID" dataIndex="id" key="id" />
            <Column title="가격" dataIndex="price" key="price" />
            <Column title="수량" dataIndex="quantity" key="quantity" />

            <Column
              title="구매날짜"
              dataIndex="dateOfPurchase"
              key="dateOfPurchase"
            />
          </Table>
        </div>
      </div>
    </PageHeader>
  );
}

export default ProductList;
