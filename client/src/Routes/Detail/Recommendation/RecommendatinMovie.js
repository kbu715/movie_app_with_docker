import React /*useState*/ from "react";
import styled from "styled-components";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../../../Components/Config";

const MovieImg = styled.img`
  width: 160px;
  height: 250px;
  margin-right: 30px;
  background-size: cover;
  border-radius: 4px;
  transition: all 0.1s linear 0s;
  margin-bottom: 10px;
  // border: 1px solid blue;
`;

const Title = styled.span`
  font-weight: 700;
  text-align: center;
  display: block;
  margin-bottom: 3px;
  margin-right: 30px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  // border: 1px solid pink;
  
`;

const RecommendatinMovie = ({ movie }) => {
  return (
    <>
      <a href={`/movie/${movie.id}`}>
        <MovieImg
          src={`${IMAGE_BASE_URL}${POSTER_SIZE}${
            movie.poster_path ? movie.poster_path : "/assets/noImage.png"
          }`}
        />
        <Title>{movie.title}</Title>
      </a>
    </>
  );
};

export default RecommendatinMovie;
