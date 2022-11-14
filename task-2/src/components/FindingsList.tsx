import { WarningIcon, RepeatClockIcon } from "@chakra-ui/icons";
import {
  OrderedList,
  ListItem,
  Tag,
  TagLabel,
  TagRightIcon,
  Box,
  Text,
  Spinner,
} from "@chakra-ui/react";
import CommentList from "./CommentList";
import CustomModal from "./CustomModal";

interface Props {
  comments: any[];
  loading: boolean;
}

const FindingsList = ({ comments, loading }: Props) => {
  if (loading) {
    return (
      <Box display="flex" justifyContent="center" marginTop={6}>
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <Box display="flex" justifyContent="center">
      {comments.length > 0 && (
        <OrderedList spacing={4}>
          {comments.map((comment, index) => {
            if (comment.videoNotFound) {
              return (
                <ListItem key={index}>
                  <Text fontWeight="bold">
                    {comment.id}
                    <Tag variant="outline" colorScheme="red" marginLeft={3}>
                      <TagLabel>Video not found</TagLabel>
                      <TagRightIcon as={WarningIcon} />
                    </Tag>
                  </Text>
                </ListItem>
              );
            }
            return (
              <ListItem key={index}>
                <Text fontWeight="bold">
                  {comment.comments.items[0].snippet.videoId}
                  {comment.cacheTagVisible && (
                    <Tag variant="outline" colorScheme="blue" marginLeft={3}>
                      <TagLabel>Fetched from cache</TagLabel>
                      <TagRightIcon as={RepeatClockIcon} />
                    </Tag>
                  )}

                  <CustomModal
                    showModalButtonText="Show Comments"
                    modalHeader={`${comment.comments.items[0].snippet.videoId} Comments`}
                    modalBody={<CommentList comment={comment} />}
                  />
                </Text>
              </ListItem>
            );
          })}
        </OrderedList>
      )}
    </Box>
  );
};

export default FindingsList;
