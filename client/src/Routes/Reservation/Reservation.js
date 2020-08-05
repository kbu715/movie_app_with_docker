import "date-fns";
import React, { useState } from "react";
import Popup from "reactjs-popup";
// import { Grid, TextField, MenuItem, createMuiTheme } from "@material-ui/core";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Booking from "../Booking/Booking";
// import Button from "@material-ui/core/Button";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import Select from 'react-select';
import styled from "styled-components";

const colourStyles = {
  control: styles => ({
    ...styles, 
    backgroundColor: 'white', 
    borderRadius: "1rem",
    fontSize: "1.1rem", width: "250px",
    marginTop:"25px",
    height: "40px", 
    border: "1px solid #9c88ff",
    boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
    color: "#2e2e2e",
    fontWeight: "400",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? 'red' : '#f7f7f7',
      backgroundColor: isFocused ? '#D8CEF6' : '#f7f7f7',
      color: '#151515',
      fontSize: "1.1rem",
      cursor: isDisabled ? 'not-allowed' : 'default',
    };
  },
};

const Button1 = styled.button`
 color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight:600;
  background-color: #151515;
  margin-left: 20px;
  padding: 5px;
  box-shadow: 0 1.5rem 2rem rgba(156, 136, 255, 0.2);
`;

const Wrapper = styled.div`
  /* padding: 5px; */
  margin: 0 auto;
  width: max-content;
  height: 60px;
  /* margin-bottom: 10px; */
`;

const Continentss = [
  { key: 1, label: "11:00", value: "11:00" },
  { key: 2, label: "13:00", value: "13:00" },
  { key: 3, label: "15:00", value: "15:00" },
  { key: 4, label: "17:00", value: "17:00" },
];

const groupedOptions = [
  {
    options: Continentss,
  }
];

const Reservation = ({ id, title, bgImage, userFrom }) => {
  const [selectDay, setSelectedDay] = useState(null);
  const [time, setTime] = useState(0);

  const renderCustomInput = ({ ref }) => {

    return (
      <input
        readOnly
        ref={ref}
        placeholder="날짜를 선택해주세요"
        value={
          selectDay ? `${selectDay.year}-${selectDay.month}-${selectDay.day}` : ""
        }
        style={{
          textAlign: "center",
          borderRadius: "1rem",
          fontSize: "1.1rem",
          border: "1px solid #9c88ff",
          boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
          color: "#2e2e2e",
          outline: "none",
          // marginLeft:"10px",
          width: "250px",
          height: "40px",
          marginTop:"20px",
          // marginBottom:"10px",
        }}
        className="my-custom-input-class"
      />
    )
  };




  const onTime = (event) => {
    setTime({ time: event.value });
  };

  return (
    <Popup
      trigger={
        <Button1 variant="contained" color="primary">
          간편예매
          </Button1>
      }
      modal
      closeOnDocumentClick={true}
      triggerOn="click"
      contentStyle={{ backgroundColor: "#242333", width: "500px", borderRadius: "10px", padding: "1%", border: "2px solid #848484" }}
    // style={{background:"black"}}
    >
      {/* <Grid container style={{ background: "#242333"}}> */}
      <Wrapper>
        <DatePicker
          // contentStyle={{marginTop:"10px"}}
          value={selectDay}
          onChange={setSelectedDay}
          minimumDate={utils().getToday()}
          renderInput={renderCustomInput}
          shouldHighlightWeekends
        />
      </Wrapper>

      <Wrapper>
        <Select
          options={groupedOptions}
          defaultValue={groupedOptions[0]}
          styles={colourStyles}
          onChange={onTime}
        />
      </Wrapper>

      <Wrapper>
        <Popup
          trigger={
            <Button1 variant="contained" color="primary" style={{
              height:"40px",
              width:"80px",
              backgroundColor: "transparent",
              fontWeight:"1000",
              fontSize: "15px",
              padding: "0px",
              marginLeft: "0px"
              }} >
              다음
            </Button1>
          }
          modal
      contentStyle={{ backgroundColor: "#242333", borderRadius: "10px", padding: "1%", border: "2px solid #848484" }}

          closeOnDocumentClick={true}
          triggerOn="click"
        >
          <Booking
            id={id}
            title={title}
            bgImage={bgImage}
            userFrom={userFrom}
            selectDay={selectDay}
            time={time}
          />
        </Popup>
      </Wrapper>
      {/* </Grid> */}
    </Popup>
  );
};

export default Reservation;