import React from "react";

import { Link } from "react-router-dom";
import dateParse from "../../helper/dateParse";

const ArticleMeta = (props) => {
  const { article, user, onDelete, likeArticle, unlikeArticle } = props;

  const likeButton = article.favorited ? (
    <button className="btn btn-sm btn-outline-primary" onClick={unlikeArticle}>
      <i className="ion-heart"></i>
      &nbsp; Unfavorite Post
      <span className="counter"> ({article.favoritesCount})</span>
    </button>
  ) : (
    <button className="btn btn-sm btn-outline-primary" onClick={likeArticle}>
      <i className="ion-heart"></i>
      &nbsp; Favorite Post
      <span className="counter"> ({article.favoritesCount})</span>
    </button>
  );

  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <img src={`${article.author.image}`} alt="" />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{dateParse(article.createdAt)}</span>
      </div>

      {user.username !== article.author.username ? (
        <span>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-plus-round"></i>
            &nbsp; Follow {article.author.username}
          </button>
          &nbsp;&nbsp;
          {likeButton}
        </span>
      ) : (
        <span>
          <button className="btn btn-sm btn-outline-secondary">
            <i className="ion-edit"></i>
            &nbsp; Edit Article
          </button>
          &nbsp;&nbsp;
          <button className="btn btn-sm btn-outline-danger" onClick={onDelete}>
            <i className="ion-trash-a"></i>
            &nbsp; Delete Article
          </button>
        </span>
      )}
    </div>
  );
};

export default ArticleMeta;
