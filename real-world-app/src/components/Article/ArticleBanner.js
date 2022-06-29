import React from "react";
import ArticleMeta from "./ArticleMeta";

const ArticleBanner = (props) => {
  const { article, user, onDelete, likeArticle, unlikeArticle } = props;
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>
        <ArticleMeta
          article={article}
          user={user}
          onDelete={onDelete}
          likeArticle={likeArticle}
          unlikeArticle={unlikeArticle}
        />
      </div>
    </div>
  );
};

export default ArticleBanner;
