import React,{useState,useEffect} from 'react';
import axios from './axios';
import requests from './requests';
import "./Row.css";
import YouTube from "react-youtube";
import movieTrailer from 'movie-trailer';

const base_url="http://image.tmdb.org/t/p/original/";

function Row({title,fetchUrl,isLargeRow}) {
    const [movies,setMovies]=useState([]);
    const[trailerUrl,setTrailerUrl]=useState("");
    useEffect(() => {
        
        async function fetchData(){
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            console.log(request);
            return request;
        }
        fetchData();
        
    }, [fetchUrl]);
    const opts ={
        height:"390",
        width:"100%",
        playerVars:{
            autoplay:1,
        },
    };
    console.log(movies);
    const handleClick = async (movie)=>{
        if(trailerUrl){
            setTrailerUrl("");
        }else{
                let trailerurl=await axios.get(
                    `/movie/${movie.id}/videos?api_key=a00e69f62485a15bac02784ca6c647b3`
                );
            setTrailerUrl(trailerurl.data.results [0]?.key)
            
        }
    };
    return (
        <div className="row">
            
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map(movie=>(
                    <img 
                    key={movie.id}
                    onClick={()=>handleClick(movie)}
                    className={`row__poster ${isLargeRow && "row__posterLarge"}` }
                    src={`${base_url}${isLargeRow ? movie.poster_path:movie.backdrop_path}`} alt={movie.name}></img>
                    ))}
                
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}

export default Row
