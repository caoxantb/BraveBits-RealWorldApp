import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ArticlePreview from "../Article/ArticlePreview";
import ArticleToggle from "../Article/ArticleToggle";
import UserInfo from "./UserInfo";

import profileService from "../../services/profileService";
import articleService from "../../services/articleService";

const Profile = (props) => {
  const { user } = props;
  const [profile, setProfile] = useState(null);
  const [toggle, setToggle] = useState("My Articles");
  const [myArticles, setMyArticles] = useState([]);
  const [favoritedArticles, setFavoritedArticles] = useState([]);

  const { username } = useParams();

  useEffect(() => {
    profileService.getProfile(username).then((response) => {
      setProfile(response.profile);
    });
  }, [username]);

  useEffect(() => {
    if (user) {
      articleService
        .getProfileArticles(username, user.token)
        .then((response) => {
          console.log(response);
          setMyArticles(response.articles);
        });
    }
  }, [username, user]);

  useEffect(() => {
    if (user) {
      articleService
        .getFavoritedArticles(username, user.token)
        .then((response) => {
          setFavoritedArticles(response.articles);
        });
    }
  }, [username, user]);

  const onClickFollow = async (event) => {
    event.preventDefault();
    const newProfile = profile.following
      ? await profileService.unfollowProfile(username, user.token)
      : await profileService.followProfile(username, user.token);
    setProfile(newProfile.profile);
  };

  return (
    <div className="profile-page">
      {profile ? (
        <div>
          <UserInfo
            profile={profile}
            user={user}
            onClickFollow={onClickFollow}
          />
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <div className="articles-toggle">
                  <ul className="nav nav-pills outline-active">
                    <ArticleToggle
                      name="My Articles"
                      toggle={toggle}
                      onClickHandle={() => setToggle("My Articles")}
                    />
                    <ArticleToggle
                      name="Favorited Articles"
                      toggle={toggle}
                      onClickHandle={() => setToggle("Favorited Articles")}
                    />
                  </ul>
                </div>

                {toggle === "My Articles"
                  ? myArticles.map((ar) => (
                      <ArticlePreview article={ar} key={ar.slug} user={user} />
                    ))
                  : favoritedArticles.map((ar) => (
                      <ArticlePreview article={ar} key={ar.slug} user={user} />
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

export default Profile;
