import React, { useState, useEffect } from "react";
import FavoritePresenter from "./FavoritePresenter";
import Axios from "axios";

export default function FavoriteContainer() {

  const [favoriteMovies, setFavoriteMovies] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchFavoredMovie = () => {
    Axios.post("/api/favorite/getFavoredMovie", {
      userFrom: localStorage.getItem("userId"),
    }).then(response => {
      if (response.data.success) {
        setFavoriteMovies(response.data.favorites)
      } else {
        alert("영화 정보를 가져오는데 실패했습니다.");
      }
    }); 
  }
 
  const onClickDelete = (movieId, userFrom) => {
    const variables = {
      movieId,
      userFrom,
    }

    Axios.post('/api/favorite/removeFromFavorite', variables)
    .then(response => {
      if(response.data.success){
        fetchFavoredMovie();
      } else {
        alert('리스트에서 지우는데 실패했습니다.')
      }
    })
}



  useEffect(() => {
    try {
      fetchFavoredMovie();
    } catch {
      setError("Can't find TV information.")
    } finally {
      setLoading(false)
    }
  }, [])

  
    return (
      <FavoritePresenter
        onClickDelete={onClickDelete}
        favoriteMovies={favoriteMovies}
        error={error}
        loading={loading}
      />
    );
  }