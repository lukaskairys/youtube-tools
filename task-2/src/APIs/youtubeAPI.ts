import axios from "axios";
import dayjs from "dayjs";

const API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;
const YOUTUBE_COMMENTS_API = `https://www.googleapis.com/youtube/v3/commentThreads`;
const MAX_RESULTS = 20;

export const loadFromYoutube = async (videoId: string) => {
  const response = await axios.get(
    `${YOUTUBE_COMMENTS_API}?part=snippet&videoId=${videoId}&key=${API_KEY}&maxResults=${MAX_RESULTS}`
  );
  return {
    id: videoId,
    lastUpdated: dayjs().valueOf(),
    comments: response.data,
    videoNotFound: false,
  };
};
