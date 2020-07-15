import React from "react";
import styled from "styled-components";
import { Link, withRouter } from "react-router-dom";
import Axios from "axios";
import { useSelector } from "react-redux";
const Header = styled.header`
  /* color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  //background-color: rgba(20, 20, 20, 0.8);
  background: transparent;
  z-index: 1;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8); */
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  width: 100%;
  height: 70px;
  background-color: transparent;
  transition: background-color 0.5s linear;
`;
const List1 = styled.ul`
  // display: flex;
  justify-content: flex-start;
  width: 100%;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 37px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 10px;
`;
const List2 = styled.ul`
  // display: flex;
  justify-content: flex-end;
  float: right;
  width: 100%;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  font-size: 18px;
  font-weight: 300;
  height: 44px;
`;
const Item = styled.li`
  // width: 80px;
  // height: 50px;
  // float: right;
  // text-align: center;
  // border-bottom: 5px solid
  //   ${props => (props.current ? "#e50914" : "transparent")};
  // transition: border-bottom 0.5s ease-in-out;
  font-weight: 400;
  padding: 7px 10px;
  font-size: 14px;
  -webkit-transition: background .125s ease;
  transition: background .125s ease;
  border-radius: 3px;
  &:hover {
    background: #e50914;
    cursor: pointer;
  }
`;
const SLink = styled(Link)`
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export default withRouter(
  (
    props //withRouter 때문에 props를 가질 수 있다.
  ) => {
    const user = useSelector(state => state.user);

    const {
      location: { pathname },
    } = props;
    const logoutHandler = () => {
      Axios.get("/api/users/logout").then(response => {
        if (response.status === 200) {
          alert("정말로 로그아웃 하시겠습니까");
          props.history.push("/login");
        } else {
          alert("로그 아웃 실패");
        }
      });
    };
    return (
      <>
        <Header>
          <>
            <List1>
              <Item current={pathname === "/"}>
                <SLink to="/">Movies</SLink>
              </Item>
              <Item current={pathname === "/search"}>
                <SLink to="/search">Search</SLink>
              </Item>
              <Item current={pathname === "/favorite"}>
                <SLink
                  to={
                    user.userData && !user.userData.isAuth
                      ? "/sign-in"
                      : "/favorite"
                  }
                >
                  MyList
                </SLink>
              </Item>
              <Item current={pathname === "/myscore"}>
                <SLink to="/myscore">평가</SLink>
              </Item>
            </List1>
            {user.userData && !user.userData.isAuth ? (
              <List2>
                <Item current={pathname === "/sign-in"}>
                  <SLink to="/sign-in">Login</SLink>
                </Item>
              </List2>
            ) : (
              <List2>
                <Item>
                  <SLink to="/" onClick={logoutHandler}>
                    Logout
                  </SLink>
                </Item>
              </List2>
            )}
          </>
        </Header>
      </>
    );
  }
);
//const SLink = styled(Link)``; : React Router에서 주어진 Link, 이런식으로 스타일을 추가 할 수있다.
//npm i styled-reset : SC를 이용해서 CSS를 초기화해서 0의 상태에서 시작하게 하는 거야
//position:fixed 스크롤해도 그자리에 있게 하기 위해
