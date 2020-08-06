import React, { useState,useEffect } from "react";

import { Table, PageHeader, Tag } from "antd";
import Axios from "axios";
const { Column } = Table;

function ProductList(props) {
  
  const [History, setHistory] = useState([]);
  
  const newDoc = [];
  let i = 0;
  useEffect(() => {
    Axios.get('/api/users/history')
      .then(response => {
        if(response.data.success) {          
          response.data.doc.forEach(()=>{
              newDoc.push(response.data.doc[i].history)             
              i++;
          })         
          const flatlist = newDoc.flat();
          setHistory(flatlist);
        } else {
          alert('정보를 가져오는데 실패했습니다.')
        }
      })
  },[])
  console.log('====================================');
  console.log(1111,History);
  console.log('====================================');
  return (
    <PageHeader
      title="ProductPurchase List"
      className="site-page-header"
      tags={<Tag color="blue">내역</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />

          <Table dataSource={History}>
            <Column title="결제ID" dataIndex="paymentId" key="paymentId" />
            <Column title="상품명" dataIndex="name" key="name" />
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
