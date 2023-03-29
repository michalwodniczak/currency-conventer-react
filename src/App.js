import { Header } from "./Header";
import { Form } from "./Form";
import { Footer } from "./Footer";
import { useState } from "react";

function App() {
    const [result, setResult] = useState()

    const calculateResult = (amount, currency) => {
        const calculateResult = amount / currency
        setResult(calculateResult.toFixed(2))
    }

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
