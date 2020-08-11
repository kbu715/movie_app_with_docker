import React, { useState, useEffect } from 'react';
import Axios from 'axios';

const Kakao = ({data}) => {
    
    const [Test, setTest] = useState("");

    console.log("kakao");
    useEffect(()=>{
        Axios.post("/api/kakaoPay/ready", data).then(response => {
          console.log("response.data", response.data);
          if (response.data) {
            console.log("성공");
            let tid = response.data.tid;
            setTest(response.data.next_redirect_pc_url);
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
    },[])
    return (
        <>
           {/* <span style={{color:"black", fontSize:"10px"}}>{Test}</span> */}
           {/* {Test} */}
           {/* <div style={{height:"500px"}}> */}

           <iframe 
            src={Test}  
            width="100%" 
            height="100%"
            />
           {/* </div> */}
        </>
    );
};

export default Kakao;