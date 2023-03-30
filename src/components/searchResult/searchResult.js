import React, {useEffect, useState, Component} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {APIKEY} from "../../ApiKey/apiKey";
import MoveCard from "../movieCard/moveCard"
import Slider from "react-slick";

const SearchResult = () => {

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: false,
        arrows: false,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: true,
        cssEase: "linear"
    };
        const [result, setResult] = useState([])
        const {movieName} = useParams()
        const getResult = async (name, apiKey) => {
            const url = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${name}`)
            const {data} = await url
            await setResult(data.results)
        }

        useEffect(() => {
            getResult(movieName, APIKEY)
        }, [result])
        return (
            <section id='searchMovie' style={{
                paddingTop: '140px'
            }}>
                <div className="container">
                    <div className="searchMovie row">
                        <Slider {...settings}>
                            {
                                result.map(el => <MoveCard el={el}/>)
                            }
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
;

export default SearchResult;