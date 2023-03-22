import { Header } from "./Header";
import { Form } from "./Form";


function App() {
    return (
        <div className="container">
            <Header />
            <main>
                <Form />
            </main>
            <footer className="footer">
                Copyright&copy; 2022 by Widmo
            </footer>
        </div>
    );
}

export default App;
