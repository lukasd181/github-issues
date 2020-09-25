import styles from "./issuesList.module.css";
import React from "react";
import Moment from "react-moment";

const IssuesList = ({ list, handleShow, selectIssue }) => {
  const wordTrim = (string) => {
    if (string.length > 120) {
      let newStr = string.split("", 120).join("");
      return newStr + "...";
    } else return string;
  };

  if (list.length === 0) return <div></div>;
  return (
    <div className="container">
      {list.map((item) => (
        <div
          className={styles.oneIssue}
          onClick={() => {
            console.log("item", item.url);
            let id = item.url;
            selectIssue(id);
            handleShow();
          }}
        >
          <div className={styles.avatar}>
            <img src={item.user.avatar_url} width={150} alt="" />
          </div>

          <div>
            <h3>
              #{item.number} {item.title}
            </h3>
            <div className={styles.userNameline}>
              <p className="info-line">
                <span>@{item.user.login}</span>
                <span>
                  Last Update: &nbsp;
                  <Moment fromNow date={item.updated_at}></Moment>
                </span>
                <span>Comment: {item.comments}</span>
              </p>
            </div>
            <p className="breakword">{wordTrim(item.body)}</p>
            {item.labels.map((label) => (
              <div className="badge badge-success">{label.name}</div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default IssuesList;
