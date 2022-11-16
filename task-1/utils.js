import dayjs from "dayjs";

export const getCurrentTime = () =>
  dayjs().subtract(2, "hour").format("YYYY-MM-DDTHH:mm:ss[Z]");

export const getTimeAgo = (qty, units) =>
  dayjs()
    .subtract(2, "hour")
    .subtract(qty, units)
    .format("YYYY-MM-DDTHH:mm:ss[Z]");

export const generateSlackMessage = (keyword, YTresponse) => {
  const videoQty = YTresponse.nextPageToken ? "10+" : YTresponse.items.length;
  return {
    text: `Found ${videoQty} new video(s) for keyword "${keyword}"`,
    blocks: [
      {
        type: "header",
        text: {
          type: "plain_text",
          text: `Found ${videoQty} new video(s) for keyword "${keyword}"`,
        },
      },
      {
        type: "divider",
      },
      ...YTresponse.items.flatMap((item) => [
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `<https://www.youtube.com/watch?v=${item.id.videoId}|${item.snippet.title}>`,
          },
        },
        {
          type: "image",
          image_url: `${item.snippet.thumbnails.high.url}`,
          alt_text: `${item.snippet.title}`,
        },
        {
          type: "divider",
        },
      ]),
    ],
  };
};
