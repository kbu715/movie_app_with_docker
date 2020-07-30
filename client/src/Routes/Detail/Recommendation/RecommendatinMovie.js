import React from "react";
import styled from "styled-components";
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
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

const RecommendatinMovie = ({ movie, id }) => {
  return (
    // <Link to={`/movie/${id}`}>
    <a href={`/movie/${id}`}>
      <MovieImg
        src={
          movie.poster_path
            ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
            : "https://www.movienewz.com/img/films/poster-holder.jpg"
        }
      />
      <Title>
        {movie.title.length > 12
          ? `${movie.title.substring(0, 8)}...`
          : movie.title}
      </Title>
      {/* {title.length > 18 ? `${title.substring(0, 8)}...` : title} */}
      {/* </Link> */}
    </a>
  );
};

export default RecommendatinMovie;
