import { axiosInstance } from "@/lib/Axios";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useFetch<T>(url: string) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axiosInstance.get(url);
                const result = await response.data;
                setData(result);
            } catch (err) {
                console.error(err);
                setError("Failed to fetch data");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

return { data, loading, error };

}