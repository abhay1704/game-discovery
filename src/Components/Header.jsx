import React from "react";
import icon from "../assets/icon.png";
import "./header.css";
import {
  Switch,
  useColorMode,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useLoadPage } from "./useLoadPage";

const Header = ({ toggleGenres }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const loadPage = useLoadPage();

  function focusSearch(f) {
    const svg = document.querySelector("#header svg");
    if (colorMode === "dark") {
      if (f === 0) svg.style.color = "#63b3ed";
      else svg.style.color = "var(--gray-light)";
    } else {
      if (f === 0) svg.style.color = "green";
      else svg.style.color = "grey";
    }

    const input = document.querySelector("#header .chakra-input__group");
    if (f === 0) input.style.width = "60%";
    else input.style.width = "40%";
  }

  function searchQuery(e) {
    if (e.key !== "Enter") return;
    const query = e.target.value;
    if (query === "") return;

    loadPage({ page_no: 1, query: query });
    e.target.value = "";
  }

  const toggleMenu = (e) => {
    e.target.classList.toggle("open");
    toggleGenres((isOpengenres) => !isOpengenres);
  };

  return (
    <div id="header" className="d-flex flex-row p-3 align-items-center">
      <img className="icon" src={icon} alt="Game Bckdg" />
      <InputGroup size="md" marginInlineEnd="5%" marginInlineStart="3%">
        <InputLeftElement>
          <SearchIcon paddingLeft="10px" fontSize={"1.4rem"} />
        </InputLeftElement>
        <Input
          placeholder="Search Games"
          borderRadius="20px"
          onSelect={focusSearch.bind(null, 0)}
          onFocus={focusSearch.bind(null, 0)}
          onBlur={focusSearch.bind(null, 1)}
          backgroundColor="var(--gray-dark)"
          paddingTop="5px"
          paddingBottom="5px"
          onKeyDown={searchQuery}
        />
      </InputGroup>
      <div className="theme-toggler">
        <Switch
          size="md"
          className="me-2"
          colorScheme="green"
          onChange={toggleColorMode}
          {...{ isChecked: colorMode === "dark" }}
        />{" "}
        <span>Dark Mode</span>
      </div>
      {window.screen.availWidth < 600 && (
        <div className="ham menu" onClick={toggleMenu}>
          <div className="bich"></div>
        </div>
      )}
    </div>
  );
};

export default Header;
