import { Header } from "./Header";
import { Form } from "./Form";
import { Footer } from "./Footer";
import { useState } from "react";
import { currencies } from "./currencies";

function App() {
    const [result, setResult] = useState("");

    const calculateResult = (amount, currency) => {
        const rate = currencies.find(({ id }) => id === currency).ratio;

        setResult({
            targetAmount: +amount / rate,
            currency,
        });

    };

    return (
        <div className="container">
            <Header />
            <main>
                <Form result={result} calculateResult={calculateResult} />
            </main>
            <Footer />
        </div>
    );
}

export default App;
