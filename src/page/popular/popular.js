import React, {useContext, useEffect, useState} from 'react';
import axios from "axios";
import {APIKEY} from "../../ApiKey/apiKey";
import MoveCard from "../movieCard/moveCard";
import {LanguageContext} from "../../context";

const Popular = () => {

    const [popular, setPopular] = useState([])

    const {language} = useContext(LanguageContext)

    const getPopular = async () => {
        const res = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${APIKEY}&language=${language}&page=1`)
        const {data} = await res
        setPopular(data.results)
    }

    useEffect(() => {
        getPopular()
    }, [language])

    console.log(popular)

    return (
        <section id='movies'>
            <div className='container'>
                <div className="movies">
                    {
                        popular.map(el => <MoveCard el={el}/>)
                    }
                </div>
            </div>
        </section>
    );
};

export default Popular;