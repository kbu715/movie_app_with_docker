// import React from 'react';
// import  GoogleLogin from 'react-google-login';

// function Google() {

//     const responseGoogle = response => {
//         console.log(response);

//     }

//    return(
//        <div>
//             <GoogleLogin
//                   clientId="456699879153-8fq6596vepc2sm6207tn2frootqmgrku.apps.googleusercontent.com"
//                   buttonText="Login"
//                   onSuccess={responseGoogle}
//                   onFailure={responseGoogle}
//                   cookiePolicy={'single_host_origin'}
//                 />,
//        </div>
//    );
// }

// export default Google;

import React, { Component } from "react";
import { GoogleLogin } from "react-google-login";
import styled from "styled-components";
import "./Login.css";
const Container = styled.div`
  display: flex;
  flex-flow: column wrap;
`;
class Google extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      name: "",
      provider: "",
      email: "",
    };
  }

  //Google Login
  responseGoogle = res => {
    this.setState({
      id: res.googleId,
      name: res.profileObj.name,
      email: res.profileObj.email,
      provider: "google",
    });
    console.log(res);
    console.log(
      "id",
      this.state.id,
      "name",
      this.state.name,
      "email",
      this.state.email
    );
  };

  //Login Fail
  responseFail = err => {
    console.log(err);
  };

  render() {
    return (
      <Container>
        <GoogleLogin
          clientId="929257267887-jabje0s2v9gdvfrm1avh5qr1q63j9p91.apps.googleusercontent.com"
          buttonText="Google Login"
          onSuccess={this.responseGoogle}
          onFailure={this.responseFail}
          cookiePolicy={"single_host_origin"}
        />
      </Container>
    );
  }
}

export default Google;
