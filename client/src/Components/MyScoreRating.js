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
  const onChangeHandle = (value) => {
    setValue({ value });
    console.log(value);
  };

  console.log("props",props);

  useEffect(() => {
    const body = {
      movieId: props.id,
      movieTitle: props.title,
      myScore: value,
    };
    axios.post("/api/users/giveStarRating", body).then((response) => {
      console.log("response:", response);
    });
  }, []);

  return (
    <StarsWrapper>
      <Rate onChange={onChangeHandle} value={value} />
    </StarsWrapper>
  );
};

export default Rating;