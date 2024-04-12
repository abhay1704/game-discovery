import { useDispatch, useSelector } from "react-redux";
import { getGames } from "../services";
import { toggle } from "../utils";

export function useLoadPage() {
  const dispatch = useDispatch();
  const platform = useSelector((state) => state.platform);
  const genre = useSelector((state) => state.currentGenres);
  const searchQuery = useSelector((state) => state.searchQuery);

  const loadPage = (query) => {
    dispatch({ type: "LOADING", payload: { isLoading: true } });

    if (query.currPlatform) {
      dispatch({
        type: "TOGGLE_PLATFORM",
        payload: { platform: query.currPlatform },
      });
      query.platform = toggle(platform, query.currPlatform);
    }

    if (!query.page_no) query.page_no = 1;
    if (!query.platform) query.platform = platform;
    if (!query.sort) query.sort = "rating";
    if (!query.genre) query.genre = genre;
    if (!query.query) query.query = searchQuery;

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
        if (query.genre) {
          dispatch({
            type: "CHANGE_GENRES",
            payload: { currentGenres: query.genre },
          });
        }
        if (query.sort) {
          dispatch({
            type: "SORT_QUERY",
            payload: { sortQuery: query.sort },
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
