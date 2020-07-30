import React from "react";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import { withRouter } from "react-router-dom";
function Google(props) {
  const responseGoogle = (response) => {
    const data = {
      tokenId: response.tokenId,
    };
    console.log(response);
    Axios.post("/api/users/googlelogin", data).then((response) => {
      console.log("Google Login Success", response.data);
      if (response.data.loginSuccess) {
        window.localStorage.setItem("userId", response.data.userId);
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };

  return (
    <div>
      <GoogleLogin
        clientId="929257267887-jabje0s2v9gdvfrm1avh5qr1q63j9p91.apps.googleusercontent.com"
        buttonText="Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        
      />
    </div>
  );
}

export default withRouter(Google);

// import React, { Component } from "react";
// import { GoogleLogin } from "react-google-login";
// import styled from "styled-components";
// import "./Login.css";
// const Container = styled.div`
//   display: flex;
//   /* flex-flow: column wrap; */
// `;
// class Google extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       id: "",
//       name: "",
//       provider: "",
//       email: "",
//     };
//   }

//   //Google Login
//   responseGoogle = res => {
//     this.setState({
//       id: res.googleId,
//       name: res.profileObj.name,
//       email: res.profileObj.email,
//       provider: "google",
//     });
//     console.log(res);
//     console.log(
//       "id",
//       this.state.id,
//       "name",
//       this.state.name,
//       "email",
//       this.state.email
//     );
//   };

//   //Login Fail
//   responseFail = err => {
//     console.log(err);
//   };

//   render() {
//     return (
//       <Container>
//         <GoogleLogin
//           clientId="929257267887-jabje0s2v9gdvfrm1avh5qr1q63j9p91.apps.googleusercontent.com"
//           buttonText="Google Login"
//           onSuccess={this.responseGoogle}
//           onFailure={this.responseFail}
//           cookiePolicy={"single_host_origin"}
//         />
//       </Container>
//     );
//   }
// }

// export default Google;
