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
import { useDispatch } from "react-redux";
import { useLoadPage } from "./useLoadPage";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const loadPage = useLoadPage();

  function focusSearch(f) {
    const svg = document.querySelector("#header svg");
    if (colorMode == "dark") {
      if (f == 0) svg.style.color = "#63b3ed";
      else svg.style.color = "var(--gray-light)";
    } else {
      if (f == 0) svg.style.color = "green";
      else svg.style.color = "grey";
    }
  }

  function searchQuery(e) {
    if (e.key !== "Enter") return;
    const query = e.target.value;
    if (query === "") return;

    loadPage({ page_no: 1, query: query });
    e.target.value = "";
  }

  return (
    <div id="header" className="d-flex flex-row p-3 align-items-center">
      <img className="icon" src={icon} />
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
          defaultChecked={colorMode === "dark"}
        />{" "}
        <span>Dark Mode</span>
      </div>
    </div>
  );
};

export default Header;
