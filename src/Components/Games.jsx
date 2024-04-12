import React, { useEffect } from "react";
import "./games.css";
import Sorter from "./Sorter";
import GameList from "./GameList";
import Game from "./Game";
import { controller } from "../services";
import { capitalize } from "../utils";
import { useSelector } from "react-redux";
import { useLoadPage } from "./useLoadPage";

const Games = () => {
  const games = useSelector((state) => state.currResults);
  const isLoading = useSelector((state) => state.isLoading);
  const error = useSelector((state) => state.error);
  const prev_url = useSelector((state) => state.prev);
  const next_url = useSelector((state) => state.next);
  const currentQuery = useSelector((state) => state.currentQuery);
  const loadPage = useLoadPage();

  const navPage = (e) => {
    const url = e.target.getAttribute("dataurl");
    loadPage({ url: url });
  };

  useEffect(() => {
    loadPage({ page_no: 1 });
    return () => {
      controller.abort();
    };
  }, []);

  if (error)
    return (
      <div className="error">
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
      </div>
    );

  return (
    <div id="games">
      <h2>{capitalize(currentQuery) + " Games" || "All Games"}</h2>
      <Sorter />
      {isLoading && <div id="spinner"></div>}

      {!isLoading && (
        <React.Fragment>
          <GameList>
            {games.map((game, index) => {
              return <Game key={index} {...game} />;
            })}
          </GameList>
          <div className="nav-btns">
            {prev_url && (
              <button
                id="prev"
                className="btn-nav"
                dataurl={prev_url}
                onClick={navPage}
              >
                Previous Page
              </button>
            )}
            {next_url && (
              <button
                id="next"
                className="btn-nav"
                dataurl={next_url}
                onClick={navPage}
              >
                Next Page
              </button>
            )}
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default Games;
