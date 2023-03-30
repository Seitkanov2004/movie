import React from "react";
// import "./Movie.css";

function Movie({ title, year, image }) {
    return (
        <div className="movie">
            <img src={image} alt={title} />
            <h2>{title}</h2>
            <p>{year}</p>
        </div>
    );
}

function MovieList() {
    const movies = [
        {
            title: "The Shawshank Redemption",
            year: 1994,
            image:
                "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg",
        },
        {
            title: "The Godfather",
            year: 1972,
            image:
                "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
        },
        {
            title: "The Dark Knight",
            year: 2008,
            image:
                "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
        },
    ];

    return (
        <div className="movie-list">
            {movies.map((movie) => (
                <Movie key={movie.title} title={movie.title} year={movie.year} image={movie.image} />
            ))}
        </div>
    );
}

export default MovieList;
