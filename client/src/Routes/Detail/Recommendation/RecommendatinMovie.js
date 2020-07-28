import React /*useState*/ from "react";
import styled from "styled-components";

import { IMAGE_BASE_URL, POSTER_SIZE } from "../../../Components/Config";

const MovieImg = styled.img`
  width: 200px;
  height: 300px;
  margin-right: 30px;
  background-size: cover;
  border-radius: 4px;
  transition: all 0.1s linear 0s;
`;

const RecommendatinMovie = ({ movie }) => {
  return (
    <a href={`/movie/${movie.id}`}>
      <MovieImg
        src={`${IMAGE_BASE_URL}${POSTER_SIZE}${
          movie.poster_path ? movie.poster_path : "/assets/noImage.png"
        }`}
      />
    </a>
  );
};

export default RecommendatinMovie;
