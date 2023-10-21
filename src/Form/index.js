import { useState } from "react";
import { Label, Input, Button, ResultText, Failure, Loading } from "./styled";
import { useGetApiDate } from "./useGetApiDate";

const Form = ({ result, calculateResult }) => {
    const { date, currencies, state } = useGetApiDate().apiValue;
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
            {state === "loading" ?
                (
                    <Loading>
                        Sekunda... <br /> ładuje własnie strone poczekaj chwile!
                    </Loading>
                )
                : (
                    state === "error" ?
                        (
                            <Failure>
                                Wystąpił błąd być może nie masz internetu, bądź nasze żądanie api wyleciało w kosmos :/
                            </Failure>
                        ) : (
                            <>
                                <label>
                                    <Label>
                                        Wybierz walute na którą chcesz wymienić*:
                                    </Label>
                                    <Input
                                        as="select"
                                        value={currency ? currency.name : ""}
                                        onChange={onChangeCurrency}
                                    >
                                        {currencies.map(currency => (<option key={currency.name} value={currency.name}>{currency.name}</option>)
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
                            </>
                        )
                )}
        </form >
    )
}

export { Form };