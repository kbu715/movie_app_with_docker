import React from "react";
import MyScorePresenter from "./MyScorePresenter";
import { moviesApi } from "api";
import {API_URL, API_KEY} from "../../Components/Config"

export default class extends React.Component {
  state = {
    loading: true,
    popular: null,
    error: null,
    buttonRef: null,
    Movies: [],
    MainMovieImage: null,
    CurrentPage: 0
  };

  async componentDidMount() {
    try {
      const {
        data: { results: popular },
      } = await moviesApi.popular();

      //landing page
      const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      // fetchMovies(endpoint)


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
    const { popular, loading, error } = this.state;

    const fetchMovies=(endpoint)=>{  }
    
    return (
      <MyScorePresenter popular={popular} loading={loading} error={error} />
    );
  }
}
