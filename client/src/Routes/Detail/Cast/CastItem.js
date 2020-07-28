import React /*useState*/ from "react";
import styled from "styled-components";

import { IMAGE_BASE_URL } from "../../../Components/Config";

const MovieImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: transparent;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
  padding: 9px;
`;

const CastItem = ({ person }) => {
  return (
    <MovieImg
      src={`${IMAGE_BASE_URL}w185${
        person.profile_path ? person.profile_path : "/assets/noImage.png"
      }`}
    />
  );
};

export default CastItem;
