import React from "react";

import { Link } from "react-router-dom";

const UserInfo = (props) => {
  const { profile, user, onClickFollow } = props;

  const profileButton = profile.following ? (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={onClickFollow}
    >
      <i className="ion-plus-round"></i>
      &nbsp; Unfollow {profile.username}
    </button>
  ) : (
    <button
      className="btn btn-sm btn-outline-secondary action-btn"
      onClick={onClickFollow}
    >
      <i className="ion-plus-round"></i>
      &nbsp; Follow {profile.username}
    </button>
  );

  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img" alt="" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            {profile.username === user.username ? (
              <Link to="/settings">
                <button className="btn btn-sm btn-outline-secondary action-btn">
                  <i className="ion-gear-a">&nbsp; Edit Profile Settings</i>
                </button>
              </Link>
            ) : (
              <div>{profileButton}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
