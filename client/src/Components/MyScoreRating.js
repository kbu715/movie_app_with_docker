import React from "react";
import styled from "styled-components";
import Stars from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarsWrapper = styled(Stars)`
  line-height: 1;
  /* margin: 0 auto; */
  margin-left: 50px;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: #dadbcd;
  transition: color 500ms cubic-bezier(0.6, 0.045, 0.355, 1);
  /* border: 1px solid green; */
  margin-left: 10px;
`;

const Rating = () => {

  return (
    <StarsWrapper
      emptySymbol={<FontAwesome icon={["far", "star"]} size="lg" />}
      fullSymbol={<FontAwesome icon={["fas", "star"]} size="lg" />}
    />
  );
};

export default Rating;
