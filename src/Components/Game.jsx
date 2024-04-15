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
    border: "1px solid #40513B",
    padding: "0.2em",
    textAlign: "center",
    borderRadius: "5px",
    marginRight: "0.5em",
  };

  const ref = useRef();

  useEffect(() => {
    const observer1 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelector(
            ".image"
          ).style.backgroundImage = `url(${image})`;
          observer1.disconnect();
        }
      },
      { root: null, rootMargin: "20%", threshold: 0 }
    );

    const observer2 = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.style.transform = "translateX(0)";
          observer2.disconnect();
        }
      },
      { root: null, threshold: 0.05 }
    );

    observer1.observe(ref.current);
    observer2.observe(ref.current);

    return () => {
      observer1.disconnect();
      observer2.disconnect();
    };
  }, [image]);

  return (
    <React.Fragment>
      {name && (
        <div className="game" ref={ref}>
          <div className="image" dataurl={image}></div>
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
            <p>Released : {releaseDate}</p>
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
