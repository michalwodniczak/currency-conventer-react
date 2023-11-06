import axios from "axios";
import { useState, useEffect } from "react";

export const useGetApiDate = () => {
    const [apiValue, setApiValue] = useState({
        state: "loading",
        date: "",
        currencies:{},
    });

    useEffect(() => {
        const url = "https://api.currencyapi.com/v3/latest?apikey=cur_live_OXoP0m9yL8nJ1iezafrmUwJssz7HSFb1rfAaGCDx&currencies=EUR%2CUSD%2CGBP&base_currency=PLN";
        
        const getDate = async () => {
            try {
                const response = await axios.get(url);

                if (!response.ok) {
                    new Error(response.statusText);
                };

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

            }
            catch {
                setApiValue({ state: "error" });
            }
        };
        setTimeout(getDate, 1000);
    }, []);
    return { apiValue };
};