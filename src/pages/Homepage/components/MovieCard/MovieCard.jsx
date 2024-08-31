import React from 'react'
import './MovieCard.style.css'

const MovieCard = ({ movie }) => {
    const imageUrl = `https://www.themoviedb.org/t/p/original${movie.poster_path}`;
    return (
        <div className='movie__cards'>
            <div
                className='movie__card'
                style={{
                    backgroundImage: `url(${imageUrl})`,
                }}>

                <div>
                    {/* <h1 className='movie__card__title'>{movie?.title}</h1> */}
                    {/* <div>{movie.genre_ids.map((id) => ({ id }))}</div> */}
                </div>
                {/* <div className='movie__card__vote'>{movie.vote_average}</div> */}
                {/* <div>{movie.popularity}</div> */}

            </div>
        </div>
    )
}

export default MovieCard

