import React, {useEffect, useState} from 'react';
import {APIKEY} from "../../ApiKey/apiKey";
import axios from "axios";

const Videos = ({movieId}) => {

    const [video, setVideo] = useState([])
    const getVideo = async () => {
        const url = await axios (`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${APIKEY}&language=en-US`)
        const {data} = await url
        await setVideo(data.results)
    }

    useEffect(() => {
        getVideo()
    },[])
    console.log(video)
    return (
        <div className='videoBlock'>
            {
                video.slice(0,1).map(el => (
                    <iframe width="560" height="315" src={`https://www.youtube.com/embed/${el.key}`}
                            title="YouTube video player" frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen></iframe>
                ))
            }
        </div>
    );
};

export default Videos;