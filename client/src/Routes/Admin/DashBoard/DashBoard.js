import React from "react";
import { Grid } from "@material-ui/core";
import TotalUsers from "../TotalUser/TotalUsers";
import TotleReservation from "../TotalReservation/TotalReservation";
import { Doughnut, Line } from "react-chartjs-2";
import { Typography } from "@material-ui/core";

function DashBoard() {
  const expData = {
    labels: ["메가박스", "CGV", "롯데시네마"],
    datasets: [
      {
        labels: ["메가박스", "CGV", "롯데시네마"],
        data: [60, 13, 27],
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
    labels: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul"],
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
        data: [1, 2, 3, 4, 5, 6, 7],
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
            <TotalUsers />
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
            data={expData}
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
