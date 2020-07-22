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
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        font-size:12px;
        background-color:black;
        color:white;
        padding-top:50px;
        @import url(‘https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap’);
        font-family: ‘Do Hyeon’, sans-serif;
    }
`;
export default globalStyles;
