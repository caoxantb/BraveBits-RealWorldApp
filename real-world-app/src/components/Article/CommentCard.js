import React from "react";

import { Link } from "react-router-dom";
import dateParse from "../../helper/dateParse";

const CommentCard = (props) => {
  const { comment, user, onDeleteComment } = props;
  return (
    <div className="card">
      <div className="card-block">
        <p className="card-text">{comment.body}</p>
      </div>
      <div className="card-footer">
        <Link
          to={`profile/${comment.author.username}`}
          className="comment-author"
        >
          <img
            src={`${comment.author.image}`}
            className="comment-author-img"
            alt=""
          />
        </Link>
        &nbsp;
        <Link
          to={`profile/${comment.author.username}`}
          className="comment-author"
        >
          {comment.author.username}
        </Link>
        <span className="date-posted">{dateParse(comment.createdAt)}</span>
        <span className="mod-options">
          {comment.author.username === user.username ? (
            <i className="ion-trash-a" onClick={onDeleteComment}></i>
          ) : (
            <span></span>
          )}
        </span>
      </div>
    </div>
  );
};

export default CommentCard;
