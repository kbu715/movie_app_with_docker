import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";

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

const Wrapper = styled.div`
  background-color: #242333;
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 85vh;
  font-family: "Lato", sans-serif;
  margin: 0;
  border: 1px solid red;
`;

const Container = styled.div`
  margin: 20px 0;
`;

const Cover = styled.div`
  width: 30%;

  background-image: url(${(props) => props.bgImage});

  background-position: center center;

  background-size: cover;

  height: 30%;

  border-radius: 5px;
`;

const Select = styled.select`
  margin: 20px 0;
  background-color: #fff;
  border: 0;
  border-radius: 5px;
  font-size: 14px;
  margin-left: 10px;
  padding: 5px 15px 5px 15px;
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
`;

const Reservation = ({ id, title, bgImage }) => {
  const [selectDay, setSelectedDay] = useState(null);
  const [theaters, setTheaters] = useState("");
  const [time, setTime] = useState("");
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="날짜를 선택해주세요"
      value={
        selectDay
          ? `✅: ${selectDay.year}-${selectDay.month}-${selectDay.day}`
          : ""
      }
      style={{
        textAlign: "center",
        padding: "1rem 1.5rem",
        fontSize: "1.1rem",
        border: "1px solid #9c88ff",
        borderRadius: "70px",
        boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
        color: "#9c88ff",
        outline: "none",
      }}
      className="my-custom-input-class"
    />
  );
  const onTheaters = (event) => {
    setTheaters({ theaters: event.target.value });
  };

  const onTime = (event) => {
    setTime({ time: event.target.value });
  };
  return (
    <>
      <Popup
        trigger={<Button className="button">간편예매</Button>}
        modal
        closeOnDocumentClick
      >
        <Wrapper>
          <DatePicker
            value={selectDay}
            onChange={setSelectedDay}
            renderInput={renderCustomInput}
            shouldHighlightWeekends
          />

          <Select onChange={onTheaters}>
            <option value="1">CGV</option>
            <option value="2">메가박스</option>
            <option value="3">롯데시네마</option>
          </Select>

          <Select onChange={onTime}>
            <option value="1">11:00</option>
            <option value="2">13:00</option>
            <option value="4">15:00</option>
            <option value="5">17:00</option>
            <option value="6">19:00</option>
            <option value="7">21:00</option>
            <option value="8">23:00</option>
          </Select>
          <Container></Container>

          <ul className="showcase">
            <li>
              <div className="seat"></div> <small>빈좌석</small>
            </li>
            <li>
              <div className="seat selected"></div> <small>선택좌석</small>
            </li>
            <li>
              <div className="seat occupied"></div> <small>선택완료</small>
            </li>
          </ul>

          <div className="container">
            <div className="screen"></div>

            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>

            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat occupied"></div>
              <div className="seat occupied"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>

            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat occupied"></div>
              <div className="seat occupied"></div>
            </div>

            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>

            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat occupied"></div>
              <div className="seat occupied"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
            </div>

            <div className="row">
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat"></div>
              <div className="seat occupied"></div>
              <div className="seat occupied"></div>
              <div className="seat occupied"></div>
              <div className="seat"></div>
            </div>
          </div>

          <p className="text">
            You have selected <span id="count">0</span> seats for a price of $
            <span id="total">0</span>
          </p>
        </Wrapper>
      </Popup>
    </>
  );
};

export default Reservation;
