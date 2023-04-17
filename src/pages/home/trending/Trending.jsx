import React, { useEffect, useState } from 'react'

import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';
import SwitchTabs from '../../../components/switchtabs/SwitchTabs';

import useFetch from '../../../Hooks/UseFetch';
import Carousel from '../../../components/carousel/Carousel';


const Trending = () => {
    const [endPoint, setEndPoint] = useState("day");

    const { data, loading } = useFetch(`/trending/all/${endPoint}`)

    const onTabChangeHandler = (tab, index) => {
        setEndPoint(tab === "Day" ? "day" : "week");
    }

    return (
        <div className='carouselSection'>
            <ContentWrapper>
                <span className='carouselTitle'>Trending</span>

                {/* data me array store karke apne tabs ko dynamicaly create kar skte hai  */}
                <SwitchTabs data={["Day", "Week"]} onTabChangeHandler={onTabChangeHandler} />
            </ContentWrapper>
            <Carousel data={data?.results} loading={loading}/>
        </div>
    )
}

export default Trending
