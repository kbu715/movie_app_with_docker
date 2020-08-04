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

const Grid = styled.div`
/* margin-top: 3px; */
  display: grid;
  /* margin-left: 20px; */
  /* border: 1px solid red; */
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  grid-gap: 10px;
  width: 100%;
  height:100%;
  /* overflow-x: auto;
  overflow-y: hidden; */
`;

const Button1 = styled.button`
 color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight:600;
  background-color: #151515;
  margin-left: 20px;
  padding: 5px;
`;

const Wrapper = styled.div`
  padding: 5px;
  margin: 0 auto;
`;
const Button2 = styled.button`
 color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 15px;
  height:40px;
  font-weight:1000;
  background-color: transparent;
  padding: 5px;
  padding-left: 10px;
  padding-right: 10px;
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

  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="날짜를 선택해주세요"
      value={
        selectDay ? `${selectDay.year}-${selectDay.month}-${selectDay.day}` : ""
      }
      style={{
        textAlign: "center",
        borderRadius:"1rem",
        fontSize: "1.1rem",
        border: "1px solid #9c88ff",
        boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
        color: "#9c88ff",
        outline: "none",
        marginLeft:"10px",
        width:"250px",
        height:"40px",
        marginTop:"10px",
        marginBottom:"10px",
      }}
      className="my-custom-input-class"
    />
  );

  const onTime = (event) => {
    setTime({ time: event.target.value });
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
        // style={{background:"black"}}
      >
        <Grid container style={{ background: "#242333"}}>
            <DatePicker
              value={selectDay}
              onChange={setSelectedDay}
              minimumDate={utils().getToday()}
              renderInput={renderCustomInput}
              shouldHighlightWeekends
            />
            <Select
    options={groupedOptions}
    defaultValue={groupedOptions[0]}
    />

<Wrapper>

            <Popup
              trigger={
                <Button2 variant="contained" color="primary" >
                 다음
                </Button2>
              }
              modal
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
        </Grid>
      </Popup>
  );
};

export default Reservation;