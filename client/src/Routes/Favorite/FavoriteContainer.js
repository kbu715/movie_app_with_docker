import React from "react";
import FavoritePresenter from "./FavoritePresenter";
import Axios from "axios";

export default class extends React.Component {
  state = {
    favoriteMovies: null,
    error: null,
    loading: true,
  };

  async componentDidMount() {
    try {
      

        Axios.post("/api/favorite/getFavoredMovie", {
          userFrom: localStorage.getItem("userId"),
        }).then(response => {
          if (response.data.success) {
        
            this.setState({ favoriteMovies: response.data.favorites });
          } else {
            alert("영화 정보를 가져오는데 실패했습니다.");
          }
        });
      

    } catch {
      this.setState({
        error: "Can't find TV information.",
      });
    } finally {
      this.setState({ loading: false });
    }
  }
  render() {
    const { favoriteMovies, error, loading } = this.state;
    console.log(favoriteMovies)


  

    return (
      <FavoritePresenter
        favoriteMovies={favoriteMovies}
        error={error}
        loading={loading}
      />
    );
  }
}