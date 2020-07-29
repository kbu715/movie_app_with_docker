import React from 'react';
import styled from "styled-components";

const Chart = styled.div`
    float: left;
    width: 400px;
    height: 400px;
    margin-top: 16px;   
    background-color: gray;
    margin-left: 10px;
`;

const SectionTitle = styled.span`
  font-size: 20px;
  margin-top: 10px;
  color: black;
  position: relative;
`;

const TextWrapper = styled.div`
    width: 200px;
    height: 300px;
`;
const Text = styled.span`
    color: black;
    font-size: 20px;
`;

const GenrePreference = ({ user, result, genre }) => { // result : genres imageUrl movieId score title userFrom          genres: {id: 28, name: "액션"}
    return (
        <div>
            <Chart>
                <SectionTitle>{user.userData && user.userData.name}님이 좋아하는 장르</SectionTitle>
                <TextWrapper>
                    <Text>asdfadf</Text>
                </TextWrapper>
            </Chart>
        </div>
    );
};

export default GenrePreference;

