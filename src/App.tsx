import "./App.css";
import { Container} from "@chakra-ui/react";
import { Header } from "./components/Header";
import { ColumnsContainer } from "./components/ColumnsContainer";


function App() {
  return (
    <>
      <Container padding="4" gap="4">
        <Header />
        <ColumnsContainer />
      </Container>
    </>
  );
}

export default App;
