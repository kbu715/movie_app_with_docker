import React, { Component } from "react";
import styled from "styled-components";
// import { StyledText } from "../style";
import KaKaoLogin from "react-kakao-login";

class Kakao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "kakao",
    };
  }

  responseKaKao = res => {
    this.setState({
      data: res,
    });
    alert(JSON.stringify(this.state.data));
  };

  responseFail = err => {
    alert(err);
  };

  render() {
    return (
      <>
        {/* <StyledText>
          <h1>카카오톡 간편 로그인</h1>
          <h4>로그인 후 더 많은 혜택을 누리세요!</h4> */}
          {/* <StKaKaoLogin>
            <img src={'https://developers.kakao.com/tool/resource/static/img/button/login/full/ko/kakao_login_medium_narrow.png'} alt="a" onClick={this.loginWithKakao} />
          </StKaKaoLogin> */}
          {/* <br></br> */}
          <KaKaoBtn
            jsKey={"4835800b3d8f6f4b36c85d157690121c"}
            buttonText="KaKao"
            onSuccess={this.responseKaKao}
            onFailure={this.responseFail}
            getProfile={true}
          />
        {/* </StyledText> */}
      </>
    );
  }
}
// const StKaKaoLogin = styled.div`
//   cursor: pointer;
//   /* border-radius:10px; */
//   /* width: 200px; */
//   /* &:hover{
//         box-shadow: 0 0px 0px 0 rgba(0, 0, 0, 0.2), 0 0px 20px 0 rgba(0, 0, 0, 0.19);
//     } */
// `;

const KaKaoBtn = styled(KaKaoLogin)`
  padding: 0;
  width: 190px;
  height: 44px;
  line-height: 44px;
  color: #783c00;
  background-color: #ffeb00;
  border: 1px solid transparent;
  border-radius: 3px;
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  }
`;

export default Kakao;
