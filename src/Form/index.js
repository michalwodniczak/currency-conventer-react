import { useState } from "react";
import "./style.css";
import { currencies } from "../currencies";
const Form = ({ result, calculateResult }) => {
    const [currency, setCurrency] = useState(currencies[0]);
    const onFormSubmit = (event) => {
        event.preventDefault();
        calculateResult(amount, currency.ratio);
        console.log(amount);
        console.log(currency.ratio);
    }


    const onChangeCurrency = ({ target }) => {
        const selectCurrency = currencies.find(currency => currency.name === target.value);
        setCurrency(selectCurrency);
    }
    const [amount, setAmount] = useState("");

    return (
        <form onSubmit={onFormSubmit}>
            <label>
                <span className="form__labelText">
                    Wybierz walute na którą chcesz wymienić*:
                </span>
                <select
                    value={currency.ratio}
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
                onClick={() => calculateResult(amount, currency.ratio)}
                className="form__button"
                type="submit">
                Przelicz
            </button>
            <p className="form__resultText">
                Tutaj pojawi się kurs walut
                {result}
            </p>

            <p>
                Kurs walut z dnia 27.12.2022
            </p>
        </form>
    )
}

export { Form };