import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component';

import { fetchDataFromApi } from '../../utils/api';
import ContentWrapper from "../../components/contentWrapper/ContentWrapper"

import "./searchResult.scss"
import Spinner from '../../components/spinner/Spinner';
import MovieCard from '../../components/movieCard/MovieCard';


const SearchResult = () => {

    const [data, setData] = useState(null)  // this is main state for fetch api 
    const [pageNum, setPageNum] = useState(1)  // this state check whole api pages
    const [loading, setLoading] = useState(false)
    const { mediaType, query } = useParams() // this hook set our query


    // here fetch initial or first time get data
    const fetchInitialData = () => {
        setLoading(true)
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((response) => {
                setData(response)
                setPageNum((prevData) => prevData + 1)
                setLoading(false)
            })
    }

    // Esme next page ko get karna hai aur hame before page wale data ke sath 
    const fetchNextPageData = () => {
        fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`)
            .then((response) => {
                if (data?.results) {
                    setData({
                        ...data, results: [...data?.results, ...response?.results]
                    })
                } else {
                    setData(response)
                }
                setPageNum((prevData) => prevData + 1)
            })
    };

    useEffect(() => {
        setPageNum(1)
        fetchInitialData();
    }, [query])


    return (
        <div className='searchResultsPage'>
            {loading && <Spinner initial={true} />}
            {!loading &&
                <ContentWrapper>
                    {data?.results?.length > 0 ?
                        (<>
                            <div className="pageTitle">
                                {`Search ${data?.total_results > 1 ? "results" : "result"} of '${query}'`}
                            </div>
                            <InfiniteScroll
                                className='content'
                                dataLength={data?.results?.length}
                                next={fetchNextPageData}
                                hasMore={pageNum <= data?.total_pages}
                                loader={<Spinner />}
                            >
                                {
                                    data?.results?.map((item, index) => {
                                        if (item?.media_type === "person") return;
                                        return (
                                            <MovieCard key={index} data={item} fromSearch={true} mediaType={mediaType} />
                                        )
                                    })
                                }
                            </InfiniteScroll>
                        </>) :
                        (
                            <span className='resultNotFound'>
                                Sorry, Result Not Found!
                            </span>
                        )}
                </ContentWrapper>}
        </div>
    )
}

export default SearchResult;

