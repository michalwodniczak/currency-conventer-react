import axios from "axios"
import { useState, useEffect } from "react";
import { Label, Input, Button, ResultText } from "./styled";

const useGetApiDate = () => {
    const [date, setDate] = useState("");
    const [currencies, setCurrencies] = useState([]);

    const getDate = async () => {
        try {
            const response = await axios.get("https://api.currencyapi.com/v3/latest?apikey=cur_live_00iCPiJtKhkb0hKcDkWzA3JG9TJ55BUjiItS11wH&currencies=EUR%2CUSD%2CGBP&base_currency=PLN");
            const date =  response.data.meta.last_updated_at
            
            const currenciesKey = Object.keys(response.data.data);
            const currencyData = currenciesKey.map(currency => ({
                name: currency,
                value: response.data.data[currency].value
            }))
            setDate(date);
            setCurrencies(currencyData);
            console.log(date)
            if (!response.ok) {
                new Error(response.statusText)
            };
        }
        catch (error) {
            console.log(error)
        }
    };
    useEffect(() => {
        getDate();
    }, []);
    return { date, currencies }
};

const Form = ({ result, calculateResult }) => {
    const { date, currencies } = useGetApiDate();
    const [render, setRender] = useState(false);
    const [currency, setCurrency] = useState(currencies);
    const [amount, setAmount] = useState("");
    const onFormSubmit = (event) => {
        event.preventDefault();
        calculateResult(amount, currency);
    };

    const onChangeCurrency = ({ target }) => {
        const selectCurrency = currencies.find(currency => currency.name === target.value);
        setCurrency(selectCurrency);
    };

    useEffect(() => {
        setTimeout(() => {
            setRender(true)
        }, 1000)
    }, [])

    if (!render) {
        return (
            <p>
                Trwa ładowanie strony aktualnie
            </p>)
    }

    return (
        <form onSubmit={onFormSubmit}>
            <label>
                <Label>
                    Wybierz walute na którą chcesz wymienić*:
                </Label>
                <Input
                    as="select"
                    value={currency.name}
                    onChange={onChangeCurrency}
                >
                    {currencies.map(currency => (<option key={currency.name}>{currency.name}</option>)
                    )};
                </Input>
            </label>
            <label>
                <Label>
                    Wpisz ilość w zł*:
                </Label>
                <Input
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                    type="number"
                    name="amount"
                    step="any"
                    min="1"
                    required
                />
            </label>
            <Button
                onClick={() => calculateResult(amount, currency)}
                type="submit"
            >
                Przelicz
            </Button>
            <ResultText>
                {result
                    ? `za ${result.sourceAmount.toFixed(2)}zł otrzymamy ${result.targetAmount.toFixed(2)} ${result.currency.name}`
                    : "Wynik przewalutowania:"
                }
            </ResultText>
            <p>
                Kursy walut aktualny na dzień: <strong>{date}</strong>
            </p>
        </form >
    )
}

export { Form };