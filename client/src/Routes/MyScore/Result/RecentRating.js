import React from "react";
import styled from "styled-components";
import Rating from "../../../Components/Rating";

const Chart = styled.div`
  float: bottom;
  width: 90%;
  height: 100%;
  border-radius: 5px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  text-align: center;
  font-size: 23px;
  font-weight: 500;
  margin-top: 5px;
  margin-bottom: 10px;
  color: black;
  position: relative;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 10px;
`;

const PosterContainer = styled.div`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin-right: 1%;
`;

const PosterImage = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 130px;
  height: 180px;
  background-size: cover;
  transition: all 0.1s linear 0s;
  position: relative;
  margin: 0 auto;
`;

const PosterTitle = styled.div`
  font-size: 15px;
  color: black;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const RatingWapper = styled.div`
  margin: 0 auto;
`;

const PosterWrapper = styled.div`
  background-color: gray;
  width: 155px;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
`;

const Nothing = styled.div`
  font-size: 20px;
  color: black;
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
`;

const RecentRating = ({ recent, user }) => {
  return (
    <Chart>
      <SectionTitle>
        {user.userData && user.userData.name}님의 최근 별점 목록
      </SectionTitle>
      {recent.length === 0 ? (
        <Nothing>
          <span
            style={{
              color: "black",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            최근 목록 없음
          </span>
        </Nothing>
      ) : (
        recent &&
        recent.length > 0 && (
          <SectionGrid>
            {recent.map((item, index) => (
              <PosterContainer key={index}>
                <PosterWrapper>
                  <PosterImage
                    bgUrl={`https://image.tmdb.org/t/p/w300${item.imageUrl}`}
                  />
                  <PosterTitle>{item.title}</PosterTitle>
                  <RatingWapper>
                    <Rating number={item.score} />
                  </RatingWapper>
                </PosterWrapper>
              </PosterContainer>
            ))}
          </SectionGrid>
        )
      )}
    </Chart>
  );
};

export default RecentRating;
