import React from 'react';
import styled from "styled-components";
import Rating from "../../../Components/Rating";

const Chart = styled.div`
    float: left;
    width: 400px;
    height: 400px;
    margin-top: 16px;   
    background-color: gray;
    margin-left: 10px;
`;

const SectionContainer = styled.div`
  font-size: 20px;
  width: 100%;
  height: 100%;
`;

const SectionTitle = styled.span`
  font-size: 20px;
  margin-top: 10px;
  color: black;
  position: relative;
`;

const SectionGrid = styled.div`
margin-top: 3px;
margin-left: 5px;
  display: grid;
  /* border: 1px solid red; */
  grid-template-columns: repeat(auto-fill, 290px);
  grid-gap: 10px;
  width: 380px;
  height:100%;
`;

const PosterContainer = styled.div`
font-size: 12px;
  align-content: center;
  /* border: 1px solid green; */
width: 100%;
`;

const PosterImage = styled.div`
background-image: url(${(props) => props.bgUrl});
width: 100px;
height: 140px;
background-size: cover;
transition: all 0.1s linear 0s;
  position: relative;
  float: left;
`;

const PosterTitle = styled.span`
  font-size: 20px;
  color: black;
`;
const PosterRatingsWrapper = styled.div`
  margin-left: 20px;
  margin-top: 20px;
  float: bottom;
`;

const RecentRating = ({recent}) => {
    return (
        <div>
            <Chart>
                {recent && recent.length > 0 && (
                    <SectionContainer>
                        <SectionTitle>최근 별점 목록</SectionTitle>
                        <SectionGrid>
                            {recent.map((item, index) => (
                                <PosterContainer key={index}>
                                    {/* <PosterImageContainer> */}
                                    <PosterImage bgUrl={`https://image.tmdb.org/t/p/w300${item.imageUrl}`} />
                                    {/* </PosterImageContainer> */}
                                    <PosterRatingsWrapper>
                                        <PosterTitle>{item.title}</PosterTitle>
                                        <Rating number = {item.score}/>
                                    </PosterRatingsWrapper>
                                </PosterContainer>
                            ))}
                        </SectionGrid>
                    </SectionContainer>
                )}
                </Chart>
        </div>
    );
};

export default RecentRating;