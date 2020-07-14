import React from "react";
import MyScorePresenter from "./MyScorePresenter";
import { moviesApi } from "api";

export default class extends React.Component {
  state = {
    loading: true,
    popular: null,
    error: null,
    score: null,
  };

  async componentDidMount() {
    try {
      const {
        data: { results: popular },
      } = await moviesApi.popular();
      this.setState({
        popular,
      });
    } catch (error) {
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
    const { popular, loading, error, score } = this.state;
    return (
      <MyScorePresenter popular={popular} loading={loading} error={error} score={score} />
    );
  }
}
