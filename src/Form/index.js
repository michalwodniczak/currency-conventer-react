import { useState } from "react";
import "./style.css";
import { currencies } from "../currencies";
const Form = ({ result, calculateResult }) => {
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
                <span className="form__labelText">
                    Wybierz walute na którą chcesz wymienić*:
                </span>
                <select
                    value={currency.name}
                    className="form__input"
                    onChange={onChangeCurrency}
                >
                    {currencies.map(currency => (<option key={currency.id}>{currency.name}</option>)
                    )};
                </select>
            </label>
            <label>
                <span className="form__labelText">Wpisz ilość w zł*:</span>
                <input
                    value={amount}
                    onChange={({ target }) => setAmount(target.value)}
                    className="form__input"
                    type="number"
                    name="amount"
                    step="any"
                    min="1"
                    required
                />
            </label>
            <button
                onClick={() => calculateResult(amount, currency)}
                className="form__button"
                type="submit">
                Przelicz
            </button>
            <p className="form__resultText">
                {result ? `za ${result.sourceAmount.toFixed(2)}zł otrzymamy ${result.targetAmount.toFixed(2)} ${result.currency.id}` : "Tutaj pojawi się kurs walut:"}
            </p>
            <p>
                Kurs walut z dnia 27.12.2022
            </p>
        </form >
    )
}

export { Form };