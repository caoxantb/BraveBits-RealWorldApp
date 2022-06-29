import React from "react";

const ArticleContent = (props) => {
  const { article } = props;
  return (
    <div className="row article-content">
      <div className="col-md-12">
        <p>{article.body}</p>
        <ul className="tag-list">
          {article.tagList.map((tag) => (
            <li className="tag-default tag-pill tag-outline" key={tag}>
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArticleContent;
