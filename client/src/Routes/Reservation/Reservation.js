import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import Modal from "react-awesome-modal";
import ModalVideo from "react-modal-video";

const Button = styled.button`
  -webkit-border-radius: 3px;
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
  margin-left: 5px;
`;

const Reservation = ({ video }) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return (
    <div>
      <Button onClick={openModal}>간편예매</Button>
      <Modal
        visible={visible}
        width="80%"
        height="80%"
        effect="fadeInUp"
        onClickAway={closeModal}
      >
        <div>
          <iframe
            width="500"
            height="230"
            src={`https://www.youtube.com/embed/${video.key}?autoplay=1`}
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

export default Reservation;
