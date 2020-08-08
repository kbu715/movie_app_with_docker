import React, { useState, useEffect } from "react";
import { Table, PageHeader, Tag, Space, Button } from "antd";

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

  const onRoleAdminHandler = () => {
    axios.get("/api/users/roleAdmin").then((response) => {
      if (response.data.success) {
        alert("관리자 변경완료");
      } else {
        console.log("실패");
      }
    });
  };
  const onRoleUserHandler = () => {
    axios.get("/api/users/roleUser").then((response) => {
      if (response.data.success) {
        alert("회원등급 변경완료");
      } else {
        console.log("실패");
      }
    });
  };

  const onUserDeleteHandler = () => {};

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
            <Column
              title="회원수정"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button type="primary" danger onClick={onRoleAdminHandler}>
                    관리자
                  </Button>
                  <Button type="primary" onClick={onRoleUserHandler}>
                    일반회원
                  </Button>
                </Space>
              )}
            />
            <Column
              title="회원탈퇴"
              key="action"
              render={(text, record) => (
                <Space size="middle">
                  <Button type="primary" danger onClick={onUserDeleteHandler}>
                    삭제
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

export default UserList;
