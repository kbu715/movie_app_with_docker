import React, { useEffect, useState } from "react";
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
  // const onChangeHandle = (value) => {
  //   setValue({ value });
  //   console.log(value);
  // };

  useEffect(() => {
    const body = {
      movieId: props.id,
      movieTitle: props.title,
      myScore: value,
    };
    axios.post("/api/myscore/giveStarRating", body).then((response) => {
      // const response:{request:{response : res}}
      const res = response.request.response
      console.log("response:", res);
    });
  }, []);

  return (
    <StarsWrapper>
      <Rate />
    </StarsWrapper>
  );
};

export default Rating;

/*
import { Rate } from 'antd';

ReactDOM.render(<Rate />, mountNode);
*/