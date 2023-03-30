import React, {useContext, useState} from 'react';
// import {Link} from 'react-router-dom'
import {NavLink, useNavigate} from "react-router-dom";
import {LanguageContext} from "../../context";
import {FiSearch} from "react-icons/fi";
import MovieCard from "../movieCard/moveCard"



const Header = () => {
    const [value, setValue] = useState("");
    const navigate = useNavigate()

    const {setLanguage} = useContext(LanguageContext)

    const getValue = (name) => {
        navigate(`/movies/movie-search/:${name}`)
    }
    return (
        <section id="header">
            <div className='container'>
                <div className="header">
                    <NavLink className='header--logo' to={'/'}>Movie TV</NavLink>
                    <div className='header--search'>
                        <input  onKeyDown={(e) => {
                            if (e.key === "Enter"){
                                getValue(value)
                            }
                        }} onChange={(e) => setValue(e.target.value)} type="search" placeholder='search movie...'/>
                        <button style={{
                            cursor: 'pointer'
                        }} onClick={() => {
                            getValue(value)
                        }}><FiSearch/></button>
                    </div>
                    <div onClick={(e) => setLanguage(e.target.value)} className='language'>
                        <button value='ru-RU'>ru</button>
                        <button value='en-US'>en</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Header;