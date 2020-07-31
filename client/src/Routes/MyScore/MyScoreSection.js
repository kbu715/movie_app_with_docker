import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Popup from 'reactjs-popup';
import Result from './Result/Result'

const Container = styled.div`
  :not(:last-child) {
    margin-bottom: 60px;
  }
  margin: 0 auto;
  width: 90%;
`;

const Title = styled.span`
  font-size: 30px;
  font-weight: 600;
  padding: 0px 0px 10px;
  position: relative;
`;

const Grid = styled.div`
  margin-top: 30px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-gap: 100px;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const PopUpButton = styled.button`
  color: #FF8000;
  border: 2px solid #FF8000;
  border-radius: 5px;
  font-size: 18px;
  background-color: black;
  margin-left: 20px;
  padding: 5px;
`;

const MyScoreSection = ({ title, children }) => (
  <Container>
    <Title>{title}</Title>
    <Popup trigger={<PopUpButton>결과보기</PopUpButton>}
      modal
      closeOnDocumentClick
      contentStyle={{backgroundColor: "#F2F2F2"}}>
      {close => <Result close={close}/>}
    </Popup>
    <Grid>{children}</Grid>
  </Container>
);

MyScoreSection.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MyScoreSection;
