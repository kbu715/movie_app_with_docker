import React, { useEffect, useState } from "react";
import { Grid } from "@material-ui/core";
import TotalUsers from "../TotalUser/TotalUsers";
import TotleReservation from "../TotalReservation/TotalReservation";
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";
import axios from "axios";
import TotalProduct from "../TotalProduct/TotalProduct";

function DashBoard() {
  const [numOfCGV, setNumOfCGV] = useState(0);
  const [numOfLotte, setNumOfLotte] = useState(0);
  const [numOfMega, setNumOfMega] = useState(0);
  const [user, setUser] = useState([]);

  // 19개 장르
  const [action, setAction] = useState(0);
  const [adventure, setAdventure] = useState(0);
  const [ani, setAni] = useState(0);
  const [comedy, setComedy] = useState(0);
  const [crime, setCrime] = useState(0);
  const [docu, setDocu] = useState(0);
  const [drama, setDrama] = useState(0);
  const [family, setFamily] = useState(0);
  const [fantasy, setFantasy] = useState(0);
  const [history, setHistory] = useState(0);
  const [horror, setHorror] = useState(0);
  const [music, setMusic] = useState(0);
  const [mystery, setMystery] = useState(0);
  const [romance, setRomance] = useState(0);
  const [sf, setSF] = useState(0);
  const [tv, setTV] = useState(0);
  const [thriller, setThriller] = useState(0);
  const [war, setWar] = useState(0);
  const [western, setWestern] = useState(0);

  const fetchGenres = function () {
    axios.post("/api/myscore/getAllGenres").then((response) => {
      if (response.data.success) {
        // console.log(response.data.genres);
        const listOfGenreNum = response.data.genres.map((g) => {
          return g.genres;
        });
        // console.log(typeof listOfGenreNum[0])
        listOfGenreNum.forEach((element) => {
          switch (element) {
            case 28:
              setAction((action) => action + 1);
              break;
            case 12:
              setAdventure((adventure) => adventure + 1);
              break;
            case 16:
              setAni((ani) => ani + 1);
              break;
            case 35:
              setComedy((comedy) => comedy + 1);
              break;
            case 80:
              setCrime((crime) => crime + 1);
              break;
            case 99:
              setDocu((docu) => docu + 1);
              break;
            case 18:
              setDrama((drama) => drama + 1);
              break;
            case 10751:
              setFamily((family) => family + 1);
              break;
            case 14:
              setFantasy((fantasy) => fantasy + 1);
              break;
            case 36:
              setHistory((history) => history + 1);
              break;
            case 27:
              setHorror((horror) => horror + 1);
              break;
            case 10402:
              setMusic((music) => music + 1);
              break;
            case 9648:
              setMystery((mystery) => mystery + 1);
              break;
            case 10749:
              setRomance((romance) => romance + 1);
              break;
            case 878:
              setSF((sf) => sf + 1);
              break;
            case 10770:
              setTV((tv) => tv + 1);
              break;
            case 53:
              setThriller((thriller) => thriller + 1);
              break;
            case 10752:
              setWar((war) => war + 1);
              break;
            case 37:
              setWestern((western) => western + 1);
              break;
            default:
              break;
          }
        });
      } else {
        alert("실패했습니다");
      }
    });
  };

  const fetchUsers = function () {
    axios.get("/api/users/management").then((response) => {
      if (response.data.success) {
        console.log(response.data.users);
        setUser(response.data.users);
      } else {
        console.log("불러오기 실패");
      }
    });
  };

  useEffect(() => {
    // fetchTheaters();
    fetchGenres();
    fetchUsers();
  }, []);

  const userGender = user.map((item) => item.gender);
  let male = 0,
    female = 0;
  userGender.forEach((element) => {
    if (element === "male") {
      male++;
    } else {
      female++;
    }
  });

  const expData = {
    labels: ["메가박스", "CGV", "롯데시네마"],
    datasets: [
      {
        labels: ["메가박스", "CGV", "롯데시네마"],
        data: [numOfMega, numOfCGV, numOfLotte],
        borderWidth: 3,
        hoverBorderWidth: 4,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)",
        ],
        fill: true,
      },
    ],
  };

  const expDataUserGender = {
    labels: ["남자", "여자"],
    datasets: [
      {
        labels: ["남자", "여자"],
        data: [male, female],
        borderWidth: 3,
        hoverBorderWidth: 4,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)",
        ],
        fill: true,
      },
    ],
  };
  const styles = {
    fontFamily: "sans-serif",
    textAlign: "center",
    width: "50%",
    margin: "70px 10px 10px 10px",
  };
  const data = {
    labels: [
      "액션",
      "모험",
      "애니",
      "코미디",
      "범죄",
      "다큐",
      "드라마",
      "가족",
      "판타지",
      "역사",
      "공포",
      "음악",
      "미스터리",
      "로맨스",
      "SF",
      "TV",
      "스릴러",
      "전쟁",
      "서부",
    ],
    datasets: [
      {
        label: "My First dataset",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgba(75,192,192,1)",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [
          action,
          adventure,
          ani,
          comedy,
          crime,
          docu,
          drama,
          family,
          fantasy,
          history,
          horror,
          music,
          mystery,
          romance,
          sf,
          tv,
          thriller,
          war,
          western,
        ],
      },
    ],
  };

  const lineOptions = {
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          // stacked: true,
          gridLines: {
            display: false,
          },
          ticks: {
            beginAtZero: true,
            // Return an empty string to draw the tick line but hide the tick label
            // Return `null` or `undefined` to hide the tick line entirely
            userCallback(value) {
              // Convert the number to a string and splite the string every 3 charaters from the end
              value = value.toString();
              value = value.split(/(?=(?:...)*$)/);

              // Convert the array to a string and format the output
              value = value.join(".");
              return `Rp.${value}`;
            },
          },
        },
      ],
    },
    legend: {
      display: false,
    },
    tooltips: {
      enabled: false,
    },
  };
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <div style={{ display: "flex", width: "100%" }}>
        <Grid container spacing={4}>
          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalUsers />
          </Grid>

          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotleReservation />
          </Grid>

          <Grid item lg={4} sm={6} xl={3} xs={12}>
            <TotalProduct />
          </Grid>
        </Grid>
      </div>

      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            width: "50%",

            backgroundColor: "skyblue",
          }}
        >
          <Doughnut
            options={{
              legend: {
                display: true,
                position: "right",
              },
            }}
            data={expData}
            height={80}
          />
        </div>
        <div
          style={{
            display: "flex",
            width: "50%",

            backgroundColor: "pink",
          }}
        >
          <Doughnut
            options={{
              legend: {
                display: true,
                position: "right",
              },
            }}
            data={expDataUserGender}
            height={80}
          />
        </div>
      </div>

      <div style={styles}>
        <Line data={data} options={lineOptions} />
      </div>
    </div>
  );
}

export default DashBoard;
