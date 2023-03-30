import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import {APIKEY} from "../../ApiKey/apiKey";
import Slider from "react-slick";
import {LanguageContext} from "../../context";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill} from "react-icons/bs";

const AboutActors = () => {

    let settings = {
        dots: false,
        infinite: true,
        autoPlay: true,
        autoplaySpeed: 2000,
        arrows: true,
        speed: 500,
        slidesToShow: 4,
        nextArrow: <BsFillArrowRightCircleFill className="home-arrow"/>,
        prevArrow: <BsFillArrowLeftCircleFill className="home-arrow"/>,
        slidesToScroll: 4,
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

    const {id} = useParams()

    const [view, setView] = useState()

    const {language} = useContext(LanguageContext)

    const [aboutActor, setAboutActor] = useState({})

    const [movie, setMovie] = useState([])

    const getAboutActor = async () => {
        try {
            const about = await axios(`https://api.themoviedb.org/3/person/${id}?api_key=${APIKEY}&language=${language}`)
            const {data} = await about
            await setAboutActor(data)
        } catch (e) {
            console.log(e, 'error')
        }
    }

    const getMovies = async () => {
        try {
            const actorMovie = await axios(`https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${APIKEY}&language=${language}`)
            const {data} = await actorMovie
            await setMovie(data.cast)
        } catch (e) {
            console.log(e, 'error')
        }
    }

    const Toggle = (text) => {
        return view === 300 ? setView(text.length) : setView(300)
    }

    useEffect(() => {
        getAboutActor()
        getMovies()
    }, [language])


    console.log(movie)

    return (
        <section id='actors'>
            <div className="container">
                <div className="momActors">
                    <div className="actors">
                        {
                            <div className='actor--block'>
                                <img
                                    src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${aboutActor.profile_path}`}
                                    alt=""/>
                                <div className='actor--block__title'>
                                    <h1>{aboutActor.name}</h1>
                                    <p>{aboutActor.biography && aboutActor.biography.slice(0, view)}
                                        <span style={{
                                            color: 'red'
                                        }}
                                              onClick={() => Toggle(aboutActor.biography)}>{view === 300 ? '  >>>' : '  <<<'}</span>
                                    </p>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="movieActors">
                        <Slider {...settings}>
                            {
                                movie.map(el => (
                                    <div className='movieImg'>
                                        <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${el.poster_path}`}
                                             alt=""/>
                                        <h3>{el.title}</h3>
                                    </div>
                                ))
                            }
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutActors;