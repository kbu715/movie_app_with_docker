import React from "react";
import styled from "styled-components";
import { Doughnut } from "react-chartjs-2";

const Container = styled.div`
  float: bottom;
  width: 80%;
  border-radius: 5px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  /* text-align: center; */
  font-size: 20px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #f7f7f7;
  position: relative;
`;
const Nothing = styled.div`
  font-size: 20px;
  color: black;
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
`;
const ChartWrapper = styled.div`
  /* border: 1px solid red; */
  /* height: 100px; */
`;
const GenrePreference = ({ user, topGenre, result }) => {
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
        {user.userData && user.userData.name}'s Top Genres
      </SectionTitle>

      {result.length === 0 ? (
        <Nothing>
          <span
            style={{
              color: "#f7f7f7",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            분석 결과 없음
          </span>
        </Nothing>
      ) : (
        <ChartWrapper>

        <Doughnut
          options={{
            legend: {
              display: true,
              position: "right",
            },
          }}
          data={expData}
          height={200}
          />
          </ChartWrapper>
      )}
    </Container>
  );
};

export default GenrePreference;
