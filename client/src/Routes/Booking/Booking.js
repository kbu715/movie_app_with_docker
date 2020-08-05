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
import Select from 'react-select';

const Nav = styled.div`
  display: flex;
  justify-content: center;
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



const Title = styled.div`
  
`;

const PriceTag = styled.div`
  font-size: 20px;
  font-weight: 30px;
`;

const Small = styled.div`
  font-size: 20px;
  color: white;
`;
// const Wrapper = styled.div`
//   background-color: #242333;
//   //color: #fff;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: flex-start;
//   height: 80vh;
//   width: 70%;
//   font-family: "Lato", sans-serif;
//   margin: 0;
// `;
const Container = styled.div`
  margin: 20px 0;
`;




//------------------------------------------------------------------------------------------
const Wrapper = styled.div`
  float: left;
  height: 100%;
`
const InnerWrapper = styled.div`
  background-color: #242333;
  color: #fff;
  /* display: flex;
  flex-direction: row;
  //align-items: center;
  justify-content: flex-end; */
  /* width: 50%; */
  font-family: "Lato", sans-serif;
  /* border: 2px solid red; */
`;
const Cover = styled.div`
  width: 90%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 5px;
  box-shadow: 2px 6px 20px 0 rgba(0, 0, 0, 0.65);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
`;

//------------------------------------------------------------------------------------------
function Booking({ id, title, bgImage, userFrom, selectDay, time }) {
  const dispatch = useDispatch();
  const [Continent, setContinent] = useState(0);
  const [Seat, setSeat] = useState([]);
  const [Price, setPrice] = useState(0);
  const [Distinct, setDistinct] = useState([]);
  const [DBtime, setDBtime] = useState("");
  const [DBselectDay, setDBselectDay] = useState("");

  const movieTitle = {
    title: title,
  };

  useEffect(() => {
    axios
      .post("/api/reservation/findSeat", movieTitle)
      .then(async (response) => {
        if (response.data.success) {
          let seatlist = [];
          let DBtime = "";
          let DBselectDay = "";
          // console.log("data:", response.data);
          response.data.seats.map((obj) => {
            DBtime = obj.time[0].time;
            DBselectDay =
              obj.selectDay[0].year +
              "-" +
              obj.selectDay[0].month +
              "-" +
              obj.selectDay[0].day;
            seatlist.push(obj.seat);
          });

          const flatlist = seatlist.flat(); //평탄화 함수!!!
          setDistinct(flatlist);
          setDBtime(DBtime);
          setDBselectDay(DBselectDay);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //seat 색 변경
  const onSeatChange = (e) => {
    if (
      e.target.classList.contains("seat") &&
      !e.target.classList.contains("occupied")
    ) {
      e.target.classList.toggle("selected");
      setSeat([...Seat, e.target.innerText]);
    }
  };

  //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!주의!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // Grid없어지면서 event값 바뀜
  // const onCount = event => {
  //   setContinent(event.target.value);
  //   setPrice(event.target.value * 100);
  // };
  const onCount = (event) => {
    // console.log(event);
    setContinent(event.value);
    setPrice(event.key * 100);
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
    axios.post("/api/reservation", body).then((response) => {
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
  const onCompareSeat = (event) => {
    if (Continent < Seat.length + 1) {
      //인원보다 좌석지정이 많을경우
      alert("좌석 지정이 완료 되었습니다.");
      //클릭 못하게
      event.stopPropagation();
    }
  };


  ////////////////////////////////////////////////////////////////
  const colourStyles = {
    control: styles => ({
      ...styles,
      backgroundColor: 'white',
      borderRadius: "1rem",
      fontSize: "1.1rem", width: "250px",
      // marginTop: "25px",
      height: "35px",
      border: "1px solid #9c88ff",
      boxShadow: "0 1.5rem 2rem rgba(156, 136, 255, 0.2)",
      color: "#2e2e2e",
      fontWeight: "400",
    }),
    option: (styles, { data, isDisabled, isFocused }) => {
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
  const groupedOptions = [
    {
      options: Continents,
    }
  ];

  return (
    <>
      <Wrapper style={{ marginRight: "20px", }}>
        <InnerWrapper style={{ height: "50px", }}>
          <Select
            options={groupedOptions}
            // defaultValue="인원을 선택해주세요"
            styles={colourStyles}
            onChange={onCount}
          />
        </InnerWrapper>

        {/* <Nav> */}
        <InnerWrapper style={{ height: "300px", marginTop: "20px" }}>
          {/* <SideFlex> */}
          <Cover bgImage={bgImage} />
        </InnerWrapper>

        <InnerWrapper style={{
          height: "200px",
          display: "flex",
          flexDirection: "column",
          fontSize: "20px",
          padding: "5px",
          color: "#D8D8D8",
        }}>
          {/* <Title> */}
          <table style={{ margin: "3px", }}>
            <tbody>
              <tr style={{ marginBottom: "2px" }}>
                <th>날짜</th>
                <td>
                  {selectDay &&
                    `${selectDay.year}-${selectDay.month}-${selectDay.day}`}
                </td>
              </tr>

              <tr style={{ marginBottom: "2px" }}>
                <th>시간</th>
                <td>{time.time}</td>
              </tr>

              <tr style={{ marginBottom: "2px" }}>
                <th>인원</th>
                <td>{Continent}</td>
              </tr>

              <tr style={{ marginBottom: "2px" }}>
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
          {/* </Title> */}

          {/* </SideFlex> */}
        </InnerWrapper>
      </Wrapper>

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
        <Container onClick={onSeatChange}>
          <div className="container">
            <div className="screen"></div>

            {/* 좌석 */}
            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatA.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatA.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}

            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatB.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatB.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}

            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatC.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatC.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}

            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatD.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatD.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}

            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatE.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatE.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}

            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatF.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatF.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}

            {DBtime === time.time &&
              DBselectDay ===
              selectDay.year + "-" + selectDay.month + "-" + selectDay.day ? (
                <div className="row">
                  {SeatG.map((item) => {
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
              ) : (
                <div className="row">
                  {SeatG.map((item) => {
                    return (
                      <div
                        key={item.key}
                        className="seat"
                        onClick={onCompareSeat}
                      >
                        {item.value}
                      </div>
                    );
                  })}
                </div>
              )}
          </div>
        </Container>
        {/* )} */}
        
        <Paypal onSuccess={transactionSuccess} Price={Price} />

      </Wrapper>
      {/* </Nav> */}
    </>
  );
}

export default Booking;
