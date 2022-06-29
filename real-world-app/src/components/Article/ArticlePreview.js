import React, { useState } from "react";
import { Link } from "react-router-dom";

import articleService from "../../services/articleService";
import dateParse from "../../helper/dateParse";

const ArticlePreview = (props) => {
  const { article, user } = props;

  const [articlePrev, setArticlePrev] = useState(article);

  const likeArticle = async () => {
    console.log(user.token);
    const response = await articleService.likeArticle(
      articlePrev.slug,
      user.token
    );
    console.log(response.article);
    setArticlePrev(response.article);
  };

  const unlikeArticle = async () => {
    const response = await articleService.unlikeArticle(
      articlePrev.slug,
      user.token
    );
    setArticlePrev(response.article);
  };

  const likeButton = articlePrev.favorited ? (
    <button
      className="btn btn-primary btn-sm pull-xs-right"
      onClick={unlikeArticle}
    >
      <i className="ion-heart"></i> {articlePrev.favoritesCount}
    </button>
  ) : (
    <button
      className="btn btn-outline-primary btn-sm pull-xs-right"
      onClick={likeArticle}
    >
      <i className="ion-heart"></i> {articlePrev.favoritesCount}
    </button>
  );

  return (
    <div className="article-preview">
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
        {likeButton}
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default ArticlePreview;
