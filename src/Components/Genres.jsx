import React from "react";
import "./genres.css";
import { getGames } from "../services";

import action_image from "../assets/action_game.png";
import adventure_image from "../assets/adventure_games.png";
import casino_image from "../assets/casino_games.png";
import multiplayer_image from "../assets/multiplayer_game.png";
import puzzle_image from "../assets/puzzle_game.png";
import racing_image from "../assets/racing_game.png";
import shooting_image from "../assets/shooting_games.png";
import sports_image from "../assets/sports_game.png";
import strategy_image from "../assets/strategy_game.png";
// import free_online_image from "../assets/free_online_games.jpg";
import { useDispatch } from "react-redux";

const listGenres = [
  //   {
  //     name: "Free Online Games",
  //     imageSrc: free_online_image,
  //     slug: "free-online",
  //   },
  { name: "Action Games", imageSrc: action_image, slug: "action" },
  { name: "Adventure Games", imageSrc: adventure_image, slug: "adventure" },
  { name: "Casino Games", imageSrc: casino_image, slug: "card" },
  {
    name: "Multiplayer Games",
    imageSrc: multiplayer_image,
    slug: "massively-multiplayer",
  },
  { name: "Puzzle Games", imageSrc: puzzle_image, slug: "puzzle" },
  { name: "Racing Games", imageSrc: racing_image, slug: "racing" },
  { name: "Shooting Games", imageSrc: shooting_image, slug: "shooter" },
  { name: "Sports Games", imageSrc: sports_image, slug: "sports" },
  { name: "Strategy Games", imageSrc: strategy_image, slug: "strategy" },
];

const Genres = () => {
  const dispatch = useDispatch();

  const loadPage = (query) => {
    dispatch({ type: "LOADING", payload: { isLoading: true } });
    getGames(query)
      .then((data) => {
        dispatch({ type: "ERROR", payload: { setError: null } });
        dispatch({
          type: "SET_RESULTS",
          payload: {
            currentResults: data.results,
            prev: data.prev_url,
            next: data.next_url,
            currentPage: query.page_no,
          },
        });

        dispatch({
          type: "CHANGE_GENRES",
          payload: {
            currentGenres: query.genre,
          },
        });
      })
      .catch((err) => dispatch({ type: "ERROR", payload: { setError: err } }))
      .finally(() =>
        dispatch({ type: "LOADING", payload: { isLoading: false } })
      );
  };

  const changeGenres = (e) => {
    const genre = e.target.closest("li");
    if (!genre) return;
    const genreName = genre.getAttribute("dataname");
    console.log(genreName);
    loadPage({ page_no: 1, genre: genreName });
  };

  return (
    <div className="select-genres">
      <h2>Genres</h2>
      <ul id="genres-list" onClick={changeGenres}>
        {listGenres.map((genre, index) => (
          <li key={index} dataname={genre.slug}>
            <img src={genre.imageSrc} alt={genre.name} />
            <span>{genre.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Genres;
