import "./genres.css";

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
import { useLoadPage } from "./useLoadPage";

const listGenres = [
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

const Genres = ({ isGenreOpen }) => {
  const loadPage = useLoadPage();

  const changeGenres = (e) => {
    const genre = e.target.closest("li");
    if (!genre) return;
    const genreName = genre.getAttribute("dataname");
    loadPage({ page_no: 1, genre: genreName });
  };

  return (
    <div
      className={!isGenreOpen ? "select-genres hide-genre" : "select-genres"}
    >
      <h2>Genres</h2>
      <hr />
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
