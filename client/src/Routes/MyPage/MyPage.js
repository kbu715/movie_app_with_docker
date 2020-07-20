import React, { useState, useEffect } from "react";
import { Typography, Button, Form, Input } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import Dropzone from "react-dropzone";
import Axios from "axios";

const { Title } = Typography;
// const { TextArea } = Input;

function MyPage() {
  // const [Email, setEmail] = useState("");
  // const [Name, setName] = useState("");
  // const [FilePath, setFilePath] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    Axios.post("/api/users/getUserInfo", {
      userId: localStorage.getItem("userId"),
    }).then(response => {
      if (response.data.success) {
        console.log(response.data);
        setCurrentEmail(response.data.user[0].email);
        setCurrentName(response.data.user[0].name);
        setCurrentImage(response.data.user[0].image);
      } else {
        alert("user 정보를 갖고오는데 실패했습니다.");
      }
    });
  }, []);

  const handleChangeEmail = event => {
    // setEmail(event.currentTarget.value);
  };

  const handleChangeName = event => {
    console.log(event.currentTarget.value);

    // setName(event.currentTarget.value);
  };

  const onSubmit = () => {};

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto" }}>
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <Title style={{ color: "white" }} level={2}>
          {" "}
          My Page
        </Title>
      </div>

      {currentImage !== "" && (
        <div
          style={{
            display: "flex",
            textAlign: "center",
            margin: "0px auto",
          }}
        >
          <img
            style={{
              display: "flex",
              borderRadius: "70%",
              overflow: "hidden",
              objectFit: "cover",
              border: "2px solid white",
              justifyContent: "center",
            }}
            src={`http://localhost:5000/${currentImage}`}
            alt="haha"
            width="200rem"
            height="200rem"
          />
        </div>
      )}
      <Form onSubmit={onSubmit}>
        {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "100px",
                  height: "80px",
                  border: "1px solid lightgray",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                <PlusOutlined style={{ color: "white", fontSize: "3rem" }} />
              
              </div>
            )}
          </Dropzone>


        </div> */}

        <br />
        <br />
        <label>Email</label>
        <Input onChange={handleChangeEmail} value={currentEmail} />
        <br />
        <br />
        <label>Name</label>
        <Input onChange={handleChangeName} value={currentName} />
        <br />
        <br />

        <br />
        <br />

        <Button
          style={{ backgroundColor: "red", borderColor: "red" }}
          type="primary"
          size="large"
          onClick={onSubmit}
        >
          수정
        </Button>
      </Form>
    </div>
  );
}

export default MyPage;
