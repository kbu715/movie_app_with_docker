import React, { useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const StarsWrapper = styled.span`
  line-height: 1;
  margin-left: 50px;
`;

const Rating = (props) => {
  console.log("props:", props); //id, title
  const [value, setValue] = useState();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [movieId, setMovieId] = useState("");
  const [select, setSelect] = useState("");

  const fetchStarRating = (value) => {
    console.log(props); //id, imgUrl, title

    axios
      .post("/api/myscore/giveStarRating", {
        userFrom: localStorage.getItem("userId"),
        myScore: value,
        movieId: props.id,
      })
      .then((response) => {
        if (response.data.success) {
          setValue(response.data.myscore);
          setMovieId(response.data.movieId);
        } else {
          alert("평가하기를 실패하였습니다.");
        }
      });
  };

  const deletePoster = () => {
    console.log("deletePoster");
    setMovieId(props.id);
  };

  const onClickHandler = (value) => {
    setValue(value);
    //별점 추가
    fetchStarRating(value);

    //포스터 삭제
    deletePoster();
  };
  return (
    <StarsWrapper>
      <Rate onChange={onClickHandler} error={error} loading={loading} />
    </StarsWrapper>
  );
};

export default Rating;
