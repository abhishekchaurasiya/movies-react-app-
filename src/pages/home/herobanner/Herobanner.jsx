import React, { useEffect, useState } from 'react'
import "./herobanner.scss"
import { useNavigate } from 'react-router-dom';
import UseFetch from '../../../Hooks/UseFetch';
import { useSelector } from 'react-redux';


import Img from '../../../components/lazyLoadImages/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';



const Herobanner = () => {
    const [background, setBacground] = useState("");
    const [query, setQuery] = useState("");

    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate()


    // end point of upcoming movie
    const { data, loading } = UseFetch("/movie/upcoming")

    

    // Using useeffect for api call and get bakground image 
    useEffect(() => {
        const bg = url?.backdrop + data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBacground(bg)
    }, [data])

    // Ss hadler ke inside firstly check karte hai ki input tag empty nahi ho chahiye and only enter hone par hi api hit honi chahiye
    const searchQueryHandler = (event) => {
        if (event.key === "Enter" && query.length > 0) {
            navigate(`/search/${query}`)
        }
    };


    return (
        <div className="heroBanner">

            {
                !loading && <div className='backdrop_image'>
                    <Img src={background} />
                </div>
            }

            <div className="opacity-layer"></div>

            <ContentWrapper>
                <div className="wrapper">
                    <div className="heroBannerContent">
                        <span className='title'>Welcome. </span>
                        <span className="subtitle">
                            Millions of movies, TV shows and people to discover. Explore now.
                        </span>
                        <div className='searchInput'>
                            <input
                                type="text"
                                placeholder='Search for a movie & tv show...'
                                onChange={(event) => setQuery(event.target.value)}
                                onKeyUp={searchQueryHandler}
                            />
                            <button>Search</button>
                        </div>
                    </div>
                </div>
            </ContentWrapper>

        </div>
    )
}

export default Herobanner
