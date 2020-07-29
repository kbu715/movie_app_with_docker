import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styled from "styled-components";
import RecentRating from './RecentRating';
import GenrePreference from './GenrePreference';
import { moviesApi } from '../../../api';

const Container = styled.div`

`;

const Header = styled.div`
    font-size : 30px;
    color : black;
    text-align: center;
`;

const ChartContainer = styled.div`
    text-align: center;
`;


const Result = () => {
    const user = useSelector(state => state.user);
    const [recent, setRecent] = useState([]);
    const [result, setResult] = useState([]);
    const [genre, setGenre] = useState();

    useEffect(() => {
        axios.post("/api/myscore/recent", {
            userFrom: localStorage.getItem("userId")
        }).then(response => {
            if (response.data.success) {
                setResult(response.data.obj)
                let arr = response.data.obj.reverse()
                setRecent(arr.slice(0, 3))
            } else {
                console.log("fail");
            }
        })
        genreApi();
    }, []);

    async function genreApi() { 
        const {
            data : {
                genres
            }
        } = await moviesApi.genre();
        setGenre(genres);
    }
// result : genres imageUrl movieId score title userFrom          
//genre: {id: 28, name: "액션"}

console.log("result:", result);
console.log("genres:", genre);

return (
    <Container>
            <Header>{user.userData && user.userData.name}님의 결과 </Header>
            <ChartContainer>
                <RecentRating recent={recent} />
                <GenrePreference user={user} result={result} genre={genre}/>
            </ChartContainer>
        </Container>
    );
};

export default Result;
/*<div className=“row”>
                {SeatA.map((item) => { //장르 arr
                  if (Distinct.includes(item.value)) { //Distinct:DB
                    return (
                      <div >
                        {item.value}
                      </div>
                    );
                  } else {
                    return (
                      <div>
                        {item.value}
                      </div>
                    );
                  }
                })}
              </div>
*/