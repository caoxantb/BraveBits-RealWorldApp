import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import articleService from "../../services/articleService";

const ArticleForm = (props) => {
  const navigate = useNavigate();

  const { user } = props;

  const [articleFormData, setArticleFormData] = useState({
    title: "",
    description: "",
    body: "",
  });
  const [tagList, setTagList] = useState([]);

  const handleArticleFormChange = (event) => {
    setArticleFormData({
      ...articleFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleTagList = (event) => {
    console.log(event.target.value);
    if (event.key === "Enter") {
      console.log(event.key);
      setTagList([...tagList, event.target.value]);
      event.target.value = "";
    }
  };

  const handleArticleFormSubmit = async (event) => {
    console.log(event);
    event.preventDefault();
    try {
      const data = { article: { ...articleFormData, tagList: tagList } };
      console.log(data);
      const response = await articleService.createArticle(data, user.token);
      console.log(response);
      navigate(`/article/${response.article.slug}`);
    } catch (e) {
      console.log(e);
      setArticleFormData({
        title: "",
        description: "",
        body: "",
      });
      setTagList([]);
    }
  };

  return (
    <div className="editor-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-10 offset-md-1 col-xs-12">
            <form onSubmit={handleArticleFormSubmit}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="title"
                    className="form-control form-control-lg"
                    placeholder="Article Title"
                    onChange={handleArticleFormChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="description"
                    className="form-control"
                    placeholder="What's this article about?"
                    onChange={handleArticleFormChange}
                    required
                  />
                </fieldset>
                <fieldset className="form-group">
                  <textarea
                    className="form-control"
                    rows="8"
                    name="body"
                    placeholder="Write your article (in markdown)"
                    onChange={handleArticleFormChange}
                    required
                  ></textarea>
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    name="tagList"
                    className="form-control"
                    placeholder="Enter tags"
                    onKeyPress={handleTagList}
                  />
                  <div className="tag-list">
                    {tagList.map((tag) => (
                      <span className="tag-default tag-pill" key={tag}>
                        <i className="ion-close-round"></i>
                        {tag}
                      </span>
                    ))}
                  </div>
                </fieldset>
                <button
                  className="btn btn-lg pull-xs-right btn-primary"
                  type="button"
                  onClick={handleArticleFormSubmit}
                >
                  Publish Article
                </button>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleForm;
