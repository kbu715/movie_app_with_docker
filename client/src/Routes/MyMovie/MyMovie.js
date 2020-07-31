import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getMovieItems, removeMovieItem } from "../../_actions/user_action";
import UserMovie from "./Sections/UserMovie";
import { Empty } from "antd";
function MyMovie(props) {
  const dispatch = useDispatch();
  const [ShowTotal, setShowTotal] = useState(true);
  useEffect(() => {
    let movieItem = [];

    //리덕스 User state안에 movie안에 결재내역이 있는지 확인
    if (props.user.userData && props.user.userData.movie) {
      console.log(4, props.user.userData.movie);
      if (props.user.userData.movie.length > 0) {
        props.user.userData.movie.forEach(item => {
          movieItem.push(item.id);
        });
        console.log(123123, movieItem);
        dispatch(getMovieItems(movieItem, props.user.userData.movie));
      }
    }
  }, [props.user.userData]);

  const removeFromCart = movieId => {
    dispatch(removeMovieItem(movieId)).then(response => {
      if (response.payload.movieInfo.length <= 0) {
        setShowTotal(false);
      }
    });
  };

  return (
    <div style={{ width: "85%", margin: "4rem auto" }}>
      <h1>My Movie</h1>
      <div>
        <UserMovie
          movies={props.user.movieDetail && props.user.movieDetail}
          removeItem={removeFromCart}
        />
      </div>

      {ShowTotal ? <br /> : <Empty description={false} />}
    </div>
  );
}

export default MyMovie;
