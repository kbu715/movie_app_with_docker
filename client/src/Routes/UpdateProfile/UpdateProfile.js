import React, { useState, useEffect } from "react";
import { Typography, Button, Form, Input } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { withRouter } from "react-router-dom";


const { Title } = Typography;
// const { TextArea } = Input;

function UpdateProfile(props) {
  const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [FilePath, setFilePath] = useState("");
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

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    Axios.post("/api/image/uploadfiles", formData, config).then((response) => {
      if (response.data.success) {
        console.log(response.data);

        setFilePath(response.data.filePath);
      } else {
        alert("failed to save the video in server");
      }
    });
  };

  const handleChangeCurrentPassword = (event) => {
    setCurrentPassword(event.currentTarget.value);
  };

  const handleChangeUpdatePassword = (event) => {
    setUpdatePassword(event.currentTarget.value);
  };

  const handleChangeUpdatePasswordConfirm = (event) => {
    setUpdatePasswordConfirm(event.currentTarget.value);
  };

  const onSubmit = (event) => {
    event.preventDefault(); //페이지 refresh 방지

    let variable = {
      id: window.localStorage.getItem("userId"),
      password: currentPassword,
      newPassword: updatePassword !== "" ? updatePassword : currentPassword,
      newImage: FilePath !== "" ? FilePath : currentImage,
    };
    if (currentPassword !== "") {
      Axios.post("/api/users/updateProfile", variable).then((response) => {
        console.log(response.data);
        if (response.data.success) {
          alert("변경되었습니다.");
          props.history.push("/mypage");
        } else {
          alert("잘못된 입력입니다.");
        }
      });
    } else {
      alert("현재 비밀번호를 입력해주세요!");
    }
  };

  return (
    <>
      <div
        style={{
          maxWidth: "700px",
          margin: "2rem auto",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <Title style={{ color: "white" }} level={2}>
            {" "}
            Update
          </Title>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "280px",
                  height: "200px",
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
                  //   borderRadius: "70%",
                  //   overflow: "hidden",
                  //   objectFit: "cover",
                  border: "2px solid white",
                  justifyContent: "center",
                }}
                src={
                  currentImage
                    ? `http://localhost:5000/${
                        FilePath ? FilePath : currentImage
                      }`
                    : "http://localhost:5000/uploads/default.png"
                }
                alt="haha"
                width="280px"
                height="200px"
              />
            </div>
          )}
        </div>

        <Form onSubmit={onSubmit}>
          <br />
          <br />
          <label>Email</label>
          <br />
          <Input
            style={{ height: "56px", width: "460px", borderRadius: "2%" }}
            value={currentEmail}
          />
          <br />
          <br />
          <label>Name</label>
          <br />
          <Input
            style={{ height: "56px", width: "460px", borderRadius: "2%" }}
            value={currentName}
          />
          <br />
          <br />

          <label>currentPassword</label>
          <br />
          <Input
            type="password"
            style={{ height: "56px", width: "460px", borderRadius: "2%" }}
            onChange={handleChangeCurrentPassword}
            value={currentPassword}
            placeholder="기존 비밀번호"
            required
          />
          <br />
          <br />
          <label>New Password</label>
          <br />
          <Input
            type="password"
            style={{ height: "56px", width: "460px", borderRadius: "2%" }}
            onChange={handleChangeUpdatePassword}
            value={updatePassword}
            placeholder="새 비밀번호"
          />
          <br />
          <br />
          <label>New Password Confirm</label>
          <br />
          <Input
            type="password"
            style={{ height: "56px", width: "460px", borderRadius: "2%" }}
            onChange={handleChangeUpdatePasswordConfirm}
            value={updatePasswordConfirm}
            placeholder="새 비밀번호 확인"
          />
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
      </div>
      
    </>
  );
}

export default withRouter(UpdateProfile);
