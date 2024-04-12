import React, { useEffect } from "react";
import "./sorter.css";
import { useLoadPage } from "./useLoadPage";
import { useSelector } from "react-redux";

// TODO: Implement the Sorter component
// Animate the dropdown options when they appear

const Sorter = () => {
  const loadPage = useLoadPage();
  const platform = useSelector((state) => state.platform);

  const toggleOptions = (e) => {
    const options = e.target
      .closest("li.sort-list-item")
      ?.querySelector(".options");

    if (!options) return;

    options.classList.toggle("hide");
  };

  const sortBy = (e) => {
    if (!e.target.classList.contains("option")) return;
    if (e.target.classList.contains("selected")) return;

    const sortCriterion = e.target.getAttribute("value");
    document
      .querySelector("#select-criterion .selected")
      .classList.remove("selected");
    e.target.classList.add("selected");
    loadPage({ page_no: 1, sort: sortCriterion });
    const selected = document.getElementById("selected-sort-criterion");
    selected.innerText = e.target.innerText;
    selected.value = e.target.value;
  };


  const togglePlatform = (e) => {
    if (!e.target.classList.contains("option")) return;
    const target = e.target;

    target.classList.toggle("selected");
    console.log(target.value);
    loadPage({
      page_no: 1,
      currPlatform: String(target.value),
    });
  };

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (e.target.closest(".sort-list-item")) return;
      console.log(e.target.closest(".sort-list-item"));
      Array.from(document.querySelectorAll(".options")).forEach((x) => {
        x?.classList.add("hide");
      });
    });
  }, []);

  return (
    <ul id="sort-list" onClick={toggleOptions}>
      <li className="sort-list-item" id="select-criterion">
        Order By :&nbsp;
        <div name="sort-option-selector" id="">
          <div id="selected-sort-criterion" value="popularity">
            Popularity
          </div>
        </div>
        <ul className="options hide" onClick={sortBy}>
          <li className="option selected">
            Popularity
          </li>
          <li className="option" value="-released">
            Release Date
          </li>
          <li className="option" value="name">
            Name
          </li>
          <li className="option" value="-rating">
            {" "}
            Average Rating
          </li>
        </ul>
      </li>

      <li className="sort-list-item" id="select-platform">
        <div name="" id="">
          <div id="selected-platform" value="platform">
            Platform
          </div>
        </div>
        <ul className="options hide" onClick={togglePlatform}>
          <li
            className={
              platform.find((x) => x === "1") ? "option selected" : "option"
            }
            value="1"
          >
            PC
          </li>
          <li
            className={
              platform.find((x) => x === "2") ? "option selected" : "option"
            }
            value="2"
          >
            PlayStation
          </li>
          <li
            className={
              platform.find((x) => x === "3") ? "option selected" : "option"
            }
            value="3"
          >
            Xbox
          </li>
          <li
            className={
              platform.find((x) => x === "7") ? "option selected" : "option"
            }
            value="7"
          >
            Nintendo
          </li>
        </ul>
      </li>
    </ul>
  );
};

export default Sorter;
