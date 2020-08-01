import React, { useState, useEffect } from "react";
import { Table, PageHeader, Tag } from "antd";

import axios from "axios";
const { Column } = Table;

function UserList() {
  const [User, setUser] = useState([]);

  useEffect(() => {
    axios.get("/api/users/management").then((response) => {
      if (response.data.success) {
        setUser(response.data.users);
      } else {
        console.log("불러오기 실패");
      }
    });
  }, []);

  return (
    <PageHeader
      title="User List"
      className="site-page-header"
      subTitle="사용자 관리"
      tags={<Tag color="blue">사용자</Tag>}
      avatar={{
        src: "https://avatars1.githubusercontent.com/u/8186664?s=460&v=4",
      }}
    >
      <div style={{ width: "80%", margin: "3rem auto" }}>
        <div style={{ textAlign: "center" }}>
          <br />

          <Table dataSource={User}>
            <Column title="이름" dataIndex="name" key="name" />
            <Column title="이메일" dataIndex="email" key="email" />
            <Column title="등급" dataIndex="role" key="role" />
          </Table>
        </div>
      </div>
    </PageHeader>
  );
}

export default UserList;
