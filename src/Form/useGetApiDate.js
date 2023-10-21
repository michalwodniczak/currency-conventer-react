import axios from "axios";
import { useState, useEffect } from "react";

export const useGetApiDate = () => {
    const [apiValue, setApiValue] = useState({
        date: "",
        currencies: [],
        state: "loading"
    });

    useEffect(() => {
        const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_NdeppBDyPclNp621W5p3YmiJkDVgwAQWjWOUIp0N&currencies=EUR%2CUSD%2CGBP&base_currency=PLN";

        const getDate = async () => {

            try {
                const response = await axios.get(url);
                const apiDate = response.data.meta.last_updated_at;
                const myDate = new Date(apiDate);
                const date = myDate.toLocaleDateString();
                const currenciesKey = Object.keys(response.data.data);
                const currencyData = currenciesKey.map(currency => ({
                    name: currency,
                    value: response.data.data[currency]?.value
                }))
                setApiValue({
                    state: "success",
                    date: date,
                    currencies: currencyData,
                });
                if (!response.ok) {
                    new Error(response.statusText);
                };
            }
            catch {
                setApiValue({ state: "error" });
            }
        };
        setTimeout(getDate, 1000);
    }, []);
    return { apiValue };
};