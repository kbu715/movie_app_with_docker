import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import "./SignUp.css";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import { PlusOutlined } from "@ant-design/icons";
import Axios from "axios";

function SignUp(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [FilePath, setFilePath] = useState("");
  const [FileName, setFileName] = useState("");

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = event => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };
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
        setFileName(response.data.fileName);

        // let variable = {
        //     filePath: response.data.filePath,
        //     fileName: response.data.fileName
        // }

        // let variable = {
        //   url: response.data.url,
        //   fileName: response.data.fileName
        // }

        //gerenate thumbnail with this filepath !
      } else {
        alert("failed to save the video in server");
      }
    });
  };
  const onSubmitHandler = event => {
    event.preventDefault(); //페이지 refresh 방지

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
      image: FilePath,
    };

    // redux action => loginUser는 action이름
    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push("/sign-in");
        alert("회원가입 성공!");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={onSubmitHandler} style={{ margin: "0" }}>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>이메일</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={Email}
              onChange={onEmailHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>이름</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={Name}
              onChange={onNameHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>비밀번호</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={Password}
              onChange={onPasswordHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "10px" }}>프로필 이미지</label>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      width: "60px",
                      height: "50px",
                      border: "1px solid lightgray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <PlusOutlined
                      style={{ color: "white", fontSize: "3rem" }}
                    />
                    {/* <Icon type="plus" style={{ fontSize: '3rem' }} /> */}
                  </div>
                )}
              </Dropzone>
              {FilePath !== "" && (
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
                    src={`http://localhost:5000/${FilePath}`}
                    alt="haha"
                    width="200rem"
                    height="200rem"
                  />
                </div>
              )}
            </div>
            <div>{FilePath ? FilePath : "undefined"}</div>
            <div>{FileName ? FileName : "undefined"}</div>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
