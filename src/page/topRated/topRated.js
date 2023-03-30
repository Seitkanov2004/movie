import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../ApiKey/apiKey";
import MoveCard from "../movieCard/moveCard";
import {LanguageContext} from "../../context";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import {BiArrowBack} from "react-icons/bi";

const TopRated = () => {

    const [page, setPage] = useState(1)
    const [topRated, setTopRated] = useState([])
    const [swiper, setSwiper] = useState(1)

    const {language} = useContext(LanguageContext)
    const getTopRated = async () => {
        const res = await axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=${language}&page=${page}`)
        window.scroll(0,0)
        const {data} = await res
        setTopRated(data.results)
    }
    const hoverSlider = () => {
        const res = []

        const num = page

        for (let i = 1; i < 4; i++){
            res.push(<div style={{
                transition: ".4s",
                transform: page === i ? "scale(1.2)"  : "",
                cursor: 'pointer',
                background: page === i ? '#2FFFF8FF' : ""
            }} id={i}>{i}</div>)
        }
        return res
    }


    useEffect(() => {
        getTopRated()
    }, [page, language])

    return (
        <section id='topRated'>
            <div className="container">
                <div className="">
                    <div>
                        {
                            topRated.map(el => <MoveCard el={el}/>)
                        }
                    </div>

                    <div className='nextDad'>
                        <button className='next-btn' onClick={() => setPage(page === 1 ? page : page - 1)} style={{
                            opacity: page === 1 ? ".2" : "1",
                        }}><BiArrowBack/>
                        </button>
                        <div className='block--red' id={page}>
                            {hoverSlider()}
                            <div>:</div>
                            <div style={{
                                transition: '.4s',
                                transform: page > 3 ? 'scale(1.2)' : '',
                                background: page > 3 ? '#2FFFF8FF' : ''
                            }}>{page > 3 ? page : 4}</div>

                        </div>
                        <button className='next-btn' onClick={() => {
                            setPage(page + 1)
                        }} style={{
                            opacity: page === -1 ? ".2" : "1",
                        }}><BsArrowRight/>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TopRated;