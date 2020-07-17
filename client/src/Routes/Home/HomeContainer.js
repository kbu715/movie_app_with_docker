import React from "react";
import HomePresenter from "./HomePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    nowPlaying: null,
    upcoming: null,
    popular: null,
    trending: null,
    error: null,
    loading: true,
  };

  settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  async componentDidMount() {
    //처음 render 되고 실행되는 함수
    try {
      //Object Deconstruction "객체 비구조화 할당"
      const {
        data: { results: nowPlaying },
      } = await moviesApi.nowPlaying();
      const {
        data: { results: upcoming },
      } = await moviesApi.upcoming();
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      const {
        data: { results: trending },
      } = await moviesApi.trending();

      // throw Error(); 에러 테스트 할때''
      this.setState({
        nowPlaying, //nowPlaying: nowPlaying 이랑 같은 표현
        upcoming,
        popular,
        trending,
      });
    } catch {
      this.setState({
        error: "Can't find movies from information.",
      });
    } finally {
      this.setState({
        loading: false,
      });
    }
  }

  render() {
    const {
      nowPlaying,
      upcoming,
      popular,
      trending,
      error,
      loading,
      settings,
    } = this.state;

    return (
      <HomePresenter
        nowPlaying={nowPlaying}
        upcoming={upcoming}
        popular={popular}
        trending={trending}
        error={error}
        loading={loading}
        settings={settings}
      />
    );
  }
}

//컨테이너는 data를 가지고, state를 가지고 api를 불러온다. 그리고 모든 로직을 처리한다.
