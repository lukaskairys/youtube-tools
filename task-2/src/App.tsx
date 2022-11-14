import React, { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { ChakraProvider, Box, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./components/ColorModeSwitcher";
import MainPage from "./components/MainPage";
import {
  isOlderThanDay,
  getVideo,
  splitToArr,
  updateVideo,
  createVideo,
} from "./utils/utils";
import { loadFromYoutube } from "./APIs/youtubeAPI";

dayjs.extend(relativeTime);

export const App = () => {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async (videoIds: string) => {
    setLoading(true);
    const resultsToRender: any[] = [];
    const idList = splitToArr(videoIds);

    for (const id of idList) {
      const { data } = await getVideo(id).catch(() => ({
        data: {
          kind: "notInDb",
          id,
        },
      }));

      const isOld = isOlderThanDay(data.lastUpdated);

      if (isOld || data.kind === "notInDb") {
        const res = await loadFromYoutube(id).catch(() => ({
          videoNotFound: true,
          id,
        }));
        resultsToRender.push(res);
        if (!res.videoNotFound && isOld) {
          updateVideo(id, res);
        }
        if (!res.videoNotFound && data.kind === "notInDb") {
          createVideo(res);
        }
      } else {
        resultsToRender.push({ ...data, cacheTagVisible: true });
      }
    }
    setComments(resultsToRender);
    setLoading(false);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box position="absolute" p={3}>
        <ColorModeSwitcher />
      </Box>
      <MainPage
        comments={comments}
        getDataHandler={getData}
        loading={loading}
      />
    </ChakraProvider>
  );
};
