import React, { useState } from "react";
import styled from "styled-components";
import { Rate } from "antd";
import "antd/dist/antd.css";
import axios from "axios";

const StarsWrapper = styled.span`
  line-height: 1;
  margin-left: 50px;
`;

const Rating = ({movieId, select, setSelect }) => { //props:movieId, imageUrl, title, select, setSelect
  
  const [value, setValue] = useState(0);
  const [movie, setMovie] = useState(movieId);

  const fetchStarRating = (value) =>{
    console.log(movie);

     // if(movie !== select.map(item=>item.movieId)) { //별점 주기
        axios.post("/api/users/giveStarRating", {
          //DB에 들어갈 값
          myScore :value,
          movieId: movie,
          select: [...select,movie]
        }).then(response=>{
          if (response.data.success) {
            setValue(response.data.myscore)
            setMovie(response.data.movieId)
            setSelect([...select, movie])
          } else {
            alert("평가하기를 실패하였습니다.")
          }
        })
        
      // } else { //별점 수정하기
      //   axios.post("/api/myscore/regiveStarRating", {
      //     myScore: value,
      //     movieId: movie,
      //   }).then(response=>{
      //     if(response.data.success) {
      //       setValue(response.data.myscore)
      //     } else {
      //       alert("별점 수정을 실패하였습니다.")
      //     }
      //   })
      //}
  }

  const onClickHandler = (value) => {
    //별점 추가
    fetchStarRating(value);
  };
  return (
    <StarsWrapper>
      <Rate onChange={onClickHandler} allowClear={false}/>
    </StarsWrapper>
  );
};

export default Rating;