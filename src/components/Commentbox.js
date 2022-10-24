import React, { useState } from "react";
import { createNewComment } from "../utils";
import Comment from "./Comment";

const Commentbox = () => {
  const [comments, setComments] = useState({});
  const [parentComment, setParentComment] = useState("");

  const commentMapper = (comment) => {
    return {
      ...comment,
      childCommments: comment.childCommments
        .map((id) => comments[id])
        .map((comment) => commentMapper(comment)),
    };
  };

  const enhancedComments = Object.values(comments)
    .filter((comment) => {
      return !comment.parentNodeId;
    })
    .map(commentMapper);

  const deleteComment = (id) => {
    let newObject = {};
    for (let [key, value] of Object.entries(comments)) {
      console.log(key);
      if (key !== id) {
        newObject[key] = value;
      }
    }
    console.log(newObject);
    setComments(newObject);
  };

  const addNewComment = (parentId, newCommentText, addComment = true) => {
    console.log(addComment, parentId);
    let newComment = null;
    // child comment
    if (addComment) {
      if (parentId) {
        newComment = createNewComment(newCommentText, false, parentId);
        setComments((comments) => ({
          ...comments,
          [parentId]: {
            ...comments[parentId],
            childCommments: [
              ...comments[parentId].childCommments,
              newComment.id,
            ],
          },
        }));
      } else {
        // parent comment
        newComment = createNewComment(newCommentText, true, null);
      }
      setComments((comments) => ({ ...comments, [newComment.id]: newComment }));
    } else {
      const parentNode = comments[parentId].parentNodeId;
      if (parentNode) {
        const deleteChildComment = comments[parentNode].childCommments;
        const deleteChildCommentIndex =
          comments[parentNode].childCommments.indexOf(parentId);
        if (deleteChildCommentIndex > -1) {
          deleteChildComment.splice(deleteChildCommentIndex, 1);
        }
        console.log(deleteChildComment);
        deleteComment(parentId);
      } else {
        deleteComment(parentId);
      }
    }
  };

  const onCommentChange = (e) => {
    setParentComment(e.target.value);
  };

  const addClickComment = () => {
    addNewComment(null, parentComment);
    setParentComment("");
  };

  return (
    <div className="comment-container">
      <input
        type="text"
        onChange={onCommentChange}
        value={parentComment}
        className="add-comment-box"
      />
      <button onClick={addClickComment} className="comment-btn">
        Add comment
      </button>
      <div
        style={{
          border: "1px solid blue",
          width: "100%",
          margin: "auto",
          overflowX: "auto",
          padding: "2rem",
          marginTop: "2rem",
        }}
      >
        {enhancedComments.map((comment, key) => {
          return (
            <Comment
              key={key}
              comment={comment}
              addComment={addNewComment}
              deleteComment={addClickComment}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Commentbox;
