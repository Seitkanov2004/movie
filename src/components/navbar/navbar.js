import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {BsFillSunFill, BsMoonStarsFill} from "react-icons/bs";

const Navbar = ({changeThem}) => {
    const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode") || false))
    const fn = (mode) => {
        changeThem(mode)
        setMode(!mode)
    }
    return (
        <section id='navbar'>
            <div className="container">
                <div className="navbar">
                    <div className="navbar--nav">
                        <NavLink to={'/popular'}>popular</NavLink>
                        <NavLink to={'/topRated'}>top rated</NavLink>
                        <NavLink to={'/movie'}>movie</NavLink>
                        <NavLink to={'/up-coming'}>up coming</NavLink>
                    </div>
                    <button className='navbar--btn' style={{
                        color: !mode ? 'white' : "black",
                        background: mode ? "#fffb00" : "black",
                        transition: '.4s'
                    }} onClick={() => fn(mode)}>{!mode ? <BsFillSunFill/> : <BsMoonStarsFill/>}</button>
                </div>
            </div>
        </section>
    );
};

export default Navbar;