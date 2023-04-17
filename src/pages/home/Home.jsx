import React, { useEffect } from 'react';
import "./Home.scss"
import Herobanner from './herobanner/Herobanner';
import Trending from './trending/Trending';
import Popular from './popular/Popular';
import TopRated from './toprated/TopRated';


const Home = () => {


    return (
        <div className='homePage'>
            <Herobanner />
            <Trending />
            <Popular />
            <TopRated />
            {/* <div style={{ height: 1000 }}></div> */}
        </div>
    )
}

export default Home
