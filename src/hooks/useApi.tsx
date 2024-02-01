import { useState, useEffect } from 'react';
import axios from 'axios';

interface APiProsp {
    data: object;
    loading: boolean;
    error: string | object;
}

function useApi(url: string): APiProsp {
 const [data, setData] = useState({});
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState({});

 useEffect(() => {
    axios.get(url)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
 }, [url]);

 return { data, loading, error };
}

export default useApi;
