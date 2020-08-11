import React from "react";
import RecommendatinMovie from "./RecommendatinMovie";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Test = styled.div`
  margin-top: 10px;
  display: flex;
  overflow-y: hidden;
  overflow-x: auto; // 스크롤 있는 경우에만 표시
  &::-webkit-scrollbar {
    width: 40px;
    height: 10px;
  }
  &::-webkit-scrollbar-thumb {
    /* background-color: mediumslateblue;  */
    opacity: 1 important!;
  }
`;
// const Title = styled.span`
//   font-size: 18px;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   padding: 1.5rem 3rem;
//   @import url("https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap");
//   font-family: "Noto Sans KR", sans-serif;
// `;
const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  margin-top: 10px;
  color: white;

  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const Recommendation = ({ recommendation }) => {
  const movies = recommendation.map(movie => (
    <RecommendatinMovie movie={movie} key={movie.id} id={movie.id} />
  ));
  // console.log(movies)
  return (
    <>
      {movies.length !== 0 ? <Heading>RECOMMENDATIONS</Heading> : ""}
      <Wrapper>
        <Test>{movies}</Test>
      </Wrapper>
    </>
  );
};

export default Recommendation;
