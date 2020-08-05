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

// const Cover = styled.div`
//   width: 95%;
//   height: 50%;
//   background-image: url(${props => props.bgImage})
// `;


const PriceTag = styled.div`
  font-size : 20px;
  font-weight : 30px;
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
const Title = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-top: 30px;
`;

// const PriceTag = styled.div`
//   font-size: 20px;
//   font-weight: 30px;
// `;

// const Small = styled.div`
//   font-size: 20px;
//   color: white;
// `;
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
// const Container = styled.div`
//   margin: 20px 0;
//   border: 1px solid pink;
// `;

//------------------------------------------------------------------------------------------
function Booking({ id, title, bgImage, userFrom, selectDay, time }) {
  const dispatch = useDispatch();
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
            if (
              obj.time[0].time === time.time &&
              obj.selectDay[0].day === selectDay.day &&
              obj.selectDay[0].month === selectDay.month &&
              obj.selectDay[0].year === selectDay.year
            ) {
              seatlist.push(obj.seat);
            }
          });

          console.log("sdafkljsajfkasdf", seatlist);
          const flatlist = seatlist.flat(); //평탄화 함수!!!
          setDistinct(flatlist);

          

        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  //seat 색 변경
  const onSeatChange = async e => {
    console.log("Seat.length", Seat.length);
    if (Continent >= Seat.length + 1) {
      //인원이 좌석수보다 크거나 같을때

      if (
        //빈좌석
        !e.target.classList.contains("occupied") &&
        !e.target.classList.contains("selected")
      ) {
        e.target.classList.add("selected"); //누른게 선택좌석으로
        setSeat([...Seat, e.target.textContent]); //저장
      } else if (e.target.classList.contains("selected")) {
        //인원수와 좌석수가 같을때
        //선택된좌석은 삭제
        e.target.classList.remove("selected");
        const SeatFiltered = Seat.filter(seat => seat !== e.target.textContent); //text삭제
        setSeat(SeatFiltered);
      }
    } else {
      if (Continent === Seat.length) {
        e.target.classList.remove("selected");

        const SeatFiltered = Seat.filter(seat => seat !== e.target.textContent); //text삭제
        setSeat(SeatFiltered);
        console.log("Seat", Seat);
        console.log("e.target.textContent", e.target.textContent);
        console.log(
          "Seat.includes(e.target.textContent)",
          Seat.includes(e.target.textContent)
        );
        console.log(
          "e.target.classList.contains",
          e.target.classList.contains("selected")
        );
        if (!Seat.includes(e.target.textContent)) {
          alert("선택한 인원수보다 좌석을 많이 선택하셨습니다.");
        }
      }

      //인원보다 좌석지정이 많을경우

      //클릭 못하게
      e.stopPropagation();
    }

    // console.log(222222222, Continent, Seat.length);
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

  // //좌석과 인원 맞추기
  // const onCompareSeat = event => {
  //   if (Continent < Seat.length + 1) {
  //     //인원보다 좌석지정이 많을경우
  //     alert("좌석 지정이 완료 되었습니다.");
  //     //클릭 못하게
  //     event.stopPropagation();
  //   }
  // };

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

  //===================================================================================================================================
  //========================================================================CSS 겹침===================================================
  //===================================================================================================================================
  
/* // console.log("비교해보자", typeof DBtime, typeof time.time);
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
              */

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
          <Title>
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
            </Title>

            <Paypal onSuccess={transactionSuccess} Price={Price} />
          {/* </SideFlex>
        </SideWrapper> */}
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
          <Container>
            <div className="container">
              <div className="screen"></div>

              {/* 좌석 */}
              {
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
              }

              {
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
              }

              {
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
              }

              {
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
              }

              {
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
              }

              {
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
              }

              {
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
              }
            </div>
          </Container>
          {/* )} */}
        </Wrapper>
      {/* </Nav> */}
    </>
  );
}

export default Booking;
