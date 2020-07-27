// import React from 'react';
// import styled from 'styled-components';

// const Container = styled.div`
// box-sizing: border-box;
// background-color: black;
// 	flex-direction: column;
// 	font-family: 'Montserrat', sans-serif;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	height: 100px;
// 	margin: 0;
// `;

// const Progressbar = styled.div`
// background-color: #d8d8d8;
// 	border-radius: 20px;
// 	position: relative;
// 	margin: 15px 0;
// 	height: 30px;
// 	width: 300px;
// `;

// const Progress_done = styled.div`
// background: linear-gradient(to left, #F2709C, #FF9472);
// 	box-shadow: 0 3px 3px -5px #F2709C, 0 2px 5px #F2709C;
// 	border-radius: 20px;
// 	color: #fff;
// 	display: flex;
// 	align-items: center;
// 	justify-content: center;
// 	height: 100%;
// 	width: 0;
// 	opacity: 0;
// 	transition: 1s ease 0.3s;
// `;


// const Progress = ({ done }) => {
//     const [style, setStyle] = React.useState({});

//     setTimeout(() => {
//         const newStyle = {
//             opacity: 1,
//             width: `${done}%`
//         }
//         setStyle(newStyle);
//     }, 100)
//     return (
//         <Container>
//             <Progressbar>
//                 <Progress_done>
//                     {done}%
//               </Progress_done>
//             </Progressbar>
//         </Container>
//     );
// };

// export default Progress;