import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Helmet from "react-helmet";
import Loader from "Components/Loader";
import MyScoreSection from "Components/MyScoreSection";
import MyScorePoster from "Components/MyScorePoster";
import Message from "Components/Message";

const Container = styled.div`
  padding: 20px;
`;

const MyScorePresenter = ({ loading, popular, error, score }) => (
  <>
    <Helmet>
      <title>Score | Nomflix</title>
    </Helmet>

    {loading ? (
      <Loader />
    ) : (
      <Container>
        {popular && popular.length > 0 && (
          <MyScoreSection title="My Score">
            {popular.map((movie) => (
              <MyScorePoster
                key={movie.id}
                id={movie.id}
                imageUrl={movie.poster_path}
                title={movie.title}
                isMovie={true}
                score={score}
              />
            ))}
          </MyScoreSection>
        )}
        {error && <Message color="#e74c3c" text={error} />}
      </Container>
    )}
  </>
);

MyScorePresenter.propTypes = {
  movieResults: PropTypes.array,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
  score: PropTypes.number,
};

export default MyScorePresenter;
