import Header from "./Header";
function App() {
  return (
    <div className="container">
        <Header/>
        <main>
            <form className="js-form">
                <label>
                    <span className="form__labelText">
                        Wybierz walute na którą chcesz wymienić*:
                    </span>
                    <select className="form__input js-select">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                </label>
                <label>
                    <span className="form__labelText">Wpisz ilość w zł*:</span>
                    <input className="form__input js-amountValue" type="number" name="currrency" step="any" min="1"
                        required/>
                </label>
                <button className="form__button" type="submit">
                    Przelicz
                </button>
                <p className="form__resultText js-finishText">
                    Tutaj pojawi się kurs walut
                </p>
                <p>
                    Kurs walut z dnia 27.12.2022
                </p>
            </form>
        </main>
        <footer className="footer">
            Copyright&copy; 2022 by Widmo
        </footer>
    </div>
  );
}

export default App;
