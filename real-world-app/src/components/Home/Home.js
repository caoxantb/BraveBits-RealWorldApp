import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import articleService from "../../services/articleService";
import tagService from "../../services/tagService";

import ArticlePreview from "../Article/ArticlePreview";
import ArticleToggle from "../Article/ArticleToggle";
import HomeBanner from "./HomeBanner";
import TagPill from "./TagPill";

const Home = (props) => {
  const { user } = props;
  const [toggle, setToggle] = useState("Global Feed");
  const [globalFeed, setGlobalFeed] = useState([]);
  const [yourFeed, setYourFeed] = useState([]);
  const [tags, setTags] = useState([]);
  const [toggleTag, setToggleTag] = useState(null);
  const [tagFeed, setTagFeed] = useState([]);
  let articlePreview;

  useEffect(() => {
    articleService.getGlobalArticles(user.token).then((response) => {
      setGlobalFeed(response.articles);
    });
  }, [user]);

  useEffect(() => {
    articleService.getFeedArticles(user.token).then((response) => {
      setYourFeed(response.articles);
    });
  }, [user]);

  useEffect(() => {
    tagService.getTags().then((response) => {
      setTags(response.tags);
    });
  });

  const onTagPillClicked = async (tagName) => {
    setToggleTag(tagName);
    setToggle("");
    const tagArticles = await articleService.getArticlesByTag(
      tagName,
      user.token
    );
    setTagFeed(tagArticles.articles);
  };

  if (toggle === "Global Feed") {
    articlePreview = globalFeed.map((ar) => (
      <ArticlePreview article={ar} key={ar.slug} user={user} />
    ));
  } else if (toggle === "Your Feed") {
    articlePreview = yourFeed.map((ar) => (
      <ArticlePreview article={ar} key={ar.slug} user={user} />
    ));
  } else {
    articlePreview = tagFeed.map((ar) => (
      <ArticlePreview article={ar} key={ar.slug} user={user} />
    ));
  }

  return (
    <div className="home-page">
      {!user ? <HomeBanner /> : <div></div>}
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                {user ? (
                  <ArticleToggle
                    name="Your Feed"
                    toggle={toggle}
                    onClickHandle={() => {
                      setToggle("Your Feed");
                      setToggleTag(null);
                    }}
                  />
                ) : (
                  <li></li>
                )}
                <ArticleToggle
                  name="Global Feed"
                  toggle={toggle}
                  onClickHandle={() => {
                    setToggle("Global Feed");
                    setToggleTag(null);
                  }}
                />
                {toggleTag ? (
                  <li className="nav-item">
                    <Link className="nav-link active" to="">
                      #{toggleTag}
                    </Link>
                  </li>
                ) : (
                  <li></li>
                )}
              </ul>
            </div>

            {/* {toggle === "Global Feed"
              ? globalFeed.map((ar) => (
                  <ArticlePreview article={ar} key={ar.slug} user={user} />
                ))
              : yourFeed.map((ar) => (
                  <ArticlePreview article={ar} key={ar.slug} user={user} />
                ))} */}

            {articlePreview}
          </div>
          <div className="col-md-3">
            <div className="sidebar">
              <p>Popular Tags</p>
              <div className="tag-list">
                {tags.map((tag) => (
                  <TagPill
                    tagName={tag}
                    key={tag}
                    onTagPillClicked={() => onTagPillClicked(tag)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
