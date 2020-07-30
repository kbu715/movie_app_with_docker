import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import DatePicker, { utils } from "react-modern-calendar-datepicker";
import Paypal from "../../utils/Paypal";
import "../Reservation/style.css";
import {
  Continents,
  SeatA,
  SeatB,
  SeatC,
  SeatD,
  SeatE,
  SeatF,
  SeatG,
} from "../Reservation/Modal/Context";
import { useDispatch } from "react-redux";
import { addToMovie } from "../../_actions/user_action";

const Nav = styled.div`
  display: flex;
  justify-content: center;
`;

const NavSub = styled.div`
  display: flex;
  justify-content: row;
  //background-color: #242333;
  background-color: white;

  width: 100%;
`;

const SideFlex = styled.div`
  width: 100%;
  background-position: center center;
  box-shadow: 2px 6px 20px 0 rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
`;

const SideWrapper = styled.div`
  background-color: #242333;
  color: #fff;
  display: flex;
  flex-direction: row;
  //align-items: center;
  justify-content: flex-end;
  height: 80vh;
  width: 30%;
  font-family: "Lato", sans-serif;
  margin: 0;
  border: 2px solid white;
`;

const Cover = styled.div`
  width: 95%;
  height: 50%;
  background-image: url(${props => props.bgImage});

  background-position: center center;

  background-size: cover;

  border-radius: 5px;
  box-shadow: 2px 6px 20px 0 rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;
const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-top: 30px;
`;

const PriceTag = styled.div`
  font-size: 20px;
  font-weight: 30px;
`;

const Small = styled.div`
  font-size: 20px;
  color: white;
`;
const Wrapper = styled.div`
  background-color: #242333;
  //color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 80vh;
  width: 70%;
  font-family: "Lato", sans-serif;
  margin: 0;
`;
const Container = styled.div`
  margin: 20px 0;
`;

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
//------------------------------------------------------------------------------------------
function Booking({ id, title, bgImage, userFrom }) {
  const dispatch = useDispatch();

  const [selectDay, setSelectedDay] = useState(null);
  const [theaters, setTheaters] = useState("");
  const [time, setTime] = useState(0);
  const [Continent, setContinent] = useState(0);
  const [Seat, setSeat] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Distinct, setDistinct] = useState([]);
  const [MovieId, setMovieId] = useState("");
  const movieTitle = {
    title: title,
  };

  useEffect(() => {
    axios
      .post("/api/reservation/findSeat", movieTitle)
      .then(async response => {
        if (response.data.success) {
          let seatlist = [];
          response.data.seats.map(obj => {
            seatlist.push(obj.seat);
          });
          const flatlist = seatlist.flat();
          setDistinct(flatlist);
        }
      })
      .catch(err => {
        console.log(err);
      });

    const movie = {
      id: id,
    };

    //영화 ObjectID 가져오기
    axios.post("/api/reservation/getMovieId", movie).then(response => {
      if (response.data.success) {
        console.log("data", response.data);
        setMovieId(response.data.doc);
      } else {
        console.log("실패");
      }
    });
  }, []);
  console.log("해당 영화의 objectID값", MovieId);

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

  //seat 색 변경
  const onSeatChange = e => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      setSeat([...Seat, e.target.innerText]);
    }
  };

  const onCount = event => {
    setContinent(event.target.value);
    setPrice(event.target.value * 100);
  };

  //결제후 DB저장
  const transactionSuccess = (data, e) => {
    const movieId = MovieId;
    if (!selectDay || !theaters || !time || !id || !title) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }
    const body = {
      userFrom: userFrom,
      id: id,
      title: title,
      theaters: theaters,
      selectDay: selectDay,
      time: time,
      continent: Continent,
      seat: Seat,
      price: Price,
    };
    axios.post("/api/reservation", body).then(response => {
      if (response.data.success) {
        alert("예매 성공");

        window.location.href = "http://localhost:3000/";
      } else {
        alert("예매 실패");
        return false;
      }
    });

    //개인 영화 구매정보
    dispatch(addToMovie(movieId));
  };

  //좌석과 인원 맞추기
  const onCompareSeat = event => {
    if (Continent < Seat.length + 1) {
      //인원보다 좌석지정이 많을경우
      alert("좌석 지정이 완료 되었습니다.");
      //클릭 못하게
      event.stopPropagation();
    }
  };

  return (
    <>
      <NavSub>
        {/* <DatePicker
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
          {Continentss.map((item) => (
            <option key={item.key} value={item.value}>
              {item.value}
            </option>
          ))}
        </Select> */}

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

          <Grid item xs>
            <TextField
              color="secondary"
              fullWidth
              select
              value={Continents}
              label="Numbers"
              variant="filled"
              onChange={onCount}
            >
              {Continents.map(item => (
                <MenuItem key={item.key} value={item.key}>
                  {item.value}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </NavSub>

      {/*  */}

      <Nav>
        <SideWrapper>
          <SideFlex>
            <Cover bgImage={bgImage} />
            <Title>
              <table>
                <tbody>
                  <tr>
                    <th>영화관</th>
                    <td>{theaters.theaters}</td>
                  </tr>

                  <tr>
                    <th>날짜</th>
                    <td>
                      {selectDay &&
                        `${selectDay.year}-${selectDay.month}-${selectDay.day}`}
                    </td>
                  </tr>

                  <tr>
                    <th>시간</th>
                    <td>{time.time}</td>
                  </tr>

                  <tr>
                    <th>인원</th>
                    <td>{Continent}</td>
                  </tr>

                  <tr>
                    <th>좌석</th>

                    <td>
                      {Seat.map((seat, index) => {
                        if (index < Seat.length - 1) {
                          return seat + ", ";
                        } else {
                          return seat;
                        }
                      })}
                    </td>

                    <td></td>
                  </tr>
                </tbody>
              </table>
              <hr />
              가격<PriceTag>{Price}</PriceTag>
            </Title>

            <Paypal onSuccess={transactionSuccess} Price={Price} />
          </SideFlex>
        </SideWrapper>

        <Wrapper>
          <hr style={{ color: "white", borderColor: "white" }} />

          <ul className="showcase">
            <li>
              <div className="seat"></div> <Small>빈좌석</Small>
            </li>
            <li>
              <div className="seat selected"></div> <Small>선택좌석</Small>
            </li>
            <li>
              <div className="seat occupied"></div> <Small>선택완료</Small>
            </li>
          </ul>
          <Container onClick={onSeatChange}>
            <div className="container">
              <div className="screen"></div>

              {/* 좌석 */}
              <div className="row">
                {SeatA.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row">
                {SeatB.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row">
                {SeatC.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row">
                {SeatD.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row">
                {SeatE.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row">
                {SeatF.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>

              <div className="row">
                {SeatG.map(item => {
                  if (Distinct.includes(item.value)) {
                    return (
                      <div
                        key={item.key}
                        className="seat occupied"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
            </div>
          </Container>
        </Wrapper>
      </Nav>
    </>
  );
}

export default Booking;
