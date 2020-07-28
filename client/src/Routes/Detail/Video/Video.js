import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-awesome-modal";

const Button = styled.button`
  /* -webkit-border-radius: 3px;
  -moz-border-radius: 3px;
  -ms-border-radius: 3px;
  border-radius: 3px;
  -webkit-transition: all 0.5s;
  -moz-transition: all 0.5s;
  -ms-transition: all 0.5s;
  transition: all 0.5s;
  color: white;
  border-color: white;
  background: transparent;
  margin-left: 5px; */

  display: flex;
  flex-direction: row-reverse;
  --webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  line-height: 1;
  font-weight: 500;
  font-size: 1.3rem;
  width: auto;
  --webkit-box-flex: 0;
  flex-grow: 0;
  color: #263238;
  /* background-color: transparent; */
  box-shadow: none;
  text-decoration: none;
  outline: none;
  padding: 1.2rem 3rem;
  border-radius: 5rem;
  transition: all 600ms cubic-bezier(0.075, 0.82, 0.165, 1) 0s;
`;

const Video = ({ video }) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={openModal}>Trailer</Button>
      <Modal
        visible={visible}
        width="20%"
        height="20%"
        effect="fadeInUp"
        onClickAway={closeModal}
      >
        <div>
          <iframe
            width="500"
            height="230"
            src={`https://www.youtube.com/embed/${video.key}`}
            frameBorder="0"
            allow="accelerometer; autoplay encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>

          <button onClick={closeModal}>닫기</button>
        </div>
      </Modal>
    </div>
  );
};

export default Video;
