import React from 'react'
import "./Genres.scss";
import { useSelector } from 'react-redux';


const Genres = ({ data }) => {
    const { genres } = useSelector((state) => state.home);

    return (
        <div className='genres'>
            {
                data?.map((genresId) => {
                    if (!genres[genresId]?.name) return;
                    return (
                        <div className='genre' key={genresId}>
                            {genres[genresId]?.name}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Genres
