import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";

const Container = styled.div`
  float: bottom;
  margin-left: 20px;
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  border-radius: 5px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  margin-top: 15px;
  color: black;
  position: relative;
`;
const Nothing = styled.div`
  font-size: 20px;
  color: black;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  text-align: center;
  display: table;
`;

const GenrePreference = ({ user, topGenre, result }) => {
  // console.log(topGenre);
  const expData = {
    labels: topGenre.map((item) => item.name),
    datasets: [
      {
        labels: topGenre.map((item) => item.name),
        data: topGenre.map((item) => item.count),
        borderWidth: 3,
        backgroundColor: [
          "rgba(238, 102, 121, 1)",
          "rgba(98, 181, 229, 1)",
          "rgba(255, 198, 0, 1)",
        ],
        fill: true,
      },
    ],
  };

  return (
    <Container>
      <SectionTitle>
        {user.userData && user.userData.name}님이 좋아하는 장르
      </SectionTitle>

      {result.length === 0 ? (
        <Nothing>
          <span
            style={{
              color: "black",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            분석 결과 없음
          </span>
        </Nothing>
      ) : (
        <Doughnut
          options={{
            legend: {
              display: true,
              position: "bottom",
            },
          }}
          data={expData}
          height={200}
        />
      )}
    </Container>
  );
};

export default GenrePreference;
