import React, { useEffect } from "react";
import "./sorter.css";
import { useLoadPage } from "./useLoadPage";
import { useSelector, useDispatch } from "react-redux";

// TODO: Implement the Sorter component
// Animate the dropdown options when they appear

const Sorter = () => {
  const loadPage = useLoadPage();
  const dispatch = useDispatch();
  // const platform = useSelector((state) => state.platform);

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
    console.log(sortCriterion);
    if (sortCriterion === "") return;
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

    target.classList.toggle('selected');
    // dispatch({
    //   action: 'TOGGLE_PLATFORM',
    //   payload: {
    //     platform: target.value
    //   }
    // })
    loadPage({
      page_no: 1,
      platform: target.value
    });
  }

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
          <li className="option selected" value="">
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
        <ul className="options hide">
          <li className="option selected">PC</li>
          <li className="option selected">PlayStation</li>
          <li className="option selected">Xbox</li>
          <li className="option selected">Nintendo</li>
        </ul>
      </li>
    </ul>
  );
};

export default Sorter;
