import { useDispatch } from "react-redux";
import { getGames } from "../services";

export function useLoadPage() {
  const dispatch = useDispatch();

  const loadPage = (query) => {
    console.log(query);
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

        if (query.query) {
          dispatch({
            type: "SEARCH_QUERY",
            payload: { searchQuery: query.query },
          });
        }
        if (query.genres) {
          dispatch({
            type: "CHANGE_GENRES",
            payload: { currentGenres: query.genres },
          });
        }
        if (query.sort) {
          dispatch({
            type: "SORT_QUERY",
            payload: { sortQuery: query.sort },
          });
        }
        if (query.platform) {
          dispatch({
            type: "TOGGLE_PLATFORM",
            payload: { platform: query.platform },
          });
        }
      })
      .catch((err) => dispatch({ type: "ERROR", payload: { setError: err } }))
      .finally(() =>
        dispatch({ type: "LOADING", payload: { isLoading: false } })
      );
  };

  return loadPage;
}
