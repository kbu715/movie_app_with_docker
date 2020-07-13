import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "api";
export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      castResult: null,
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      isOpen: true,
      video: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: {
        push, //f push(path, state)
      },
    } = this.props;

    const { isMovie } = this.state;
    const parsedId = parseInt(id);

    if (isNaN(parsedId)) {
      return push("/");
    }
    let result = null;
    let castResult = null;
    let video = null;
    try {
      if (isMovie) {
        ({ data: result } = await moviesApi.movieDetail(parsedId)); // const = 이거랑 양쪽에 () 한거랑 같은거야
        ({ data: castResult } = await moviesApi.cast(parsedId)); // const = 이거랑 양쪽에 () 한거랑 같은거야
        ({ data: video } = await moviesApi.videos(parsedId)); // const = 이거랑 양쪽에 () 한거랑 같은거야
      } else {
        ({ data: result } = await tvApi.showDetail(parsedId));
      }
    } catch {
      this.setState({ error: "Can't find anything." });
    } finally {
      this.setState({ loading: false, result, castResult, video });
    }
  }
  openModal() {
    this.setState({ isOpen: true });
  }
  render() {
    const {
      result,
      error,
      loading,
      castResult,
      isMovie,
      isOpen,
      video,
    } = this.state;

    return (
      <DetailPresenter
        isMovie={isMovie}
        result={result}
        castResult={castResult}
        error={error}
        loading={loading}
        isOpen={isOpen}
        openModal={this.openModal}
        video={video}
      />
    );
  }
}
