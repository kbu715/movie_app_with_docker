import axios from "axios";
import {
  REGISTER_USER,
  LOGIN_USER,
  AUTH_USER,
  ADD_TO_MOVIE,
  GET_MOVIE_ITEMS,
  REMOVE_MOVIE_ITEM,
  ADD_TO_CART,
} from "./types";

export function loginUser(dataToSubmit) {
  //node로 정보 보내기
  const request = axios
    .post("/api/users/login", dataToSubmit)
    .then((response) => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: LOGIN_USER,
    payload: request,
  };
}

export function registerUser(dataToSubmit) {
  //node로 정보 보내기
  const request = axios
    .post("/api/users/register", dataToSubmit)
    .then((response) => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: REGISTER_USER,
    payload: request,
  };
}

//get메소드는 body부분이 필요없다.
export function auth() {
  //node로 정보 보내기
  const request = axios
    .get("/api/users/auth")
    .then((response) => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: AUTH_USER,
    payload: request,
  };
}

export function addToMovie(id) {
  let body = {
    movieId: id,
  };

  //node로 정보 보내기
  const request = axios
    .post("/api/users/addToMovie", body)
    .then((response) => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: ADD_TO_MOVIE,
    payload: request,
  };
}

export function addToCart(id) {
  let body = {
    productId: id,
  };

  const request = axios
    .post("/api/users/addToCart", body)
    .then((response) => response.data);

  return {
    //request를 reducer로 넘기는 작업
    type: ADD_TO_CART,
    payload: request,
  };
}

export function getMovieItems(movieItems, userMovie) {
  //node로 정보 보내기
  const request = axios
    .get(`/api/reservation/reservation_by_id?id=${movieItems}&type=array`)
    .then((response) => {
      // movieItem들에 해당하는 정보들을 Reservation Collection에서 가져온후에
      // Quantity 정보를 넣어 준다.
      userMovie.forEach((movieItem) => {
        response.data.forEach((reservationDetail, index) => {
          if (movieItem._id === reservationDetail._id) {
            response.data[index].quantity = movieItem.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    //request를 reducer로 넘기는 작업
    type: GET_MOVIE_ITEMS,
    payload: request,
  };
}

export function removeMovieItem(movieId) {
  //node로 정보 보내기
  const request = axios
    .get(`/api/users/removeFromMovie?id=${movieId}`)
    .then((response) => {
      //movieInfo, movie 정보를 조합해서 movieDetail을 만든다.
      response.data.movie.forEach((item) => {
        response.data.movieInfo.forEach((movie, index) => {
          if (item.id === movie.id) {
            response.data.movieInfo[index].quantity = item.quantity;
          }
        });
      });

      return response.data;
    });

  return {
    //request를 reducer로 넘기는 작업
    type: REMOVE_MOVIE_ITEM,
    payload: request,
  };
}
