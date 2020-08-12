import React, { useState, useEffect } from "react";
import Axios from "axios";
import Approve from "../Approve";

const Kakao = ({ data }) => {
  const [url, setURL] = useState("");
  const [tid, setTID] = useState("");
  console.log("kakao");
  useEffect(() => {
    Axios.post("/api/kakaoPay/ready", data).then(response => {
      console.log("response.data", response.data);
      if (response.data) {
        console.log("성공");
        setTID(response.data.tid);
        setURL(response.data.next_redirect_pc_url);
        console.log(1);
        if (tid) {
          // window.location.href = response.data.next_redirect_pc_url;
          // setUrl(response.data.next_redirect_pc_url)
        }
        // axios.post("/api/kakaoPay/approve");
      } else {
        console.log("실패");
      }
    });
  }, []);
  return (
    <>
      <iframe src={url} width="100%" height="100%" />
    </>
  );
};

export default Kakao;
