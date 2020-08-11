import React from "react";

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

  return <div></div>;
}

export default Approve;
