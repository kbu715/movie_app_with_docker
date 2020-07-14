import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 60px;
  }
  margin: 0 auto;
  width: 90%;
`;
const Title = styled.span`
  position: relative;
  font-size: 30px;
  font-weight: 600;
  padding: 0px 0px 30px;
`;
const TitleSub = styled.a`
  font-size: 15px;
  font-weight: 400;
  color: tomato;
  margin-left: 30px;
  padding: 0px 10px 2px;
  border-width: 2px;
  border-style: solid;
  border-color: tomato;
  border-image: initial;
  border-radius: 5px;
  transition: all 0.2s ease 0s;
`;
const Grid = styled.div`
  margin-top: 30px;
  display: flex;
  //flex-direction: column;
  //justify-content:center
  border-radius: 0.8rem;

  align-items: center;
  width: 100%;
  height: 10%;
  overflow-x: auto;
  overflow-y: hidden;

  &::-webkit-scrollbar {
    width: 10px;
    height: 8px;
    background: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #ff0000;
    opacity: 0.4;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: none;
    box-shadow: inset 0px 0px 10px;
    overflow: auto;

    transform: translate3d(3px, 0px, 0px);
    transition-duration: 0ms;
  }
`;

const Section = (
  { title, children } // children 예약된 react prop
) => (
  <Container>
    <Title>
      {title}
      <TitleSub href="#/movie">View More</TitleSub>
    </Title>
    <Grid>{children}</Grid>
  </Container>
);

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node, //구글링
  ]),
};
export default Section;
