import "./game.css";
import {
  FaWindows,
  FaXbox,
  FaPlaystation,
  FaAndroid,
  FaLinux,
} from "react-icons/fa";
import { BsNintendoSwitch } from "react-icons/bs";
import { useEffect, useRef } from "react";
import React from "react";

const Game = ({ name, genres, releaseDate, rating, platforms, image }) => {
  const style = {
    border: "1px solid white",
    padding: "0.2em",
    textAlign: "center",
    borderRadius: "5px",
    marginRight: "0.5em",
  };
  console.log(this);

  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          ref.current.style.backgroundImage = `url(${image})`;
          observer.disconnect();
        }
      },
      { root: null, rootMargin: "10%", threshold: 0.1 }
    );

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <React.Fragment>
      {name && (
        <div className="game">
          <div className="image" dataurl={image} ref={ref}></div>
          <div className="about">
            <div className="info-bar">
              <div className="icons">
                {platforms.pc && <FaWindows />}
                {platforms.xbox && <FaXbox />}
                {platforms.playStation && <FaPlaystation />}
                {platforms.nintendo && <BsNintendoSwitch />}
                {platforms.linux && <FaLinux />}
                {platforms.android && <FaAndroid />}
              </div>
              <div className="number">92</div>
            </div>
            <h3>{name}</h3>
            <p>Released : { releaseDate}</p>
            <div className="Rating">
              <span style={style}>Rating</span>
              <span id="view-count">{rating}</span>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default Game;
