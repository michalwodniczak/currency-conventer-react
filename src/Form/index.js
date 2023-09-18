import axios from "axios"
import { useState, useEffect } from "react";
import { Label, Input, Button, ResultText } from "./styled";
//import { currencies } from "../currencies";

const useGetApiDate = () => {
    const [date, setDate] = useState("");
    const [currencies, setCurrencies] = useState([]);
    const getDate = async () => {
        try {
            const response = await axios.get("https://api.exchangerate.host/latest?base=PLN");
            const { date } = response.data;
            const currenciesKey = Object.keys(response.data.rates);
            const currencyData = currenciesKey.map(currency => ({
                name: currency,
                value: response.data.rates[currency]
                
            }))
            setDate(date);
            setCurrencies(currencyData);
            console.log(currencyData);
            if (!response.ok) {
                new Error(response.statusText)
            }
        }
        catch (error) {
            console.error(error)
        }
    };
    useEffect(() => {
        getDate();
    }, []);

    return { date, currencies }
};

const Form = ({ result, calculateResult }) => {
    const { date, currencies } = useGetApiDate();
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
                    ? `za ${result.sourceAmount.toFixed(2)}zł otrzymamy ${result.targetAmount.toFixed(2)} ${currency.name}`
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