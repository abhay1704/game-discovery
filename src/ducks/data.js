import { createStore } from "redux";
import { toggle } from "../utils";

const initialState = {
  currentPage: 1,
  prev: "",
  next: "",
  searchQuery: "",
  currResults: [],
  currGenres: "all-categories",
  isLoading: false,
  currentQuery: "",
  sortQuery: "",
  platform: ["1", "2", "3", "7"],
};

// changeGenres, nextPage, prevPage, searchQuery
const ReducerFunction = (state = initialState, action) => {
  switch (action.type) {
    case "CHANGE_GENRES":
      return {
        ...state,
        currGenres: action.payload.currentGenres,
        currentQuery: action.payload.currentGenres,
        searchQuery: "",
      };

    case "SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload.searchQuery,
        currentQuery: action.payload.searchQuery,
        currGenres: "",
      };

    case "SET_RESULTS":
      return {
        ...state,
        currResults: action.payload.currentResults,
        prev: action.payload.prev,
        next: action.payload.next,
        currentPage: action.payload.currentPage,
      };

    case "LOADING":
      return {
        ...state,
        isLoading: action.payload.isLoading,
      };

    case "SORT_QUERY":
      return {
        ...state,
        sortQuery: action.payload.sortQuery,
      };

    case "TOGGLE_PLATFORM":
      return {...state, platform : toggle(state.platform, action.payload.platform)};

    default:
      return state;
  }
};

const store = createStore(ReducerFunction);

export default store;
