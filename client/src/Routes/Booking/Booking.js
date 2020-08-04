import React, { useState, useEffect } from "react";
import { Grid, TextField, MenuItem } from "@material-ui/core";
import axios from "axios";
import styled from "styled-components";
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
  border: 1px solid pink;
`;

//------------------------------------------------------------------------------------------
function Booking({ id, title, bgImage, userFrom, selectDay, time }) {
  const dispatch = useDispatch();
  console.log("selectDay", selectDay);
  const [Continent, setContinent] = useState(0);
  const [Seat, setSeat] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Distinct, setDistinct] = useState([]);
  const movieTitle = {
    title: title,
  };

  useEffect(() => {

    axios
      .post("/api/reservation/findSeat", movieTitle)
      .then(response => {
        if (response.data.success) {
          console.log("seats", response.data.seats);
          let seatlist = [];
          // let DBtime = "";
          // let DBselectDay = "";
          response.data.seats.forEach(obj => {
            if(obj.time[0].time === time.time 
              && obj.selectDay[0].day === selectDay.day 
              && obj.selectDay[0].month === selectDay.month
              && obj.selectDay[0].year === selectDay.year){
            seatlist.push(obj.seat)
        }
      });
          
        
          console.log("sdafkljsajfkasdf", seatlist);
          const flatlist = seatlist.flat(); //평탄화 함수!!!
          setDistinct(flatlist);
          // setDBtime(DBtime);
          // setDBselectDay(DBselectDay);
          

        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //seat 색 변경
  const onSeatChange = e => {
    
    if (Continent < Seat.length + 1) {
      //인원보다 좌석지정이 많을경우
      alert("좌석 지정이 완료 되었습니다.");
      //클릭 못하게
      e.stopPropagation();
      return;
    }
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      setSeat([...Seat, e.target.innerText]);
    }
    else if (
      e.target.classList.contains("selected") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("seat");
      setSeat(Seat => Seat.filter(seat=>seat !==e.target.innerText));
    }
    console.log(222222222, Continent, Seat.length)
  };

  const onCount = event => {
    setContinent(event.target.value);
    setPrice(event.target.value * 100);
  };

  //결제후 DB저장
  const transactionSuccess = (data, e) => {
    if (!selectDay || !time || !id || !title) {
      return alert("모든 값을 넣어주셔야 합니다.");
    }
    const body = {
      userFrom: userFrom,
      id: id,
      title: title,
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

        //개인 영화 구매정보
        dispatch(addToMovie(response.data.doc._id));
      } else {
        alert("예매 실패");
        return false;
      }
    });
  };

  //좌석과 인원 맞추기
  // const onCompareSeat = event => {

  // };

  return (
    <>
      <NavSub>
        <Grid container spacing={3}>
          <Grid item xs>
            <TextField
              color="secondary"
              fullWidth
              select
              value={Continents}
              label="인원"
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

          {/* {DBtime === time.time && ( */}
          <Container>
            <div className="container">
              <div className="screen"></div>

              {/* 좌석 */}
              {(
                <div className="row">
                  {SeatA.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              )} 

              {(
                <div className="row">
                  {SeatB.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              ) }

              {(
                <div className="row">
                  {SeatC.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              )}

              {(
                <div className="row">
                  {SeatD.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              )}

              {(
                <div className="row">
                  {SeatE.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              )}

              {(
                <div className="row">
                  {SeatF.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              )}

              {(
                <div className="row">
                  {SeatG.map(item => {
                    if (Distinct.includes(item.value)) {
                      return (
                        <div
                          key={item.key}
                          className="seat occupied"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    } else {
                      return (
                        <div
                          key={item.key}
                          className="seat"
                          onClick={onSeatChange}
                        >
                          {item.value}
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          </Container>
          {/* )} */}
        </Wrapper>
      </Nav>
    </>
  );
}

export default Booking;
