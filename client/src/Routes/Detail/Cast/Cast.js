import React from "react";
import CastItem from "./CastItem";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Test = styled.div`
  margin-top: 10px;
  display: flex;
  overflow: auto;
`;

const Credits = ({ cast }) => {
  console.log(cast)
  const items = cast.map((person) => (
    <CastItem person={person} key={person.id} />
  ));

  return (
    <Wrapper>
      <Test>{items}</Test>
    </Wrapper>
  );
};

export default Credits;
