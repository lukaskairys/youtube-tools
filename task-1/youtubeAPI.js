import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";

const API_KEY = process.env.YOUTUBE_API_KEY;
const YOUTUBE_COMMENTS_API = `https://www.googleapis.com/youtube/v3/search`;
const MAX_RESULTS = 10;

export const searchYoutube = async (
  keyword,
  publishedAfter,
  publishedBefore
) => {
  const response = await axios.get(
    `${YOUTUBE_COMMENTS_API}?part=snippet&type=video&order=date&q=${keyword}&key=${API_KEY}&maxResults=${MAX_RESULTS}&publishedAfter=${publishedAfter}&publishedBefore=${publishedBefore}`
  );
  return response.data;
};
