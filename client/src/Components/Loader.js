import React from "react";
import styled from "styled-components";
const Container = styled.div `
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  font-size: 28px;
  margin-top: 20px;
`;
export default() => (
    <Container>
        <span role="img" aria-label="Loading"> 
     
        </span>
    </Container>
);

//시각 장애인들에게 screen reader라는 것이 있는데 읽으려고 하면 작동하지 않아
// 그래서 네가 screen reader에게 말해야해 헤이 "loading"...