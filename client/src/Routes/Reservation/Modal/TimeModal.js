import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "../style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker from "react-modern-calendar-datepicker";
import Reservation from "../Reservation";
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
`;

const Container = styled.div`
  margin: 20px 0;
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

const TimeModal = ({ id, title, bgImage }) => {
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
      <Popup trigger={<Button>간편 예매</Button>} modal closeOnDocumentClick>
        <Wrapper>
          <Container>
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
          </Container>
          <Reservation />
        </Wrapper>
      </Popup>
    </>
  );
};

export default TimeModal;
