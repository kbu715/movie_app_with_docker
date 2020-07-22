import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Popup from "reactjs-popup";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
// import { Calendar, utils } from "react-modern-calendar-datepicker";
import TimeModal from "./Modal/TimeModal";

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

const Nav = styled.div`
  background-color: #242333;
  padding: 5px 10px;
  border-radius: 5px;
  color: #777;
  list-style-type: none;
  display: flex;
  justify-content: space-between;
`;

const Continents = [
  { key: 1, value: "11:00" },
  { key: 2, value: "13:00" },
  { key: 3, value: "15:00" },
  { key: 4, value: "17:00" },
  { key: 5, value: "19:00" },
  { key: 6, value: "21:00" },
  { key: 7, value: "23:00" },
  { key: 8, value: "01:00" },
  { key: 9, value: "03:00" },
];

const Reservation = ({ id, title, bgImage, userFrom }) => {
  const [selectDay, setSelectedDay] = useState(null);
  const [theaters, setTheaters] = useState("");
  const [time, setTime] = useState(0);

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
        closeOnDocumentClick={true}
        triggerOn="click"
      >
        {/* <Nav>
          <Calendar
            value={selectDay}
            onChange={setSelectedDay}
            minimumDate={utils().getToday()}
            shouldHighlightWeekends
          />
        </Nav> */}
        <Nav>
          <DatePicker
            value={selectDay}
            onChange={setSelectedDay}
            minimumDate={utils().getToday()}
            renderInput={renderCustomInput}
            shouldHighlightWeekends
          />

          <Select onChange={onTheaters}>
            <option>CGV</option>
            <option>메가박스</option>
            <option>롯데시네마</option>
          </Select>

          <Select onChange={onTime}>
            {Continents.map((item) => (
              <option key={item.key} value={item.value}>
                {item.value}
              </option>
            ))}
          </Select>

          <TimeModal
            selectDay={selectDay}
            theaters={theaters}
            time={time}
            id={id}
            title={title}
            bgImage={bgImage}
            userFrom={userFrom}
          />
        </Nav>
      </Popup>
    </>
  );
};

export default Reservation;
