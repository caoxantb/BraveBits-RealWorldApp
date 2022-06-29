import React from "react";

const CommentForm = (props) => {
  const { user, comment, onSubmitComment, onChangeComment } = props;

  return (
    <form className="card comment-form" onSubmit={onSubmitComment}>
      <div className="card-block">
        <textarea
          className="form-control"
          placeholder="Write a comment..."
          rows="3"
          name="body"
          value={comment.body}
          onChange={onChangeComment}
        ></textarea>
      </div>
      <div className="card-footer">
        <img src={`${user.image}`} className="comment-author-img" alt="" />
        <button className="btn btn-sm btn-primary" type="submit">
          Post Comment
        </button>
      </div>
    </form>
  );
};

export default CommentForm;
