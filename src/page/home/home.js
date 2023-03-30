import React, {useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../ApiKey/apiKey";
import MoveCard from "../movieCard/moveCard";
import Slider from "react-slick";
import {NavLink} from "react-router-dom";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs";

const Home = () => {

    let settings = {
        dots: false,
        infinite: true,
        autoPlay: true,
        autoplaySpeed: 2000,
        arrows:true,
        nextArrow: <BsFillArrowRightCircleFill className="home-arrow"/>,
        prevArrow: <BsFillArrowLeftCircleFill className="home-arrow"/>,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true,
                    autoPlay: true,
                    autoplaySpeed: 2000,
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    const [counter, setCounter] = useState([])

    const getCounter = async () => {
        const res = await axios(`https://api.themoviedb.org/3/movie/top_rated?api_key=${APIKEY}&language=en-US&page=1`)
        const {data} = await res
        setCounter(data.results)
    }

    useEffect(() => {
        getCounter()
    }, [])
    return (
        <section id='home'>
            <div className='container'>
                <div className="home">
                    <Slider {...settings}>
                        {
                            counter.map(el => <MoveCard el={el}/>)
                        }
                    </Slider>
                </div>
            </div>
        </section>
    );
};

export default Home;