import axios from "axios";
import { useState, useEffect } from "react";

export const useGetApiDate = () => {
    const [apiValue, setApiValue] = useState({
        date: "",
        currencies: [],
        error: null
    });
    
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
                date: date,
                currencies: currencyData,
                error: null
            });
            if (!response.ok) {
                new Error(response.statusText);
            };
        }
        catch (error) {
            setApiValue({ error: "Wystąpił błąd, coś poszło nie tak:(. Sprawdź swoje połączenie z internetem. Jeśli masz to wygląda na to że to nasza wina :<. Spróbuj ponownie za jakiś czas" });
        }
    };
    useEffect(() => {
        getDate();
    },[]);
    return { apiValue }
};