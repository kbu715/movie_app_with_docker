import "date-fns";
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
// import { Grid, TextField, MenuItem, createMuiTheme } from "@material-ui/core";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import Booking from "../Booking/Booking";
// import Button from "@material-ui/core/Button";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import Axios from "axios";

const Reservation = ({ id, title, bgImage, userFrom }) => {
  const [selectDay, setSelectedDay] = useState(null);
  const [time, setTime] = useState(0);
  const [timeTable, setTimeTable] = useState([]);
  // const Continentss = [
  //   { key: 1, value: "11:00" },
  //   { key: 2, value: "13:00" },
  //   { key: 3, value: "15:00" },
  //   { key: 4, value: "17:00" },
  // ];
  const arr = [];
  useEffect(() => {
    Axios.get("/api/getTimeData").then(response => {
      console.log("넘어오나", response.data.timeData);
      response.data.timeData.forEach(element => {
        arr.push(element);
      });
      setTimeTable(arr);
    });
    console.log("timeTable", timeTable);
  }, []);
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

  const onTime = event => {
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

{/* ==================================================================================================== */}
{/* ============================================ Css랑 겹침 ============================================ */}
{/* ==================================================================================================== */}
<Wrapper>
          {/* <Grid item xs>
            <TextField
              color="secondary"
              fullWidth
              select
              value={time}
              label="Time"
              variant="filled"
              onChange={onTime}
            >
              {timeTable.map(item => (
                <MenuItem key={item.key} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid> */}
{/* ==================================================================================================== */}
{/* ============================================ Css랑 겹침 ============================================ */}
{/* ==================================================================================================== */}
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