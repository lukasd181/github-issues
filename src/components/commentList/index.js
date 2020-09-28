import React from "react";
import styles from "./commentList.module.css";
import ReactMarkdown from "react-markdown";
import Moment from 'react-moment';
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
const CommentList = ({ commentList, handleMoreComment, loadingComment }) => {
  return (
    <div>
      {commentList.map((item) => (
        <div className={styles.comment}>
          <div>
            <img
              className={styles.userImg}
              src={item.user.avatar_url}
              alt="personalPic"
            />
          </div>
          <div className={styles.commentContent}>
            <div className={styles.userInfo}>
              <div className={styles.name}>@{item.user.login}</div>
              <div className={styles.time}>commented <Moment fromNow date={item.updated_at}></Moment></div>
            </div>
            <div className={styles.commentText}>
              <ReactMarkdown source={item.body} />
            </div>
          </div>
        </div>
      ))}
      <div>{loadingComment ? (
        <div>
          <div>LOADING</div>
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loadingComment}
        />
        </div>
      ): (<></>) }</div>
    </div>
  );
};

export default CommentList;
