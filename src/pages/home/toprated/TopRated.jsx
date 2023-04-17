import React, { useEffect, useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchtabs/SwitchTabs';

import useFetch from '../../../Hooks/UseFetch';
import Carousel from '../../../components/carousel/Carousel';


const TopRated = () => {
    const [endPoint, setEndPoint] = useState("movie");

    const { data, loading } = useFetch(`/${endPoint}/top_rated`)

    const onTabChangeHandler = (tab, index) => {
        setEndPoint(tab === "Movies" ? "movie" : "tv");
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Top Rated</span>

                {/* data me array store karke apne tabs ko dynamicaly create kar skte hai  */}
                <SwitchTabs data={["Movies", "TV Shows"]} onTabChangeHandler={onTabChangeHandler} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading} endPoint={endPoint} />
        </div>
    )
}

export default TopRated
