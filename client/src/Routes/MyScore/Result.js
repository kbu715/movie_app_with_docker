import React, { useEffect } from 'react';
import Axios from 'axios';
import { useSelector } from 'react-redux';
import styled from "styled-components";

const Container = styled.div`
    /* border: 1px solid red; */
`;

const Header = styled.div`
    font-size : 40px;
    color : black;
`;

const Chart =  styled.div`
    background-color: gray;
    font-size: 20px;
    width: 400px;
    height: 400px;
    margin-top: 16px;
`;

const Result = () => {
    const user = useSelector(state => state.user);

    useEffect(() => {
        Axios.post("/api/myscore/result", {
            userFrom: localStorage.getItem("userId")
        }).then(response => {
            if (response.data.success) {
                response.data.obj.map(item => {
                    console.log("genres:", item.genres);
                })
            } else {
                console.log("fail");
            }
        })
    }, []);

    return (
<Container>
            {/* user 이름 가져오기 */}
            <Header>{user.userData && user.userData.name}님의 결과
            {/* chart 보여주기 */}
                <Chart>
                    test결과
                </Chart>
            </Header>
            </Container>
    );
};

export default Result;