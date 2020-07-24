import React from "react";
import RecommendatinMovie from "./RecommendatinMovie";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Test = styled.div`
  margin-top: 10px;
  display: flex;
  overflow: auto;
`;
const Title = styled.span`
  font-size: 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem 3rem;
  @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap");
  font-family: "Noto Sans KR", sans-serif;
`;

const Recommendation = ({ recommendation }) => {
  const movies = recommendation.map(movie => (
    <RecommendatinMovie movie={movie} key={movie.id} />
  ));

  return (
    <>
      <Title>RECOMMENDATIONS</Title>
      <Wrapper>
        <Test>{movies}</Test>
      </Wrapper>
    </>
  );
};

export default Recommendation;
