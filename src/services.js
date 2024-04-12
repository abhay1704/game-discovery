import axios from "axios";

export const controller = new AbortController();

const api_url = process.env.REACT_APP_API_URL;
const api_key = process.env.REACT_APP_API_KEY;
const page_size = +process.env.REACT_APP_PAGE_SIZE;

async function _getData(url) {
  const res = await axios.get(url);
  if (res.status !== 200) throw new Error(res.data.message);
  return res.data;
}

export async function getGames({ page_no, genre, query, url, platform, sort }) {
  let callurl =
    url ?? `${api_url}?key=${api_key}&page=${page_no}&page_size=${page_size}`;
  if (genre) callurl += `&genres=${genre}`;
  if (query) callurl += `&search=${query}`;
  if (sort && sort !== '') callurl += `&ordering=${sort}`;
  if (platform) callurl += `&parent_platforms=${platform.join(",")}`;

  const res = await _getData(callurl);
  const data = {
    prev_url: res.previous,
    next_url: res.next,
    results: res.results.map((result) => {
      const currData = {
        id: result.id,
        name: result.name,
        image: result.background_image,
        rating: result.rating,
        releaseDate: result.released,
        platforms: [],
        genres: result.genres.map((genre) => genre.slug.match("[A-Za-z]*")[0]),
      };

      result.parent_platforms.forEach((platform) => {
        currData.platforms[platform.platform.slug.match("[A-Za-z]*")[0]] = true;
      });
      return currData;
    }),
  };
  return data;
}
