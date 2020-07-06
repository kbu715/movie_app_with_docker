import React from "react";
import styled from "styled-components";
import {Link, withRouter} from "react-router-dom";

const Header = styled.header `
  color: white;
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  background-color: rgba(20, 20, 20, 0.8);
  z-index: 100;
  box-shadow: 0px 1px 5px 2px rgba(0, 0, 0, 0.8);
  
`;


const List1 = styled.ul `
  display: flex;
  justify-content: flex-start;
  
  width: 100%;
  
`;

const List2 = styled.ul `
  display: flex;
  justify-content: flex-end;
  float:right;
  
  width: 100%;
  
`;
const Item = styled.li `
  width: 80px;
  height: 50px;
  float: right;
  text-align: center;
  border-bottom: 5px solid ${props => (
    props.current
        ? "#e50914"
        : "transparent"
)};
  transition:border-bottom .5s ease-in-out;
`;


const SLink = styled(Link)` 
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;





export default withRouter(({location: {
        pathname
    }}) => //withRouter 때문에 props를 가질 수 있다.          
    (
    <Header>
        <List1>
            <Item current={pathname === "/"}>
                <SLink to="/">Movies</SLink>
            </Item>
            <Item current={pathname === "/tv"}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={pathname === "/search"}>
                <SLink to="/search">Search</SLink>
            </Item>

        </List1>

        <List2>
            <Item current={pathname === "/sign-in"}>
                <SLink to="/sign-in">Login</SLink>
            </Item>
            <Item current={pathname === "/sign-up"}>
                <SLink to="/sign-up">SignUp</SLink>
            </Item>

            <Item current={pathname === "/logout"}>
                <SLink to="/logout">Logout</SLink>
            </Item>
          
          </List2>
    </Header>
));

//const SLink = styled(Link)``; : React Router에서 주어진 Link, 이런식으로 스타일을 추가 할 수있다.

//npm i styled-reset : SC를 이용해서 CSS를 초기화해서 0의 상태에서 시작하게 하는 거야

//position:fixed 스크롤해도 그자리에 있게 하기 위해