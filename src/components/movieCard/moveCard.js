import React from 'react';
import {NavLink} from "react-router-dom";

const MoveCard = ({el}) => {
    return (
        <div className='movies--img'>
            <NavLink to={`/top-rated/rated-info/${el.id}`}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face/${el.poster_path}`} alt=""/>
            </NavLink>
            <h3>{el.title}</h3>
            <div className='movies--img__date'>

            </div>
        </div>
    );
};

export default MoveCard;