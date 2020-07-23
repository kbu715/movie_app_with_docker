import React, { useEffect, useState, useRef } from "react";
import {
  API_URL,
  API_KEY,
} from "../../Components/Config";
import Helmet from "react-helmet";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import MyScoreSection from "./MyScoreSection";
import MyScorePoster from "./MyScorePoster";
import ProgressBar from '@ramonak/react-progress-bar'

const Container = styled.div`
  padding: 20px;
`;

const Button = styled.button`
background-color:black;
border: 1px solid black;
`;

const Progress = styled.div`
  width: 70%;
  height: 100px;
  align-items: center;
  padding-top: 25px;
  margin-left: 200px;
`;

const Select = styled.span`
  width: 100%;
  height: 50px;
  margin-left: 800px;
  text-align: center;
  font-size: 40px;
  font-weight: 500;
`;

function MyScore() {
  const buttonRef = useRef(null);

  const [Movies, setMovies] = useState([]); //보여줄 영화목록
  const [Loading, setLoading] = useState(true);
  const [CurrentPage, setCurrentPage] = useState(1);
  // const [CurrentPage, setCurrentPage] = useState(parseInt(Math.random() * 100));
  const [count, setCount] = useState(0);

  useEffect(() => {
    //1. 처음 api 불러오기
    const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=ko-KR&page=${CurrentPage}&region=KR`;
    fetchMovies(endpoint);
  }, []);

  useEffect(() => {
    //3. scroll 이벤트
    window.addEventListener("scroll", handleScroll);
  }, []);

  const fetchMovies = (endpoint) => {
    //2. 영화불러오는 func
    fetch(endpoint)
      .then((result) => result.json())
      .then((result) => {
        //result : 전체영화결과
        //movie결과(처음에는 아무것도X)
        //result의 가져오는 영화만
        setMovies([...Movies, ...result.results]) //movies+result

        setCurrentPage(result.page); //페이지
      }, setLoading(false))
      .catch((error) => console.error("Error:", error));
  };

  const loadMoreItems = () => { //item load(fetchMovie 연장선)
    let endpoint = "";
    setLoading(true);
    console.log("CurrentPage", CurrentPage);
    if (CurrentPage < 101) {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${
        CurrentPage + 1
        }`;
    } else {
      endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=0`;
    }

    fetchMovies(endpoint);
  };

  const handleScroll = () => { //scroll처리
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
            <Select>{count}</Select>
            <Progress>
            <ProgressBar completed={count} bgcolor={"yellow"} labelColor={"black"}/>
            </Progress>
            {Movies && Movies.length > 0 && (
              <MyScoreSection title="My Score">
                {Movies.map((movie) => (
                  <MyScorePoster
                    key={movie.id}
                    movieId={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    count={count}
                    setCount={setCount}
                  />
                )
                )
                }
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