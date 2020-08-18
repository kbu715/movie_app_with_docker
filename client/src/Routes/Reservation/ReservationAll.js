import "date-fns";
import React, { useState } from "react";
import Popup from "reactjs-popup";
import "./style.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import BookingAll from "../Booking/BookingAll";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import Select from "react-select";
import styled from "styled-components";
const colourStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: "1rem",
    fontSize: "1.1rem",
    width: "250px",
    textAlign: "center",
    // marginTop: "25px",
    // height: "10px",
    border: "1px solid #9c88ff",
    boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
    color: "#2e2e2e",
    fontWeight: "400",
  }),
  option: (styles, { isDisabled, isFocused }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? "#d4d4d4" : "#f7f7f7",
      // backgroundColor: isFocused ? "#D8CEF6" : "#f7f7f7",
      color: "#151515",
      fontSize: "1.1rem",
      cursor: isDisabled ? "not-allowed" : "default",
    };
  },
};
const Button1 = styled.button`
  position: relative;
  color: rgb(120, 205, 1);
  border: 3px solid rgb(120, 205, 1);
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: #151515;
  margin-left: 20px;
  padding: 5px;
  box-shadow: 0 1.5rem 2rem rgba(156, 136, 255, 0.2);
`;
const Wrapper = styled.div`
  /* padding: 5px; */
  margin: 0 auto;
  /* border: 1px solid red; */
  width: max-content;
  /* height: 50px; */
  padding: 5px;
  /* margin-bottom: 10px; */
`;
const Wrapper2 = styled.div`
  // border: 1px solid red;
  // width: 100%;
  height: 200px;
  margin: 0 auto;
  padding: 5px;
  // vertical-align: middle;
`;
const Continents1 = [
  { key: 1, label: "11:00", value: "11:00" },
  { key: 2, label: "13:00", value: "13:00" },
  { key: 3, label: "15:00", value: "15:00" },
  { key: 4, label: "17:00", value: "17:00" },
  { key: 5, label: "19:00", value: "19:00" },
  { key: 6, label: "21:00", value: "21:00" },
  { key: 7, label: "23:00", value: "23:00" },
  { key: 8, label: "01:00", value: "01:00" },
];

const Continents2 = [
  { key: 1, label: "11:00", value: "11:00" },
  { key: 2, label: "13:00", value: "13:00" },
  { key: 3, label: "15:00", value: "15:00" },
  { key: 4, label: "17:00", value: "17:00" },
  { key: 5, label: "19:00", value: "19:00" },
  { key: 6, label: "21:00", value: "21:00" },
  { key: 7, label: "23:00", value: "23:00" },
  { key: 8, label: "01:00", value: "01:00" },
];
// const groupedOptions = [
//   {
//     options: Continentss,
//   },
// ];
const ReservationAll = ({ userFrom, nowPlaying }) => {
  const movieList = nowPlaying.map((movie, index) => ({
    key: (index + 1) * 2,
    label: movie.title,
    value: movie.title,
    poster: movie.poster_path,
    isDisabled: index > 2 ? true : false,
    id: movie.id,
  }));

  const movieOptions = [
    {
      options: movieList,
    },
  ];
  const [selectDay, setSelectedDay] = useState(null);
  const [time, setTime] = useState(0);
  const [movie, setMovie] = useState("");
  const [poster, setPoster] = useState("");
  const [id, setID] = useState(0);
  const [visible, setVisible] = useState(false);
  const [theater, setTheater] = useState(0);
  const [key, setKey] = useState(0);
  const renderCustomInput = ({ ref }) => (
    <input
      readOnly
      ref={ref}
      placeholder="  날짜를 선택해주세요"
      value={
        selectDay
          ? `  ${selectDay.year}-${selectDay.month}-${selectDay.day}`
          : ""
      }
      style={{
        // textAlign: "center",
        borderRadius: "1rem",
        fontSize: "1.1rem",
        border: "1px solid #9c88ff",
        boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
        color: "#2e2e2e",
        outline: "none",
        // marginLeft: "10px",
        width: "250px",
        height: "38px",
        // marginTop: "10px",
        // marginBottom: "10px",
      }}
      className="my-custom-input-class"
    />
  );
  const onTime = value => {
    setTime({ time: value });
  };
  const onMovie = event => {
    setMovie(event.value);
    setPoster(event.poster);
    setID(event.id);
    setVisible(true);
    setKey(event.key); //영화관 1관 2관 3관 .... 정하기 위해 씀
  };
  return (
    <Popup
      trigger={
        <Button1 variant="contained" color="primary">
          단체예매
        </Button1>
      }
      modal
      closeOnDocumentClick={true}
      triggerOn="click"
      contentStyle={{
        backgroundColor: "#242333",
        width: "500px",
        borderRadius: "10px",
        padding: "1%",
        border: "2px solid #848484",
      }}
      // style={{background:"black"}}
    >
      {/* <Grid container style={{ background: "#242333"}}> */}
      <Wrapper>
        <DatePicker
          value={selectDay}
          onChange={setSelectedDay}
          minimumDate={utils().getToday()}
          renderInput={renderCustomInput}
          shouldHighlightWeekends
        />
      </Wrapper>
      <Wrapper>
        <Select
          options={movieOptions}
          // defaultValue={groupedOptions[1]}
          placeholder="  영화를 선택해주세요"
          styles={colourStyles}
          onChange={onMovie}
        />
      </Wrapper>
      {/* <Wrapper>
        <Select
          options={groupedOptions}
          // defaultValue={groupedOptions[1]}
          placeholder="  시간을 선택해주세요"
          styles={colourStyles}
          onChange={onTime}
        />
      </Wrapper> */}
      <Wrapper2>
        {visible ? (
          <div>
                        <span>
              {movie}
              {key - 1}관
            </span>
            <br />
            {Continents1.map((item, index) => (
              <button
              key={index}
                style={{ color: "black" }}
                onClick={() => {
                  setTheater(key-1);
                  onTime(item.value);
                }}
              >
                {item.label}
              </button>
            ))}
            <br />
            <span>
              {movie}
              {key}관
            </span>
            <br />
            {Continents2.map((item, index) => (
              <button
              key={index}
                style={{ color: "black" }}
                onClick={() => {
                  setTheater(key);
                  onTime(item.value);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "20px" }}>
              클릭하면 영화 시간이 보입니다.
            </span>
          </div>
        )}
      </Wrapper2>

      <Wrapper>
        <>
          <Popup
            trigger={
              <Button1
                variant="contained"
                color="primary"
                style={{
                  height: "40px",
                  width: "80px",
                  backgroundColor: "transparent",
                  fontWeight: "1000",
                  fontSize: "15px",
                  padding: "0px",
                  marginLeft: "0px",
                }}
              >
                다음
              </Button1>
            }
            modal
            contentStyle={{
              width: "770px",
              backgroundColor: "#242333",
              borderRadius: "10px",
              padding: "1%",
              border: "2px solid #848484",
            }}
            closeOnDocumentClick={true}
            triggerOn="click"
          >
            <BookingAll
              id={id}
              title={movie}
              bgImage={poster}
              userFrom={userFrom}
              selectDay={selectDay}
              time={time}
              theater={theater}
            />
          </Popup>
        </>
      </Wrapper>
      {/* </Grid> */}
    </Popup>
  );
};
export default ReservationAll;
