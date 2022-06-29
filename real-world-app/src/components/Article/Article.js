import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import ArticleBanner from "./ArticleBanner";
import ArticleContent from "./ArticleContent";
import ArticleMeta from "./ArticleMeta";
import CommentForm from "./CommentForm";
import CommentCard from "./CommentCard";

import articleService from "../../services/articleService";

const Article = (props) => {
  const { user } = props;

  const [article, setArticle] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState({ body: "" });

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    articleService.getArticle(slug).then((response) => {
      setArticle(response.article);
    });
  }, [slug]);

  useEffect(() => {
    if (user) {
      articleService.getArticleComment(slug, user.token).then((response) => {
        setComments(response.comments);
      });
    }
  }, [slug, user]);

  const deleteArticle = async () => {
    await articleService.deleteArticle(slug, user.token);
    navigate("/");
  };

  const onChangeComment = async (event) => {
    setComment({ ...comment, [event.target.name]: event.target.value });
  };

  const onSubmitComment = async (event) => {
    event.preventDefault();
    try {
      const data = { comment: comment };
      const response = await articleService.postArticleComment(
        slug,
        data,
        user.token
      );
      setComments([...comments, response.comment]);
      setComment({ body: "" });
    } catch (e) {
      console.log(e);
    }
  };

  const onDeleteComment = async (event, id) => {
    event.preventDefault();
    await articleService.deleteArticleComment(slug, id, user.token);
    const newComments = comments.filter((c) => c.id !== id);
    setComments(newComments);
  };

  const likeArticle = async () => {
    console.log(user.token);
    const response = await articleService.likeArticle(slug, user.token);
    console.log(response.article);
    setArticle(response.article);
  };

  const unlikeArticle = async () => {
    const response = await articleService.unlikeArticle(slug, user.token);
    setArticle(response.article);
  };

  return (
    <div className="article-page">
      {article ? (
        <div>
          <ArticleBanner
            article={article}
            user={user}
            onDelete={deleteArticle}
            likeArticle={likeArticle}
            unlikeArticle={unlikeArticle}
          />
          <div className="container page">
            <ArticleContent article={article} />
            <hr />
            <div className="article-actions">
              <ArticleMeta
                article={article}
                user={user}
                onDelete={deleteArticle}
                likeArticle={likeArticle}
                unlikeArticle={unlikeArticle}
              />
            </div>
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <CommentForm
                  user={user}
                  comment={comment}
                  onChangeComment={onChangeComment}
                  onSubmitComment={onSubmitComment}
                />
                {comments.map((c) => (
                  <CommentCard
                    comment={c}
                    key={c.id}
                    user={user}
                    onDeleteComment={(event) => onDeleteComment(event, c.id)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Article;
