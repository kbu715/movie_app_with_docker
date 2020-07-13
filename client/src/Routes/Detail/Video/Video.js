import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Video = ({ video }) => {
  return (
    <Wrapper>
      <iframe
        width="500"
        height="230"
        src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
        frameBorder="0"
        allow="accelerometer; autoplay encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Wrapper>
  );
};

export default Video;
