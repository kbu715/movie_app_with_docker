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
  const [value, setValue] = useState(0);
  const [movieId, setMovieId] = useState(null);
  
  const fetchStarRating = (score) =>{
    setValue(score);

    axios.post("/api/myscore/giveStarRating", {
      userFrom: localStorage.getItem("userId"),
      myScore :score,
      movieId: movieId,
    }).then(response=>{
      if (response.data.success) {
        setMovieId(response.data.doc.movieId)
        // console.log(value,"asdf",props.movieId);
        props.setSelect([...props.select,props.movieId])
        // console.log("select:", props.select);
        //setMovies([...Movies, ...result.results]) //movies+result
        
      } else {
        alert("평가하기를 실패하였습니다.")
      }
    })
  }

  const onClickHandler = (value) => {
    //별점 추가
    fetchStarRating(value);

    //별점 counting

    props.setCount(props.select.length)
  };
  return (
    <StarsWrapper>
      <Rate onChange={onClickHandler} allowClear={false}/>
    </StarsWrapper>
  );
};

export default Rating;