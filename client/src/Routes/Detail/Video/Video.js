import React from "react";
import styled from "styled-components";
import ModalVideo from "react-modal-video";

const Wrapper = styled.div`
  margin-bottom: 5rem;
`;

const Video = ({ video, isOpen }) => {
  console.log("video", video.key);
  return (
    <Wrapper>
      {/* <ModalVideo channel="youtube" isOpen={isOpen} videoId={video.id} /> */}
      <iframe
        width="100%"
        height="300"
        src={`https://www.youtube.com/embed/${video.key}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </Wrapper>
  );
};

export default Video;
