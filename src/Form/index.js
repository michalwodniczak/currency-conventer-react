import axios from "axios"
import { useState, useEffect } from "react";
import { Label, Input, Button, ResultText } from "./styled";
import { currencies } from "../currencies";

const useGetApiDate = () => {
    const [date, setDate] = useState("");

    const getDate = async () => {
        try {
            const response = await axios.get("https://api.exchangerate.host/latest?base=PLN?date");
            const { date } = response.data;
            setDate(date);
            console.log("Data z APi", { date });
            if (!response.ok) {
                new Error(response.statusText)
            }
        }
        catch (error) {
            alert(error)
        }
    };
    useEffect(() => {
        getDate()
    }, [])
    return { date };
};
const Form = ({ result, calculateResult }) => {
    const { date } = useGetApiDate();
    const [currency, setCurrency] = useState(currencies[0]);
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
                    {currencies.map(currency => (<option key={currency.id}>{currency.name}</option>)
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
                    ? `za ${result.sourceAmount.toFixed(2)}zł otrzymamy ${result.targetAmount.toFixed(2)} ${result.currency.id}`
                    : "Wynik przewalutowania:"
                }
            </ResultText>
            <p>
                {date}
            </p>
        </form >
    )
}

export { Form };