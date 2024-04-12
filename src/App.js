import "./App.css";
import { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Components/Header";
import theme from "./theme.js";
import Genres from "./Components/Genres.jsx";
import Games from "./Components/Games.jsx";

function App() {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Header />
      <div className="content">
        <Genres></Genres>
        <Games></Games>
      </div>
    </ChakraProvider>
  );
}

export default App;
