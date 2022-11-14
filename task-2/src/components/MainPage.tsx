import {
  VStack,
  StackDivider,
  Heading,
  Input,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";
import FindingsList from "./FindingsList";

interface Props {
  comments: any[];
  loading: boolean;
  getDataHandler: (videoId: string) => void;
}

const MainPage = ({ comments, getDataHandler, loading }: Props) => {
  const [videoId, setVideoId] = useState("");

  const handleInputChange = (event: any) => setVideoId(event.target.value);

  return (
    <VStack divider={<StackDivider />} spacing={4} align="stretch">
      <Box marginTop={6} display="flex" justifyContent="center">
        <VStack spacing={4} align="center">
          <Box width={300}>
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/YouTube_full-color_icon_%282017%29.svg/2560px-YouTube_full-color_icon_%282017%29.svg.png"
              alt="logo"
            />
          </Box>
          <Heading marginBottom={6}>YouTube Comments Extractor</Heading>
          <Input
            variant="outline"
            placeholder="Video Id (or multiple separated by comma)"
            value={videoId}
            onChange={handleInputChange}
            marginBottom={6}
          />
          <Button onClick={() => getDataHandler(videoId)}>Extract</Button>
        </VStack>
      </Box>
      <FindingsList comments={comments} loading={loading} />
    </VStack>
  );
};

export default MainPage;
