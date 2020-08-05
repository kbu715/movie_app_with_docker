import React, { useState, useEffect } from "react";
import { Typography, Form, Input } from "antd";
import { PlusOutlined, CameraOutlined } from "@ant-design/icons";
import Button from "@material-ui/core/Button";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import { CredentialListPage } from "twilio/lib/rest/api/v2010/account/sip/credentialList";

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
      <div style={{ margin: "2rem auto" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          {/* <Title style={{ color: "white" }} level={2}>
            {" "}
            Update
          </Title> */}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            float: "left",border:"1px solid yellow",
          }}
        >
          <div
            style={{
              backgroundColor: "#151515",
              border:"1px solid pink",
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
              {" "}
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
                        borderRadius:"20px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        top: "5px",
                        left: "5px",
                        margin:"0 auto"
                      }}
                      {...getRootProps()}
                    >
                      <input {...getInputProps()} />
                      
                        
                    <CameraOutlined style={{ color: "white", fontSize: "1rem" }}/>
                    </div>
                  )}
                </Dropzone>
              </div>
              <div>
                {/* <div
                  style={{
                    // backgroundColor:"#151515",
                    backgroundColor: "transparent",
                    border: "1px solid mediumslateblue",
                    // borderRadius:"5px",
                    color: "mediumslateblue",
                    zIndex: "10",
                    position: "relative",
                    width:"100px",
                    height:"50px",
                    bottom: "27px",
                    margin: "0 auto"
                  }}
                  type="primary"
                  size="medium"
                  // onClick={onSubmit}
                >
                  Upload Profile
                </div> */}
              </div>
            </div>
          </div>
          {/* {currentImage !== "" && (
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
          )} */}
        </div>
        {/* ///////////////////////////////////////////////////////////////////////////////////////////// */}
        <Form onSubmit={onSubmit}>
          <div
            style={{
              // border: "1px solid green",
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
            {/* <div style={{ width: "700px", height: "270px", border:"1px solid pink" }}> */}
            <div
              style={{
                // border: "1px solid red",
                width: "1050px",
                height: "220px",
              }}
            >
              <div
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  float: "left",
                  // border:"1px solid red"
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

              {/* //          <label>currentPassword</label>
          // <br />
          // <Input
          //   type="password"
          //   style={{ height: "56px", width: "460px", borderRadius: "2%" }}
          //   onChange={handleChangeCurrentPassword}
          //   value={currentPassword}
          //   placeholder="기존 비밀번호"
          //   required
        //   />  */}

              <div
                style={{
                  marginTop: "30px",
                  marginLeft: "40px",
                  // border:"1px solid green",
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

            {/* //////////////////////////////////////////////////////////// */}

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
                <Button variant="contained" color="primary">
            간편예매
          </Button>
                Update Profile
              </Button>
            </div>
            {/* </div> */}
          </div>
        </Form>
      </div>
    </>
  );
}

export default withRouter(UpdateProfile);
