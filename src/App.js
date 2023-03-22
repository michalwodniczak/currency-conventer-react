import { Header } from "./Header";
import { Form } from "./Form";
import { Footer } from "./Footer";

function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Form />
            </main>
            <Footer />
        </div>
    );
}

export default App;
