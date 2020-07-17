import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import Slider from "react-slick";

const Container = styled.div`
  padding: 10px;
  border: 1px solid pink;
`;
const Video = styled.div`
  width: 100%;
  margin-bottom: 30px;
`;

const HomePresenter = ({
  nowPlaying,
  popular,
  upcoming,
  trending,
  loading,
  error,
  settings,
}) => (
  <>
    <Helmet>
      <title>Movies | Nomflix</title>
    </Helmet>

    {loading ? (
      <Loader />
    ) : (
      <Container>
        <Helmet>
          <title>Movies | Nomflix</title>
        </Helmet>
        {/* 메인 비디오 */}
        <Video>
          {/* <VideoTest /> */}
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/GV3HUDMQ-F8?autoplay=1"
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="ddd"
          ></iframe>

          {/* <iframe width="560" height="315" src="https://www.youtube.com/embed/E11p66uJVMY?autoplay=1&mute=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe> */}
        </Video>

        {/* 현재 상영중 */}
        {/* {trending && trending.length > 0 && (
          <Slider {...settings}>
            <div>
              <Section title="트렌딩">
                {trending.map((movie, index) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date.substring(0, 4)}
                    isMovie={true}
                  />
                ))}
              </Section>
            </div>
          </Slider>
        )} */}

        {/* 현재 상영중 */}
        {nowPlaying && nowPlaying.length > 0 && (
          <Section title="현재 상영중">
            {nowPlaying.map((movie, index) => (
              <div key={index}>
                <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                />
              </div>
            ))}
          </Section>
        )}

        {upcoming && upcoming.length > 0 && (
          <Section title="개봉 예정">
            {upcoming.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}

        {popular && popular.length > 0 && (
          <Section title="흥행순">
            {popular.map((movie) => (
              <Poster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                rating={movie.vote_average}
                year={movie.release_date.substring(0, 4)}
                isMovie={true}
              />
            ))}
          </Section>
        )}

        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
export default withRouter(HomePresenter);

//프리젠터는 그 데이터들을 보여주는 역할을 한다. 프리젠터는 스타일이고, 컨테이너는 데이타야.

//react에서 children은 일반적으로 태그 사이의 값을 받아.
