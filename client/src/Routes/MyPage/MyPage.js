import React, { useState, useEffect } from "react";
import { Typography, Form, Input } from "antd";
import Button from "@material-ui/core/Button";
// import { PlusOutlined } from "@ant-design/icons";
// import Dropzone from "react-dropzone";
import Axios from "axios";
import { withRouter } from "react-router-dom";


const { Title } = Typography;
// const { TextArea } = Input;

function MyPage(props) {
  // const [Email, setEmail] = useState("");
  // const [Name, setName] = useState("");
  // const [FilePath, setFilePath] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentImage, setCurrentImage] = useState("");

  useEffect(() => {
    Axios.post("/api/users/getUserInfo", {
      userId: localStorage.getItem("userId"),
    }).then((response) => {
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

  const handleChangeEmail = (event) => {
    // setEmail(event.currentTarget.value);
  };

  const handleChangeName = (event) => {
    console.log(event.currentTarget.value);

    // setName(event.currentTarget.value);
  };

  const onSubmit = () => {
    props.history.push("/mypage/update");
  };

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
              // border: "2px solid white",
              justifyContent: "center",
            }}
            src={
              currentImage
                ? `http://localhost:5000/${currentImage}`
                : "http://localhost:5000/uploads/default.png"
            }
            alt="haha"
            width="200rem"
            height="200rem"
          />
        </div>
      )}
      <Form onSubmit={onSubmit}>
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
          Update Profile
        </Button>
      </Form>

      <div style={{}}>
      
      </div>
      
    </div>
  );
}

export default withRouter(MyPage);
