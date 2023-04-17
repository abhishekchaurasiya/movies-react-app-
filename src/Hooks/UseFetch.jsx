import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";


const useFetch = (url) => {
    const [data, setData] = useState("");
    const [loading, setLoading] = useState("");
    const [error, setError] = useState(null);
    
    
    useEffect(() => {
        setLoading("Loading....");
        setData("");
        setError(null);

        fetchDataFromApi(url)
            .then((res) => {
                setLoading(false);
                setData(res);
            })
            .catch((err) => {
                setLoading(false);
                setError("Something went wrong!");
            });
    }, [url]);

    return { data, loading, error };
};

export default useFetch;