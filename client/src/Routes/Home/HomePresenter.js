import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import { Carousel } from "antd";

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
          {/* <Video>
            <iframe
              width="100%"
              height="800"
              src="http://videos.hd-trailers.net/Mad_Max_Fury_Road_2015_Trailer_F4_5.1-1080p-HDTN.mp4"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="movie-trailer"
            ></iframe>
          </Video> */}

          <Carousel autoplay>
            <div>
              <div style={{ position: "absolute" }}>
                <img
                  src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/n6bUvigpRFqSwmPp1m2YADdbRBc.jpg"
                  alt="1"
                  width="1420px"
                  height="670px"
                />
              </div>
              <Hero>
                <Effect>
                  <HeroContent>
                    <HeroContentText>조커 : Joker</HeroContentText>
                    <HeroContentP>
                      "내 인생이 비극인 줄 알았는데, 코미디였어"
                      <br />
                      <br />
                      <br />
                      홀어머니와 사는 아서 플렉은 코미디언을 꿈꾸지만 그의 삶은
                      좌절과 절망으로 가득 차 있다.
                      <br />
                      <br />
                      군중들은 지배계급에 대한 저항의 아이콘이 된 그를 추종하기
                      시작
                      <br />
                      <br />
                      광대 마스크로 얼굴을 가리고 거리로 쏟아져 나오기
                      시작하는데..!
                    </HeroContentP>
                    <HeroButtonWrapper>
                      <HeroButton text="상세 정보" />
                      <HeroButton text="+ 찜한 목록" />
                    </HeroButtonWrapper>
                  </HeroContent>
                </Effect>
              </Hero>
            </div>
            <div>
              <div style={{ position: "absolute" }}>
                <img
                  src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/wzJRB4MKi3yK138bJyuL9nx47y6.jpg"
                  alt="2"
                  width="1420px"
                  height="600px"
                />
              </div>
            
            <Hero>
              <Effect>
                <HeroContent>
                  <HeroContentText>테넷 : Tenet</HeroContentText>
                  <HeroContentP>
                    "시간을 추격하라!"
                    <br />
                    <br />
                    <br />
                    시간의 흐름을 뒤집는 인버전을 통해 현재와 미래를 오가며
                    <br />
                    <br />
                    세상을 파괴하려는 사토르를 막기 위해 투입된 작전의 주도자.
                    <br />
                    <br />
                    미래의 공격에 맞서 제3차 세계대전을 막아야 한다!
                  </HeroContentP>
                  <HeroButtonWrapper>
                    <HeroButton text="상세 정보" />
                    <HeroButton text="+ 찜한 목록" />
                  </HeroButtonWrapper>
                </HeroContent>
              </Effect>
            </Hero>
            </div>
            <div>
              <div style={{ position: "absolute" }}>
                <img
                  src="https://image.tmdb.org/t/p/w1066_and_h600_bestv2/xJHokMbljvjADYdit5fK5VQsXEG.jpg"
                  alt="3"
                  width="1420px"
                  height="600px"
                />
              </div>
            
            <Hero>
              <Effect>
                <HeroContent>
                  <HeroContentText>인터스텔라 : Interstellar</HeroContentText>
                  <HeroContentP>
                    "우린 답을 찾을 거야, 늘 그랬듯이"
                    <br />
                    <br />
                    <br />
                    세계 각국의 정부와 경제가 완전히 붕괴된 미래가 다가온다.
                    <br />
                    <br />
                    지난 20세기에 범한 잘못이 전 세계적인 식량 부족을 불러왔고,
                    NASA도 해체되었다. 시공간에 불가사의한 틈이 열리고, 이 곳을
                    탐험해 인류를 구해야 하는 임무를 위해 쿠퍼는 만류하는 딸을
                    뒤로한 채 우주선에 탑승한다.
                    <br />
                    <br />
                  </HeroContentP>
                  <HeroButtonWrapper>
                    <HeroButton text="상세 정보" />
                    <HeroButton text="+ 찜한 목록" />
                  </HeroButtonWrapper>
                </HeroContent>
              </Effect>
            </Hero>
            </div>
          </Carousel>
          <br />

          <Helmet>
            <title>Movies | Nomflix</title>
          </Helmet>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
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
              <Section title="Now Playing">
                {nowPlaying.map(movie => (
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
              <Section title="Upcoming">
                {upcoming.map(movie => (
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
