import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TMDB_TOKEN = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzODc1NzA0MmUyOGMzYjcwYTBmNmUwM2Q1YWI4MDI3YiIsInN1YiI6IjYzODA1MzI3YTRhZjhmMDBhOTJkYThkNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.g5TJI58G5xG-qwPSiapNcuC-MgynhXCvIkq0YTScTbU"

// es token ko base url ke headers ke inside send karna hai 

const headers = {
    Authorization: "bearer " + TMDB_TOKEN
};

// Create a function and get all api end point 
export const fetchDataFromApi = async (url, params) => {
    try {
        const response = await axios.get(
            BASE_URL + url, {
            headers,  // this is configuration part send headers and params
            params
        });
        return response.data;
    } catch (error) {
        console.log(error)
        return error
    }
};
