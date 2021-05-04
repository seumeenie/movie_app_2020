/**
 * Movie.js : Movie Component.
 * state를 필요로 하지 않으므로(바뀌지 않는 데이터들) class component가 될 필요가 없음. function component 이용
 * */

import React from "react";
import PropTypes from "prop-types";
import "./Movie.css";

//Movie Component에서 year, title, summary, poster, genres 준비
//alt와 title을 사용하는 이유 : poster위에 마우스를 올렸을 때, movie의 이름이 보이게 함
function Movie({ year, title, summary, poster, genres}){
    return (
        <div className="movie">
            <img src={poster} alt={title} title={title} /> 
            <div className="movie__data">
                <h3 className="movie__title">{title}</h3>
                <h5 className="movie__year">{year}</h5>
                <ul className="movie__genres">
                    {genres.map((genre, index) => (
                        <li key={index} className="genres__genre">
                            {genre}
                        </li>
                    ))}
                </ul>
                <p className="movie__summary">{summary.slice(0, 180)}...</p>
            </div>
        </div>
    );
}

// 원하는 props가 father component인 Movie로 부터 받은, 갖고 있는 props인지 check(점검)하는 작업. 실수를 했을 시 component가 동작하지 않을 것이라고 다양한 오류들을 알려줌.
Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default Movie;