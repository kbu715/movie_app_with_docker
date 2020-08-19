import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color: white;
    }
    *{
        color: inherit;
        box-sizing:border-box;
    }
    body{
        font-family: "Netflix Sans Icon";
        font-size:14px;
        background-color:black;
        color:white;
        padding-top:50px;
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@700&family=Oswald:wght@400;600&display=swap');
    }
    
`;
export default globalStyles;
