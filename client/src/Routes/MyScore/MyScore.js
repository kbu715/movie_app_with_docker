import React, { useEffect, useState, useRef } from "react";
import {
  API_URL,
  API_KEY,
  IMAGE_BASE_URL,
  IMAGE_SIZE,
  POSTER_SIZE,
} from "../../Components/Config";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import MyScoreSection from "../../Components/MyScoreSection";
import MyScorePoster from "../../Components/MyScorePoster";
import Message from "../../Components/Message";

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
background-color:black;
border: 1px solid black;
`;

function MyScore() {
  const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]);
  const [MainMovieImage, setMainMovieImage] = useState(null);
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    //1.
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    fetchMovies(endpoint);
  }, []);
  useEffect(() => {
    //3
    window.addEventListener("scroll", handleScroll);
  }, []);
  const fetchMovies = (endpoint) => {
    //2.
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        // console.log(result) //result : 영화결과
        // console.log('Movies',...Movies) //movie결과(처음에는 아무것도X)
        // console.log('result',...result.results) //result의 영화정보만
        setMovies([...Movies, ...result.results]); //movies+result
        setMainMovieImage(MainMovieImage || result.results[0]);
        setCurrentPage(result.page); //페이지
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };
  const loadMoreItems = () => {
    let endpoint = "";
    setLoading(true);
    console.log("CurrentPage", CurrentPage);
    endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
      CurrentPage + 1
    }`;
    fetchMovies(endpoint);
  };
  const handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;

    if (windowBottom >= docHeight - 1) {
      // loadMoreItems()
      console.log("clicked");
      buttonRef.current.click();
    }
  };
  return (
    <>
      <Helmet>
        <title>Score | Nomflix</title>
      </Helmet>
      {Loading ? (
        <Loader />
      ) : (
        <Container>
          {Movies && Movies.length > 0 && (
            <MyScoreSection title="My Score">
              {Movies.map((movie) => (
                <MyScorePoster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                />
              ))}
            </MyScoreSection>
          )}
          {Loading && <div>Loading...</div>}
          <br />
            <Button
              ref={buttonRef}
              className="loadMore"
              onClick={loadMoreItems}
            >
              Load More
            </Button>
        </Container>
      )}
    </>
  );
}

export default MyScore;