import { v4 as uuidv4 } from "uuid";

export const createNewComment = (
  commentValue,
  isRootNode = false,
  parentNodeId
) => {
  return {
    id: uuidv4(),
    commentText: commentValue,
    childCommments: [],
    isRootNode,
    parentNodeId,
  };
};
