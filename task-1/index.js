import { schedule } from "node-cron";
import { createInterface } from "readline";
import { searchYoutube } from "./youtubeAPI.js";
import { getCurrentTime, getTimeAgo, generateSlackMessage } from "./utils.js";
import { postToSlack } from "./slackAPI.js";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

const divider = Array(80).fill("=").join("");

rl.question("Enter the keyword:", function (keyword) {
  console.log(
    `Starting YouTube monitoring cron schedule for "${keyword}" keyword...`
  );
  console.log(divider);

  schedule(" */10 * * * * *", async () => {
    console.log(`Results for ${keyword} keyword query`);

    const publishedAfter = getTimeAgo(1, "day");
    const publishedBefore = getCurrentTime();
    console.log(`Query interval: from ${publishedAfter} to ${publishedBefore}`);

    try {
      const YTresponse = await searchYoutube(
        keyword,
        publishedAfter,
        publishedBefore
      );
      const videoQty = YTresponse.nextPageToken
        ? "10+"
        : YTresponse.items.length;
      console.log(`Found ${videoQty} new video(s)`);

      if (YTresponse.items.length > 0) {
        const payload = generateSlackMessage(keyword, YTresponse);
        const slackResponse = await postToSlack(payload);
        console.log(`Slack response: ${slackResponse}`);
      }
    } catch (error) {
      console.log("something is wrong:", error);
    }

    console.log(divider);
  });
});
