import React, { useState } from "react";
import Popup from "reactjs-popup";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Booking from "../Booking/Booking";
import Button from "@material-ui/core/Button";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";

const Continentss = [
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
const Cinema = [
  { key: 1, value: "CGV" }, 
  { key: 2, value: "롯데시네마" },
  { key: 3, value: "메가박스" },
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
        selectDay ? `${selectDay.year}-${selectDay.month}-${selectDay.day}` : ""
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
  const onTheaters = event => {
    setTheaters({ theaters: event.target.value });
  };

  const onTime = event => {
    setTime({ time: event.target.value });
  };
  return (
    <>
      <Popup
        trigger={
          // <Button className="button">
          <Button variant="contained" color="primary">
            간편예매
          </Button>
          // </Button>
        }
        modal
        closeOnDocumentClick={true}
        triggerOn="click"
      >
        <Grid container spacing={3}>
          <Grid item xs>
            <DatePicker
              value={selectDay}
              onChange={setSelectedDay}
              minimumDate={utils().getToday()}
              renderInput={renderCustomInput}
              shouldHighlightWeekends
            />
          </Grid>

          <Grid item xs>
            <TextField
              color="secondary"
              fullWidth
              select
              value={theaters}
              label="Cinema"
              variant="filled"
              onChange={onTheaters}
            >
              {Cinema.map((cinema, index) => (
                <MenuItem key={cinema.key} value={cinema.value}>
                  {cinema.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs>
            <TextField
              color="secondary"
              fullWidth
              select
              value={time}
              label="Time"
              variant="filled"
              onChange={onTime}
            >
              {Continentss.map(item => (
                <MenuItem key={item.key} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

        </Grid>


        {/* ------------------------------------------------------------------------------------ */}
        <Popup
          trigger={
            // <Button className="button">
            <Button variant="contained" color="primary">
              다음
          </Button>
            // </Button>
          }
          modal
          closeOnDocumentClick={true}
          triggerOn="click"
        >
          <Booking id={id} title={title} bgImage={bgImage} userFrom={userFrom} selectDay={selectDay} time={time} theaters={theaters} />
        </Popup>
      </Popup>


    </>
  );
};

export default Reservation;
