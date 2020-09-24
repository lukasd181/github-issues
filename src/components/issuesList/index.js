import styles from "./issuesList.module.css";
import React from "react";

const IssuesList = ({ list }) => {
    if (list.length     ===0) return <div></div>
  return (
    <div>
      <div className="avatar">
        <img src={list[0].user.avatar_url} width={150} />
      </div>
      <div></div>
      {list[0].number}
      {/* {list[0].} */}
    </div>
  );
};

export default IssuesList;
