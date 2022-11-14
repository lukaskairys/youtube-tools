import {
  OrderedList,
  ListItem,
  Heading,
  Avatar,
  Tag,
  TagLabel,
  TagRightIcon,
  Text,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { BiLike } from "react-icons/bi";

interface Props {
  comment: any;
}

const CommentList = ({ comment }: Props) => {
  return (
    <OrderedList spacing={4}>
      {comment &&
        comment.comments.items.map((item: any, index: any) => {
          const {
            textOriginal,
            authorDisplayName,
            likeCount,
            authorProfileImageUrl,
            updatedAt,
          } = item.snippet.topLevelComment.snippet;
          return (
            <ListItem key={index}>
              <Heading size="sm" lineHeight={6}>
                <Avatar
                  name={authorDisplayName}
                  src={authorProfileImageUrl}
                  size="xs"
                  marginRight={2}
                />
                {authorDisplayName}{" "}
                <Tag variant="outline" colorScheme="facebook" marginLeft={2}>
                  <TagLabel>{likeCount}</TagLabel>
                  <TagRightIcon as={BiLike} />
                </Tag>
              </Heading>
              <Text fontSize="xs" marginBottom={2} marginLeft={8}>
                {dayjs(updatedAt).fromNow()}
              </Text>
              <Text>{textOriginal} </Text>
            </ListItem>
          );
        })}
    </OrderedList>
  );
};

export default CommentList;
