import React from "react";
import CommentList from "../commentList";

const issueModal  = ({commentsData,getUserLogin,getAvatarUrl,getCommentBody,getCommentPostedTime}) => {
  return <div>
      <CommentList commentsData={commentsData}
        getUserLogin={getUserLogin}
        getAvatarUrl={getAvatarUrl}
        getCommentBody={getCommentBody}
        getCommentPostedTime={getCommentPostedTime}
        />
  </div>;
};

export default issueModal;
