import React, {useContext, useEffect, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import axios from "axios";
import {APIKEY} from "../../ApiKey/apiKey";
import user from './../../assets/img/user.png'
import Slider from "react-slick";
import videos from "../../components/videos/videos";
import Videos from "../../components/videos/videos";
import {LanguageContext} from "../../context";
import {BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill, BsFillPlayCircleFill} from "react-icons/bs";

const DetailPage = () => {
    let settings = {
        dots: false,
        infinite: false,
        arrows: true,
        speed: 500,
        nextArrow: <BsFillArrowRightCircleFill className="home-arrow"/>,
        prevArrow: <BsFillArrowLeftCircleFill className="home-arrow"/>,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
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

    const [details, setDetails] = useState({})

    const [cast, setCast] = useState([])

    const {language} = useContext(LanguageContext)

    const getDetails = async () => {
        try {
            const link = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${APIKEY}&language=${language}`)
            const {data} = await link
            await setDetails(data)
        } catch (e) {
            console.log(e, "error")
        }
    }

    const getCast = async () => {
        try {
            const url = await axios(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=${APIKEY}&language=${language}`)
            const {data} = await url
            await setCast(data.cast)
        } catch (e) {
            console.log(e, 'error')
        }
    }

    console.log(details)

    useEffect(() => {
        getDetails()
        getCast()
    }, [language])
    return (


        <section id='detailPage'>
            <div className="detailBg" style={{
                background: `url('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/${details.backdrop_path}') no-repeat center/cover`,
            }}>
                <div className="detailBackdrop">
                    <div className="container">
                        <div className="detailBackdrop--block">
                            <img src={`https://www.themoviedb.org/t/p/w300_and_h450_bestv2/${details.poster_path}`}
                                 alt=""/>
                            <div className='detailBackdrop--block__text'>
                                <h1>{details.title}</h1>
                                <div className="detailBackdrop--block__runs" style={{
                                    background: `conic-gradient(yellow ${Math.round(details.vote_average * 10) * 3.59}deg, green 0deg)`
                                }}>
                                    <h5>{Math.round(details.vote_average * 10)}%</h5>
                                </div>
                                <div className="detailBackdrop--block__date">
                                    <h3>{details.release_date}</h3>
                                    <div className='detailBackdrop--block__date--border'>
                                        <h4>{Math.floor(details.runtime / 60)}h {details.runtime % 60}m</h4>
                                    </div>
                                </div>
                                <p>{details.overview}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className='swiper'>
                    <Slider {...settings}>
                        {
                            cast.map(el => (
                                    <div className='swiper--user'>
                                        <div className='swiper--user__img'>
                                            <NavLink to={`/top-rated/rated-info/${el.id}/${el.name}`}>
                                                {
                                                    el.profile_path ?
                                                        <img
                                                            src={`https://www.themoviedb.org/t/p/w138_and_h175_face/${el.profile_path}`}
                                                            alt=""/> : <img src={user} alt="" style={{
                                                            width: '158px', height: '195px', objectFit: 'contain'
                                                        }
                                                        }/>
                                                }
                                            </NavLink>
                                            <h4>{el.name}</h4>
                                            <h5>{el.character}</h5>
                                        </div>
                                    </div>

                                )
                            )
                        }
                    </Slider>
                </div>
            </div>

            <div className="container">
                <Videos movieId={id}/>
            </div>

        </section>


    );
};

export default DetailPage;