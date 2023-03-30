import React, {useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../ApiKey/apiKey";
import MoveCard from "../movieCard/moveCard";

const UpComing = () => {
    const [page, setPage] = useState(1)
    const [upComing, setUpComing] = useState([])

    const getUpComing = async () => {
        const res = await axios(`https://api.themoviedb.org/3/movie/upcoming?api_key=${APIKEY}&language=en-US&page=${page}`)
        const {data} = await res
        setUpComing(data.results)
    }

    useEffect(() => {
        getUpComing()
    }, [page])
    return (
        <section id='topRated'>
            <div className="container">
                <div className="dadTopRated">
                    <div className="topRated">
                        {
                            upComing.map(el => <MoveCard el={el}/>)
                        }
                    </div>

                    <div className='nextDad'>
                        <button className='next-btn' onClick={() => setPage(page === 1 ? page : page - 1)}>prev</button>
                        <span className='next-text'>{page}</span>
                        <button className='next-btn' onClick={() => setPage(page + 1)}>next</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UpComing;