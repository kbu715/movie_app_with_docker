// import React from "react";
// import { Grid, withStyles } from "@material-ui/core";
// import AccountProfile from "./AccountProfile/AccountProfile";
// import AccountDetails from "./AccountDetails/AccountDetails";
// const styles = (theme) => ({
//   root: {
//     padding: theme.spacing(4),
//   },
// });

// function UpdateProfile(props) {
//   return (
//     <div>
//       <Grid container spacting={4}>
//         <Grid item lg={4} md={6} xl={4} xs={12}>
//           <AccountProfile ap={props.user.userData && props.user.userData} />
//         </Grid>
//         <Grid item lg={8} md={6} xl={8} xs={12}>
//           <AccountDetails ad={props.user.userData && props.user.userData} />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default withStyles(styles)(UpdateProfile);

import React, { useState, useEffect } from "react";
import { Typography, Form, Input } from "antd";

import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { withRouter } from "react-router-dom";

import "antd/dist/antd.css";

const { Title } = Typography;
const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
};

function UpdateProfile(props) {
  const [updatePasswordConfirm, setUpdatePasswordConfirm] = useState("");
  const [updatePassword, setUpdatePassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [currentEmail, setCurrentEmail] = useState("");
  const [currentName, setCurrentName] = useState("");
  const [currentImage, setCurrentImage] = useState("");
  const [UpdateName, setUpdateName] = useState("");

  useEffect(() => {
    Axios.post("/api/users/getUserInfo", {
      userId: localStorage.getItem("userId"),
    }).then(response => {
      if (response.data.success) {
        console.log(99, response.data);
        setCurrentEmail(response.data.user[0].email);
        setCurrentName(response.data.user[0].name);
        // console.log(response.data.user[0].image);
        setCurrentImage(response.data.user[0].image);
      } else {
        alert("user 정보를 갖고오는데 실패했습니다.");
      }
    });
  }, []);

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    console.log(files);
    formData.append("file", files[0]);

    Axios.post("/api/image/uploadfiles", formData, config).then(response => {
      if (response.data.success) {
        console.log(response.data);

        setFilePath(response.data.filePath);
      } else {
        alert("failed to save the video in server");
      }
    });
  };

  const handleChangeCurrentName = event => {
    setUpdateName(event.currentTarget.value);
  };

  const handleChangeUpdatePassword = event => {
    setUpdatePassword(event.currentTarget.value);
  };

  const handleChangeUpdatePasswordConfirm = event => {
    setUpdatePasswordConfirm(event.currentTarget.value);
  };

  const onSubmit = event => {
    event.preventDefault(); //페이지 refresh 방지
    let variable = {
      id: window.localStorage.getItem("userId"),
      password: currentPassword,
      newName: UpdateName !== "" ? UpdateName : currentName,
      newPassword: updatePassword !== "" ? updatePassword : currentPassword,
      newImage: FilePath !== "" ? FilePath : currentImage,
    };
    if (currentEmail.includes("(google)") || currentEmail.includes("(kakao)")) {
      alert("소셜 계정입니다!");
    }
    if (updatePassword === updatePasswordConfirm) {
      Axios.post("/api/users/updateProfile", variable).then(response => {
        console.log(response.data);
        if (response.data.success) {
          alert("변경되었습니다.");
          props.history.push("/");
        } else {
          alert("잘못된 입력입니다.");
        }
      });
    } else {
      alert("비밀번호가 일치하지 않습니다!");
    }
  };

  return (
    <>
      <div>
        <Form
          {...formItemLayout}
          style={{
            border: "1px solid white",
            margin: "2rem auto",
            textAlign: "center",
            width: "50%",
            backgroundColor: "white",
            borderRadius: "20px",
          }}
        >
          <Title style={{ color: "black" }}>회원정보 수정</Title>
          <h3 style={{ color: "black" }}>
            회원님의 소정한 정보를 안전하게 관리하세요.
          </h3>
          <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
            {({ getRootProps, getInputProps }) => (
              <div
                style={{
                  width: "6rem",
                  height: "6rem",
                  border: "1px solid black",

                  borderRadius: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  top: "5px",
                  left: "5px",
                  margin: "0 auto",
                }}
                {...getRootProps()}
              >
                <input {...getInputProps()} />

                {/* <UserOutlined style={{ color: "white", fontSize: "1rem" }} /> */}
                {/* <img
                  style={{
                    borderRadius: "70%",
                    overflow: "hidden",
                    objectFit: "cover",
                    justifyContent: "center",
                  }}
                  src={
                    currentImage
                      ? `http://localhost:5000/${currentImage.image}`
                      : "http://localhost:5000/uploads/default.png"
                  }
                  alt="haha"
                  width="80rem"
                  height="90rem"
                /> */}
                <img
                  style={{
                    display: "flex",
                    borderRadius: "30%",
                    justifyContent: "center",
                  }}
                  src={
                    FilePath
                      ? `http://localhost:5000/${FilePath}`
                      : currentImage !== undefined
                      ? `http://localhost:5000/${currentImage}`
                      : `http://localhost:5000/uploads/default.png`
                  }
                  alt="haha"
                  width="110px"
                  height="110px"
                />
              </div>
            )}
          </Dropzone>
          <br />
          <Form.Item
            style={{ color: "white" }}
            label="이메일"
            hasFeedback
            validateStatus="success"
          >
            <Input value={currentEmail} disabled />
          </Form.Item>

          <Form.Item
            style={{ color: "white" }}
            label="이름"
            hasFeedback
            validateStatus="success"
          >
            <Input
              placeholder={currentName}
              value={UpdateName}
              onChange={handleChangeCurrentName}
            />
          </Form.Item>

          <Form.Item
            style={{ color: "white" }}
            label="새 비밀번호"
            hasFeedback
            validateStatus="success"
          >
            <Input
              placeholder="새 비밀번호 입력"
              value={updatePassword}
              onChange={handleChangeUpdatePassword}
              type="password"
              id="success"
            />
          </Form.Item>

          <Form.Item
            style={{ color: "white" }}
            label="새 비밀번호 재입력"
            hasFeedback
            validateStatus="success"
          >
            <Input
              placeholder="새 비밀번호 재입력"
              type="password"
              value={updatePasswordConfirm}
              onChange={handleChangeUpdatePasswordConfirm}
              id="success"
            />
          </Form.Item>
          <br />
          <br />

          <Button
            style={{
              backgroundColor: "mediumslateblue",
              borderRadius: "5px",
            }}
            type="primary"
            size="large"
            onClick={onSubmit}
          >
            Update Profile
          </Button>
        </Form>
      </div>

      {/* <div style={{ margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            float: "left",
            border: "1px solid yellow",
          }}
        >
          <div
            style={{
              backgroundColor: "#151515",
              border: "1px solid pink",
              width: "570px",
              height: "200px",
              borderRadius: "5px",
              marginLeft: "60px",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "80px",
                border: "1px solid red",
                float: "left",
                marginTop: "10px",
                marginLeft: "10px",
              }}
            >
              이름
            </div>
            <div
              style={{
                border: "1px solid red",
                width: "125x",
                height: "125px",
                marginLeft: "240px",
                marginTop: "10px",
                marginRight: "10px",
              }}
            >
              이미지 업로드
            </div>
            <div
              style={{
                border: "1px solid #5F5F5F",
                width: "570px",
                marginTop: "25px",
              }}
            ></div>
            <div>
              <div>
                <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                  {({ getRootProps, getInputProps }) => (
                    <div
                      style={{
                        width: "30px",
                        height: "30px",
                        border: "1px solid white",
                        borderRadius: "20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        top: "5px",
                        left: "5px",
                        margin: "0 auto",
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />

                      <CameraOutlined
                        style={{ color: "white", fontSize: "1rem" }}
                      />
                    </div>
                  )}
                </Dropzone>
              </div>
              <div>
                
              </div>
            </div>
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
          <div
            style={{
              
              backgroundColor: "#151515",
              marginLeft: "30%",
              width: "80%",
              height: "350px",
              borderRadius: "5px",
              marginTop: "50%",
              border: "3px solid red",
            }}
          >
            <span
              style={{
                fontSize: "40px",
                marginLeft: "10px",
                marginBottom: "10px",
              }}
            >
              Profile
            </span>
            <div style={{ border: "1px solid #5F5F5F", width: "1150px" }}></div>
            
            <div
              style={{
                
                width: "1050px",
                height: "220px",
              }}
            >
              <div
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  float: "left",
                 
                }}
              >
                <div>
                  <label style={{ color: "#E6E6E6", marginBottom: "3px" }}>
                    Email
                  </label>
                  <br />
                  <Input
                    style={{
                      height: "40px",
                      width: "480px",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      color: "#D8D8D8",
                      borderColor: "#5F5F5F",
                    }}
                    value={currentEmail}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <label style={{ color: "#E6E6E6", marginBottom: "3px" }}>
                    New Password
                  </label>
                  <br />
                  <Input
                    type="password"
                    style={{
                      height: "40px",
                      width: "480px",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      color: "#D8D8D8",
                      borderColor: "#5F5F5F",
                    }}
                    onChange={handleChangeUpdatePassword}
                    value={updatePassword}
                    placeholder="새 비밀번호"
                  />
                </div>
              </div>

              

              <div
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  
                  float: "left",
                }}
              >
                <div>
                  <label style={{ color: "#E6E6E6", marginBottom: "3px" }}>
                    Name
                  </label>
                  <br />
                  <Input
                    style={{
                      height: "40px",
                      width: "480px",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      color: "#D8D8D8",
                      borderColor: "#5F5F5F",
                    }}
                    value={currentName}
                  />
                </div>
                <div style={{ marginTop: "30px" }}>
                  <label style={{ color: "#E6E6E6", marginBottom: "3px" }}>
                    New Password Confirm
                  </label>
                  <br />
                  <Input
                    type="password"
                    style={{
                      height: "40px",
                      width: "480px",
                      borderRadius: "5px",
                      backgroundColor: "transparent",
                      color: "#D8D8D8",
                      borderColor: "#5F5F5F",
                    }}
                    onChange={handleChangeUpdatePasswordConfirm}
                    value={updatePasswordConfirm}
                    placeholder="새 비밀번호 확인"
                  />
                </div>
              </div>
            </div>

            

            <div style={{ border: "1px solid #5F5F5F", width: "1150px" }}></div>

            <div
              style={{
                width: "100px",
                height: "100px",
                marginLeft: "20px",
                marginTop: "10px",
              }}
            >
              <Button
                style={{
                  backgroundColor: "mediumslateblue",
                  borderColor: "mediumslateblue",
                  borderRadius: "5px",
                }}
                type="primary"
                size="large"
                onClick={onSubmit}
              >
                <Button
                  style={{
                    backgroundColor: "mediumslateblue",

                    borderRadius: "5px",
                  }}
                  type="primary"
                  size="large"
                  onClick={onSubmit}
                >
                  Update Profile
                </Button>
                
              </Button>
            </div>
            
          </div>
        </Form>
      </div> */}
    </>
  );
}

export default withRouter(UpdateProfile);
