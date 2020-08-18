import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Reservation from "../Routes/Reservation/Reservation";
import ReservationAll from "../Routes/Reservation/ReservationAll";

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
  font-size: 30px;
  font-weight: 400;
  color: lime;
  /* margin-left: 30px; */
  padding: 0px 10px 2px;
  border-width: 2px;
  border-color: mediumslateblue;
  border-image: initial;
  border-radius: 5px;
  transition: all 0.2s ease 0s;
`;
const Grid = styled.div`
  margin-top: 30px;
  display: flex;
  border-radius: 0.8rem;
  align-items: center;
  width: 100%;
  height: 10%;
  overflow-x: auto;
  overflow-y: hidden;
  &::-webkit-scrollbar {
    width: 40px;
    height: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: mediumslateblue;
  }
`;
const Section = (
  { title, children, nowPlaying } // children 예약된 react prop
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
        <TitleSub>{title}</TitleSub>
      </Title>
      {title === "Now Playing" ? (
        <>
          <Reservation
            // style={{border:"1px solid red"}}
            nowPlaying={nowPlaying}
            userFrom={localStorage.getItem("userId")}
          />
          <ReservationAll
            // style={{border:"1px solid red"}}
            nowPlaying={nowPlaying}
            userFrom={localStorage.getItem("userId")}
          />
        </>
      ) : null}
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