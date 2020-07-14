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
  border: 2px solid pink;
`;

const TopSection = styled.div`
  margin-top: 500px;
`;
const Video = styled.div`
  /* width: 100%; */
  /* margin-top: 0px; !important */
  /* margin-bottom: 10px; */
  position: absolute;
  top: 0;
  left: 0;
  min-width: 100%;
  min-height: 700px;
  /* width: auto;
  height: auto; */
  z-index: -1;
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
  background-size: cover;
  border: 1px solid pink;
`;
const HeroContent = styled.div`
  position: relative;
  z-index: 4;
  width: 500px;
  left: 110px;
  top: 450px;
`;
const HeroContentText = styled.span`
  font-size: 30px;
`;
const HeroContentLogo = styled.img`
  max-width: 400px;
  display: block;
  position: relative;
  left: -5px;
`;
const HeroContentP = styled.div`
  width: 100%;
  font-size: 20px;
`;
const HeroButtonWrapper = styled.div`
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  width: 400px;
  margin-top: 30px;
`;
const HeroOverlay = styled.div`
  background: -webkit-linear-gradient(
    top,
    #221f1f 0%,
    rgba(34, 31, 31, 0) 100%
  );
  background: linear-gradient(to bottom, #221f1f 0%, rgba(34, 31, 31, 0) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a6000000', endColorstr='#00000000',GradientType=0 )
  height: 100%;
  position: absolute;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  -webkit-transform: rotate(180deg);
  transform: rotate(180deg);
`;
const Iframe = styled.iframe`
  border: 1px solid red;
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
        <Container>
          <Video>
            <Iframe
              width="100%"
              height="900"
              src="http://videos.hd-trailers.net/Mad_Max_Fury_Road_2015_Trailer_F4_5.1-1080p-HDTN.mp4"
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="ddd"
            ></Iframe>
          </Video>
          <Helmet>
            <title>Movies | Nomflix</title>
          </Helmet>
          {/* 메인 비디오 */}
          <Hero>
            <HeroContent>
              <HeroContentLogo />
              <HeroContentText>Season 2 now avilable</HeroContentText>
              <br />
              <HeroContentP>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloremque id quam sapiente unde voluptatum alias vero debitis,
                magnam quis quod.
              </HeroContentP>
              <HeroButtonWrapper>
                <HeroButton primary={true} text="Detail view" />
                <HeroButton primary={false} text="+ my List" />
              </HeroButtonWrapper>
            </HeroContent>
            <HeroOverlay></HeroOverlay>
          </Hero>
          <TopSection>
            {/* 현재 상영중 */}
            {trending && trending.length > 0 && (
              <Section title="트렌딩">
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
            )}

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
        <a href="#" data-primary={this.props.primary}>
          {this.props.text}
        </a>
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
