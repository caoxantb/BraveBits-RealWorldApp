import React from "react";

import { Link } from "react-router-dom";

const ArticleToggle = (props) => {
  const { name, onClickHandle, toggle } = props;
  return (
    <li className="nav-item" onClick={onClickHandle}>
      <Link className={toggle === name ? "nav-link active" : "nav-link"} to="">
        {name}
      </Link>
    </li>
  );
};

export default ArticleToggle;
