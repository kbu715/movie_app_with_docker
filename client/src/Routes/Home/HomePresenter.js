import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";


const Container = styled.div`
  padding: 10px;
  scroll-behavior: smooth;
`;
const Video = styled.div`
  position: absolute;
  width: 100%;
  top: -100px;
  z-index: -1;
`;
const Effect = styled.div`
  width: 100%;
  height: 600px;
  margin-top: 100px;
  background: linear-gradient(to bottom, transparent, black);
`;
const TopSection = styled.div`
  margin-top: -200px;
`;
const Button = styled.button`
  background: transparent;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  height: 44px;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-decoration: none;
  color: #ffffff;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid rgba(245, 245, 241, 0.2);
  border-radius: 44px;
  font-size: 14px;
  font-weight: 600;
  -webkit-transition: border 0.125s ease, background 0.125s ease;
  transition: border 0.125s ease, background 0.125s ease;
`;
const Hero = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const HeroContent = styled.div`
  position: relative;
  z-index: 4;
  width: auto;
  left: 10px;
  top: 10px;
`;
const HeroContentText = styled.span`
  font-size: 60px;
`;

const HeroContentP = styled.div`
  width: 100%;
  font-size: 20px;
  margin-top: 40px;
  color: white;
`;
const HeroButtonWrapper = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 400px;
  margin-top: 30px;
`;
const AButton = styled.a`
  &:link {
    text-decoration: none;
    color: white;
  }
  &:visited {
    text-decoration: none;
    color: white;
  }
  &:active {
    text-decoration: none;
    color: gray;
  }
  &:hover {
    text-decoration: none;
    color: gray;
  }
`;



const HomePresenter = ({
  nowPlaying,
  popular,
  upcoming,
  trending,
  loading,
  error,
}) => (
  <>
    <Helmet>
      <title>Movies | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <>
        <Container onWheel={(e) => {}}>
          <Video>
            <iframe
              width="100%"
              height="800"
              src="http://videos.hd-trailers.net/Mad_Max_Fury_Road_2015_Trailer_F4_5.1-1080p-HDTN.mp4"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="movie-trailer"
            ></iframe>
          </Video>
          <Helmet>
            <title>Movies | Nomflix</title>
          </Helmet>
          <Hero>
            <Effect>
              <HeroContent>
                <HeroContentText>매드맥스: 분노의 도로</HeroContentText>
                <HeroContentP>
                  "세상이 멸망하면서 누가 미친 건지 알 수 없어졌다. 나인지 이
                  세상인지.."
                  <br />
                  <br />
                  <br />
                  핵전쟁으로 멸망한 22세기. 얼마 남지 않은 물과 기름을
                  <br />
                  <br />
                  차지한 독재자 임모탄 조가 살아남은 인류를 지배한다.
                  <br />
                  <br />
                  끝내주는 날, 끝내주는 액션이 폭렬한다!
                </HeroContentP>
                <HeroButtonWrapper>
                  <HeroButton text="상세 정보" />
                  <HeroButton text="+ 찜한 목록" />
                </HeroButtonWrapper>
              </HeroContent>
              {/* <HeroOverlay></HeroOverlay> */}
            </Effect>
          </Hero>
          <TopSection>
            {/* {trending && trending.length > 0 && (
              <Section title="인기 상영작">
                {trending.map((movie) => (
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
            )} */}


            
            {/* 현재 상영중 */}
            {nowPlaying && nowPlaying.length > 0 && (
              <Section title="현재 상영중">
                {nowPlaying.map((movie) => (
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
            {/* {popular && popular.length > 0 && (
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
            )} */}
          </TopSection>
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      </>
    )}
  </>
);



class HeroButton extends React.Component {
  render() {
    return (
      <Button>
        <AButton href="/movie/76341" data-primary={this.props.primary}>
          {this.props.text}
        </AButton>
      </Button>
    );
  }
}
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
