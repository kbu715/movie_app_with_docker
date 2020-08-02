import React from 'react';
import styled from "styled-components";
// import Chart from 'chart.js';
// import { Grid } from '@material-ui/core';
import { Doughnut } from 'react-chartjs-2';

const Container = styled.div`
  float: bottom;
  margin-left: 20px;
  width: 650px;
  height: 510px;
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

const GenrePreference = ({ user, topGenre, result }) => {
    const expData = {
        labels: topGenre.map(item => item.name),
        datasets: [
            {
                labels: topGenre.map(item => item.name),
                data: topGenre.map(item => item.count),
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
            <SectionTitle>{user.userData && user.userData.name}님이 좋아하는 장르</SectionTitle>
            <div style={{ height: "90%", display: "flex", justifyContent: "center", flexDirection: "column", }}>
                <div style={{ display: "flex", width: "100%" }}>
                    <div style={{ display: "flex", width: "100%", }}>
                        { result.length === 0 
                        ? <div style={{ fontSize: "20px", color:"black"}}>분석 결과 없음</div>
                        : <Doughnut options={{
                            legend: {
                                display: true,
                                position: "bottom",
                            },
                        }}
                        data={expData}
                        height={200} />
                    }
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default GenrePreference;
