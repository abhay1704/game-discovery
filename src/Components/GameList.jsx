import React, { useEffect } from "react";
import "./gamelist.css";
import { controller } from "../services";

const GameList = ({ children }) => {
  useEffect(() => controller.abort('cancelled'), []);
  return <div id="game-list">{children}</div>;
};

export default GameList;
