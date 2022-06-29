import React from "react";

import { Link } from "react-router-dom";

const TagPill = (props) => {
  const { tagName, onTagPillClicked } = props;
  return (
    <Link to="" className="tag-pill tag-default" onClick={onTagPillClicked}>
      {tagName}
    </Link>
  );
};

export default TagPill;
