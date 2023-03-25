import { useState } from "react";
import "./style.css"
import { currencies } from "../currencies";
const Form = () => {
    const onFormSubmit = (event) => {
        event.preventDefault();
    }
    
    const [currency, setCurrency] = useState("Dolar Amerykański")
    const changeCurrency = ({ target }) => {
        setCurrency(target.value)
    }
    const [amount, setAmount] = useState("");
    
    return (
        <form onSubmit={onFormSubmit}>
            <label>
                <span className="form__labelText">
                    Wybierz walute na którą chcesz wymienić*:
                </span>
                <select
                    value={currency}
                    className="form__input"
                    onChange={changeCurrency}
                >
                    {currencies.map(currency => (<option key={currency.id}>{currency.name}</option>)
                    )}
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
                className="form__button"
                type="submit">
                Przelicz
            </button>
            <p className="form__resultText">
                Tutaj pojawi się kurs walut
            </p>
            <p>
                Kurs walut z dnia 27.12.2022
            </p>
        </form>
    )
}

export { Form }