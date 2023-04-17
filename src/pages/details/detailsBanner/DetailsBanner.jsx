import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import "./DetailsBanner.scss";

import ContentWrapper from "../../../components/contentWrapper/ContentWrapper";
import useFetch from "../../../Hooks/UseFetch"
import Genres from "../../../components/genres/Genres"
import RatingCircle from "../../../components/ratingCircle/RatingCircle"
import Img from "../../../components/lazyLoadImages/Img";
import PosterFallback from "../../../assets/no-poster.png";
import { PlayIButton } from "../PlayButton";

import VideoPopup from "../../../components/videoPopup/VideoPopup";


const DetailsBanner = ({ video, crew }) => {
    const [show, setShow] = useState(false)
    const [videoId, setVideoId] = useState(null)

    const { mediaType, id } = useParams();

    const { data, loading } = useFetch(`/${mediaType}/${id}`)

    const { url } = useSelector((state) => state.home)

    // get here genres id
    const _genres = data?.genres?.map((genresId) => genresId.id);

    // get writer and director details
    const director = crew?.filter((iterator) => iterator?.job === "Director");
    const writer = crew?.filter((iterator) => iterator?.job === "Screenplay" || iterator?.job === "Story" || iterator?.job === "Writer")

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    };

    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {
                        !!data && (
                            <React.Fragment>
                                <div className="backdrop-img">
                                    <Img src={url?.backdrop + data?.backdrop_path} />
                                </div>
                                <div className="opacity-layer"></div>
                                <ContentWrapper>
                                    <div className="content">
                                        <div className="left">
                                            {data.poster_path ?
                                                (<Img className="posterImg"
                                                    src={url?.backdrop + data?.poster_path}
                                                />) :
                                                (<Img className="posterImg"
                                                    src={PosterFallback}
                                                />)
                                            }
                                        </div>
                                        <div className="right">
                                            <div className="title">
                                                {
                                                    `${data?.name || data?.title}
                                                    (${dayjs(data?.release_date).format("YYYY")})`
                                                }
                                            </div>
                                            <div className="subtitle">
                                                {data.tagline}
                                            </div>
                                            <Genres data={_genres} />
                                            <div className="row">
                                                <RatingCircle rating={data?.vote_average.toFixed(1)} />
                                                <div className="playbtn"
                                                    onClick={() => {
                                                        setShow(true)
                                                        setVideoId(video.key)
                                                    }}>
                                                    <PlayIButton />
                                                    <span className="text">
                                                        Watch Trailler
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="overview">
                                                <div className="heading">
                                                    Overview
                                                </div>
                                                <div className="description">
                                                    {data?.overview}
                                                </div>
                                            </div>
                                            <div className="info">
                                                {
                                                    data?.status && (
                                                        <div className="inofItem">
                                                            <span className="textbold">
                                                                Status:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {data.status}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data?.release_date && (
                                                        <div className="inofItem">
                                                            <span className="textbold">
                                                                Release Date:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {dayjs(data.release_date).format("MMM D, YYYY")}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                                {
                                                    data?.runtime && (
                                                        <div className="inofItem">
                                                            <span className="textbold">
                                                                Runtime:{" "}
                                                            </span>
                                                            <span className="text">
                                                                {toHoursAndMinutes(data?.runtime)}
                                                            </span>
                                                        </div>
                                                    )
                                                }
                                            </div>
                                            {
                                                director?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Director: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {
                                                                director.map((d, index) => (
                                                                    <span key={index}>
                                                                        {d.name}
                                                                        {/* Here check is if director ki last index nahi hai to comma add nahi karna hai   */}
                                                                        {director.length - 1 !== index && ", "}
                                                                    </span>
                                                                ))
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            }

                                            {
                                                writer?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Writer: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {
                                                                writer.map((d, index) => (
                                                                    <span key={index}>
                                                                        {d.name}
                                                                        {/* Here check is if writer ki last index nahi hai to comma add karna hai   */}
                                                                        {writer.length - 1 !== index && ", "}
                                                                    </span>
                                                                ))
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            }

                                            {
                                                data?.created_by?.length > 0 && (
                                                    <div className="info">
                                                        <span className="text bold">
                                                            Creator: {" "}
                                                        </span>
                                                        <span className="text">
                                                            {
                                                                data?.created_by?.map((d, index) => (
                                                                    <span key={index}>
                                                                        {d.name}
                                                                        {/* Here check is if writer ki last index nahi hai to comma add karna hai   */}
                                                                        {data?.created_by?.length - 1 !== index && ", "}
                                                                    </span>
                                                                ))
                                                            }
                                                        </span>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    </div>
                                    <VideoPopup
                                        show={show}
                                        setShow={setShow}
                                        videoId={videoId}
                                        setVideoId={setVideoId}
                                    />
                                </ContentWrapper>
                            </React.Fragment>
                        )
                    }
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;