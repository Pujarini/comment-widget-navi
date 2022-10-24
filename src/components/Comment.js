import React, { useState } from "react";

const Comment = ({ comment, addComment }) => {
  const { commentText, childCommments, id } = comment;
  const [childComment, setChildComment] = useState("");
  const [showReplyComponent, setShowReplyComponent] = useState(false);

  const onAdd = () => {
    addComment(id, childComment, true);
    setChildComment("");
    setShowReplyComponent(false);
  };

  const onDelete = () => {
    addComment(id, childComment, false);
  };

  return (
    <div className="Comment">
      <div>
        <div style={{ textAlign: "left", marginTop: "25px" }}>
          {commentText}
          <>
            <button
              style={{
                cursor: "pointer",
                fontSize: "1rem",
                color: "blue",
                marginLeft: "30px",
                marginRight: "20px",
                border: "1px solid blue",
                padding: "10px",
                borderRadius: "5px",
                width: "70px",
                backgroundColor: "#eee",
              }}
              onClick={() => setShowReplyComponent(true)}
            >
              Reply
            </button>
            <button
              style={{
                cursor: "pointer",
                fontSize: "1.0rem",
                color: "red",
                marginLeft: "10px",
                border: "1px solid red",
                padding: "10px",
                borderRadius: "5px",
                width: "70px",
                backgroundColor: "#eee",
              }}
              onClick={onDelete}
            >
              Delete
            </button>
          </>
        </div>
      </div>
      <span>
        <span>
          {showReplyComponent && (
            <>
              <input
                type="text"
                value={childComment}
                onChange={(e) => setChildComment(e.target.value)}
                placeholder="Enter your reply"
                style={{ marginTop: "15px" }}
              />{" "}
              <button onClick={onAdd}>Reply</button>
            </>
          )}
        </span>
      </span>
      {childCommments.map((childCommentEl, key) => {
        return (
          <Comment key={key} comment={childCommentEl} addComment={addComment} />
        );
      })}
    </div>
  );
};

export default Comment;
