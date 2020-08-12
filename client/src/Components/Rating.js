import React from "react";
import styled from "styled-components";
import Stars from "react-rating";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const StarsWrapper = styled(Stars)`
  line-height: 0.5;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: white;
  transition: color 300ms cubic-bezier(0.6, 0.045, 0.355, 1);
  margin-right: 5px;
`;

const Rating = ({ number }) => {
  return (
    <StarsWrapper
      emptySymbol={<FontAwesome icon={["far", "star"]} size="lg"/>}
      fullSymbol={<FontAwesome icon={["fas", "star"]} size="lg"/>}
      initialRating={number}
      readonly
    />
  );
};

export default Rating;
