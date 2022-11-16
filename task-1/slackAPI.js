import * as dotenv from "dotenv";
dotenv.config();
import axios from "axios";

export const postToSlack = async (payload) => {
  const response = await axios.post(
    `https://hooks.slack.com/services/${process.env.SLACK_WEBHOOK}`,
    payload,
    {
      headers: { "Content-type": "application/json" },
    }
  );
  return response.data;
};
