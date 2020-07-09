import React from 'react';
import styled from 'styled-components';
import Stars from 'react-rating';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StarsWrapper = styled(Stars)`
  line-height: 1;
`;

const FontAwesome = styled(FontAwesomeIcon)`
  color: #fff000;
  transition: color 300ms cubic-bezier(0.600, 0.045, 0.355, 1);
  margin-right: 10px;


`;


const Rating = ({ number }) => {
  return (
    <StarsWrapper
      emptySymbol={<FontAwesome icon={['far', 'star']} size="lg" />}
      fullSymbol={<FontAwesome icon={['fas', 'star']} size="lg" />}
      initialRating={number}
      readonly
    />
  );
};

export default Rating;
