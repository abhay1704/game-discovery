import "./App.css";
import { ColorModeScript } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import Header from "./Components/Header";
import theme from "./theme.js";
import Genres from "./Components/Genres.jsx";
import Games from "./Components/Games.jsx";
import { useState } from "react";

function App() {
  const [isGenreOpen, toggleGenres] = useState(
    window.screen.width > 768 ? true : true
  );
  console.log(isGenreOpen);

  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Header toggleGenres={toggleGenres} />
      <div className="content">
        <Genres {...{ isGenreOpen }}></Genres>
        <Games></Games>
      </div>
    </ChakraProvider>
  );
}

export default App;
