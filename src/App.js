import logo from './logo.svg';
import './App.css';
import './styles/index.scss'
import {Routes, Route} from "react-router-dom";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Home from "./page/home/home";
import Popular from "./page/popular/popular";
import TopRated from "./page/topRated/topRated";
import DetailPage from "./page/detailPage/detailPage";
import Movie from "./page/movie/movie";
import {useState} from "react";
import AboutActors from "./page/aboutActors/aboutActors";
import UpComing from "./page/upComing/upComing";
import SearchResult from "./components/searchResult/searchResult";
import Navbar from "./components/navbar/navbar";

function App() {

    const [mode, setMode] = useState(JSON.parse(localStorage.getItem("mode") || false))

    const changeThem = (mode) => {
        setMode(!mode)
        localStorage.setItem('mode', JSON.stringify(!mode))
    }

    return (
        <div style={{
            background: mode ? 'white' : '',
            color: mode ? 'black' : '',
            transition: '.7s'
        }}>
            <Header/>
            <Navbar changeThem ={changeThem} />
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/popular'} element={<Popular style={{
                    background: mode ? "white" : ""
                }}/>}/>
                <Route path={'/topRated'} element={<TopRated/>}/>
                <Route path={'/top-rated/rated-info/:id'} element={<DetailPage/>}/>
                <Route path={'/top-rated/rated-info/:id/:name'} element={<AboutActors/>}/>
                <Route path={'/up-coming'} element={<UpComing/>}/>
                <Route path={'/movie'} element={<Movie/>}/>
                <Route path={'/movies/movie-search/:movieName'} element={<SearchResult/>}/>

            </Routes>
            <Footer/>
        </div>
    );
}

export default App;
