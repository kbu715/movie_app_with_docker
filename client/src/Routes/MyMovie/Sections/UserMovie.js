import React from "react";
import "./UserMovie.css";
function UserMovie({ movies, removeItem }) {
 console.log("UserMovie Test",movies)
  const renderItems = () =>(
    movies &&
    (movies.map((movie, index) => (
      <tr key={index}>
        <td>{movie.title}</td>
        <td>{movie.continent}명</td>
        <td>${movie.price}</td>
        <td>
          <button onClick={() => removeItem(movie.id)}>환불</button>
        </td>
      </tr>
    ))));

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>제목</th>
            <th>인원</th>
            <th>가격</th>
            <th>환불</th>
          </tr>
        </thead>
        <tbody>{renderItems()}</tbody>
      </table>
    </div>
  );

}

export default UserMovie;
