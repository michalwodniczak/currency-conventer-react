import styled, { ThemeProvider } from "styled-components";
import { Header } from "./Header";
import { Form } from "./Form";
import { Footer } from "./Footer";
import { Clock } from "./Clock";

const theme = {
    color: {
        aquamarine: "#7FFFD4",
        jungleGreen: "#2DAC81",
        mineShaft: "#2e2c2c",
        blueRibbon: "#0869E7",
    },
}

const Container = styled.div`
  max-width: 1000px;
  min-height: 800px;
  margin: 0 auto;
  text-align: center;
  font-family: 'Lato', sans-serif;
  background-color: ${({ theme }) => theme.color.aquamarine};
  line-height: 1.5;
  border-radius: 5px;
  font-size: 18px;
`

function App() {
    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Header />
                <main>
                    <Clock />
                    <Form />
                </main>
                <Footer />
            </Container>
        </ThemeProvider>
    );
}

export default App;
