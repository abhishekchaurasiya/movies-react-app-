import { Route, Routes } from "react-router-dom"
import { useState, useEffect } from "react";
import { fetchDataFromApi } from "./utils/api";
import { useDispatch, useSelector } from "react-redux";
import { getApiConfiguration, getGenres } from "./store/homeSlice";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home"
import Details from "./pages/details/Details";
import SearchResult from "./pages/serachResult/SearchResult";
import Explorer from "./pages/explorer/Explorer";
import PageNotFound from "./pages/404/PageNotFound";


function App() {
  const { url } = useSelector((state) => state.home) // here is access our store 

  const dispatch = useDispatch() // here add api response in our store

  useEffect(() => {
    fetchApiConfig();
    genresCall()
  }, []);

  // this method use for get images with configuration endpoints
  const fetchApiConfig = async () => {
    const data = await fetchDataFromApi("/configuration");

    // here three type ki images ki need hai hame like (poster, backdrop, profile) and redux store me save kar diya 
    let url = {
      backdrop: data.images.base_url + "original",
      poster: data.images.base_url + "original",
      profile: data.images.base_url + "original",
    }

    dispatch(getApiConfiguration(url))
  }

  // Multiple apis ko call karne ke liye Promise.all() function ka use karte hai 
  const genresCall = async () => {
    const promies = [];
    const endPoints = ["tv", "movie"];
    const allgenres = {};
  
    endPoints.forEach((url) => {
      promies.push(fetchDataFromApi(`/genre/${url}/list`))
    });

    const data = await Promise.all(promies);

    data.map(({ genres }) => {
      return genres.map((item) => (
        allgenres[item.id] = item
      ))
    })

    dispatch(getGenres(allgenres))
  }



  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explorer />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
