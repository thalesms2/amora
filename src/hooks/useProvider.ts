import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import promiseResults from "./toastPromiseDefault";

import api from "./api";

export default function useProvider() {
    const [providers, setProviders] = useState([]);
    useEffect(() => {
        async function getProviders() {
            try {
                const { data } = await toast.promise(
                    api.get("/provider"),
                    promiseResults
                );
                setProviders(data);
            } catch (err) {
                alert("Err");
            }
        }
        getProviders();
    }, []);
    return providers;
}
