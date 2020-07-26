import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Booking from "../Booking/Booking";

const Button = styled.button`
  -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
  color: white;
  border-color: white;
  background: transparent;
  margin-left: 5px;
`;

const Reservation = ({ id, title, bgImage, userFrom }) => {
  return (
    <>
      <Popup
        trigger={<Button className="button">간편예매</Button>}
        modal
        closeOnDocumentClick={true}
        triggerOn="click"
      >
        <Booking id={id} title={title} bgImage={bgImage} userFrom={userFrom} />
      </Popup>
    </>
  );
};

export default Reservation;
