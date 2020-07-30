import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import Slider from "react-slick";
// import "../../node_modules/slick-carousel/slick/slick.css";
// import "../../node_modules/slick-carousel/slick/slick-theme.css";

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 60px;
  }
  margin: 0 auto;
  width: 100%;
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
  color: lime;
  margin-left: 30px;
  padding: 0px 10px 2px;
  border-width: 2px;
  border-style: solid;
  border-color: mediumslateblue;
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
  overflow-style: none;

  &::-webkit-scrollbar {
   
    width: 10px;
    height: 8px;
    background-color: #a0a0a0;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #a0a0a0;

    opacity: 1;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: #a0a0a0;

    box-shadow: inset 0px 0px 10px;
    overflow: auto;
    opacity: 100%;

    transform: translate3d(3px, 0px, 0px);
    transition-duration: 0ms;
  }
`;

const Section = (
  { title, children } // children 예약된 react prop
) => {
  // const settings = {
  //   dots: true,
  //   lazyLoad: true,
  //   infinite: true,
  //   speed: 500,
  //   slidesToShow: 1,
  //   slidesToScroll: 1,
  //   initialSlide: 2,
  // };
  return (
    <Container>
      <Title>
        {title}
        <TitleSub href="#/movie">View More</TitleSub>
      </Title>
      <Grid>{children}</Grid>
    </Container>
  );
};

Section.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node, //구글링
  ]),
};
export default Section;
