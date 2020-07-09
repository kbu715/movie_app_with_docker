import React from "react";
import DetailPresenter from "./DetailPresenter";
import {moviesApi, tvApi} from "api";
export default class extends React.Component {

    constructor(props) {
        super(props);
        const {location: {
                pathname
            }} = props;
        this.state = {
            castResult:null,
             result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes("/movie/")
        };
    }

    async componentDidMount() {
        
        const {
            match: {
                params: {
                    id
                }

            },
            history: {
                push //f push(path, state)
            }
        } = this.props;

        const {isMovie} = this.state;    
        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push('/');
        }
        let result = null;
        let castResult = null;
        try {
            if (isMovie) {
                 ({ data: result } = await moviesApi.movieDetail(parsedId)); // const = 이거랑 양쪽에 () 한거랑 같은거야                
                 ({ data: castResult } = await moviesApi.cast(parsedId)); // const = 이거랑 양쪽에 () 한거랑 같은거야
            } else {
                ({ data: result } = await tvApi.showDetail(parsedId));
            }            

        } catch  {
            this.setState({error: "Can't find anything."})
        } finally {
            this.setState({loading: false, result,castResult})
        }      


    }
    render() {
        const {result, error, loading,castResult,isMovie} = this.state;    
        console.log('====================================');
        console.log(castResult);
        console.log('====================================');
        return (<DetailPresenter isMovie={isMovie} result={result} castResult={castResult} error={error} loading={loading}/>);
    }
}
