import React, { useEffect } from "react";

function getParameterByName(name) {
  name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
  var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(window.location.search);
  return results === null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function Approve(props) {
  let pg_token = getParameterByName("pg_token");
  console.log(pg_token);
  console.log(props);
  // useEffect(() => {
  //   Axios.post("/api/kakaoPay/approve", data).then(response => {
  //     console.log("response.data", response.data);
  //     if (response.data) {
  //       console.log("성공");
  //       let tid = response.data.tid;
  //       setTest(response.data.next_redirect_pc_url);
  //       console.log(1);
  //       if (tid) {
  //         // window.location.href = response.data.next_redirect_pc_url;
  //         // setUrl(response.data.next_redirect_pc_url)
  //       }
  //       // axios.post("/api/kakaoPay/approve");
  //     } else {
  //       console.log("실패");
  //     }
  //   });
  // }, []);
  return <div></div>;
}

export default Approve;
