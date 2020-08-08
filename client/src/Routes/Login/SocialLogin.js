import React from "react";
import GoogleLogin from "react-google-login";
// import KaKaoLogin from "react-kakao-login";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

// const KaKaoBtn = styled(KaKaoLogin)`
//   padding: 0;
//   width: 300px;
//   height: 45px;
//   line-height: 44px;
//   color: #783c00;
//   background-color: #ffeb00;
//   border: 1px solid transparent;
//   border-radius: 3px;
//   font-size: 14px;
//   font-weight: bold;
//   text-align: center;
//   cursor: pointer;
//   &:hover {
//     box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
//   }
// `;



function SocialLogin(props) {
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
  // const responseKaKao = (response) => {
  //   console.log(response)
  //   Axios.get('/api/users/kakaologin', {
  //     //백엔드에서 원하는 형태의 endpoint로 입력해서 fetch한다. 
  //     headers: {
  //       Authorization: response.response.access_token,
  //       //받아오는 response객체의 access_token을 통해 유저 정보를 authorize한다. 
       
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((res) => localStorage.setItem('token', res.token), 
  //           //백엔드에서 요구하는 key 값(token)으로 저장해서 localStorage에 저장한다.
  //           //여기서 중요한것은 처음에 console.log(res)해서 들어오는 
  //           //access_token 값을 백엔드에 전달해줘서 백엔드에 저장 해두는 
  //           //절차가 있으므로 까먹지 말 것! 
  //           alert('로그인 성공하였습니다'));
  // };

  return (
    <div>
      <GoogleLogin
        clientId="929257267887-jabje0s2v9gdvfrm1avh5qr1q63j9p91.apps.googleusercontent.com"
        buttonText="Google Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
        
      />
        {/* <KaKaoBtn
    //styled component 통해 style을 입혀 줄 예정 
                jsKey={'4835800b3d8f6f4b36c85d157690121c'}
    //카카오에서 할당받은 jsKey를 입력
                buttonText='카카오 계정으로 로그인'
    //로그인 버튼의 text를 입력
                onSuccess={responseKaKao}
    //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장 
                getProfile={true}
        /> */}
    </div>
  );
}

export default withRouter(SocialLogin);

