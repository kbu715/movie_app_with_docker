import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { API_URL,IMAGE_BASE_URL } from "../../../Components/Config";


const LinkWrapper = styled(Link)`
  text-decoration: none;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: ${props => (props.loaded ? '1' : '0')};
  visibility: ${props => (props.loaded ? 'visible' : 'hidden')};
`;

const MovieImg = styled.img`
  width: 5rem;
  height: 5rem;
  border-radius: 50%;
  object-fit: cover;
  background-color: transparent;
  transition: all 100ms cubic-bezier(0.645, 0.045, 0.355, 1);
`;

const CastItem = ({ person }) => {
  const [loaded, setLoaded] = useState(false);     
  const [imagePath, setPath] = useState(person.profile_path);
  
  return (     
    <LinkWrapper
      loaded={loaded ? 1 : 0}
      to={`${API_URL}/person/${person.id}`}
    >
      <MovieImg
        src={`${IMAGE_BASE_URL}w185${imagePath}`}        
        // src={`${IMAGE_BASE_URL}w185${person.profile_path}`}        
        onLoad={() => setLoaded(true)}        
      />
    </LinkWrapper>
  
  );
};

export default CastItem;
