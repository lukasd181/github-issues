import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./components/searchBox";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import IssueModal from "./components/issueModal";
import Pagination from "./components/pagination";
import IssuesList from "./components/issuesList";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function App() {
  let [keyword, setKeyword] = useState("");
  let [error, setError] = useState(null);
  let [repo, setRepo] = useState("");
  let [owner, setOwner] = useState("");
  let [loading, setLoading] = useState(null);
  const [show, setShow] = useState(false);
  let [commentsData, setCommentsData] = useState(null);
 let [commebntURL, setCommentURL] = use
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //1 get one issue
  //2 get commentList
  //3 display the comment list
  //4
  const handleSubmit = () => {
    console.log("keyword", keyword);
    let { owner, repo } = getOwnerRepo(keyword);
    if (!owner || !repo) {
      setError("Error");
      return;
    }
    setRepo(repo);
    setOwner(owner);
    setError(null);
  };

  const getOwnerRepo = (value) => {
    let owner = value.split("/")[0];
    let repo = value.split("/")[1];
    return { owner, repo };
  };
  const getIssues = async () => {
    try {
      setLoading(true);
      const url = `https://api.github.com/repos/${owner}/${repo}/issues`;
      const response = await fetch(url);
      if (response.status == 200) {
        const data = await response.json();
        console.log("data", data);
      } else {
        setError("API has some problem");
      }
      setLoading(false);
    } catch (err) {
      setError(`FETCH ERROR ${err.message}`);
    }
  };

  const getComments = async () => {
    const url = `https://api.github.com/repos/facebook/react/issues/19851/comments`;
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data);
    setCommentsData(data);
  };

  const getUserLogin = (commentObject) => {
    console.log("User Login",commentObject.user.login);
    return commentObject.user.login;
  }
  const getAvatarUrl = (commentObject) => {
    console.log("Avatar", commentObject.user.avatar_url)
    return commentObject.user.avatar_url
  }

  const getCommentBody = (commentObject) => {
    return commentObject.body;
  }

  const getCommentPostedTime = (commentObject) => {
    console.log("Time", commentObject.updated_at)
  }

  useEffect(() => {
    if (!owner || !repo) {
      return;
    }
    getIssues();
  }, [owner,repo,page]);

  return (
    <div>
      <button type="button" onClick={() => getComments()}>Comments</button>
      <button type="button" onClick={() => getCommentPostedTime(commentsData[0])}>AvatarUrl</button>
      <SearchBox setKeyword={setKeyword} handleSubmit={handleSubmit} />
      {error && (
        <Alert key={0} variant="danger">
          {error}
        </Alert>
      )}

      <ClipLoader
        css={override}
        size={150}
        color={"#123abc"}
        loading={loading}
      />

      <IssueModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        commentsData={commentsData}
        getUserLogin={getUserLogin}
        getAvatarUrl={getAvatarUrl}
        getCommentBody={getCommentBody}
        getCommentPostedTime={getCommentPostedTime}
      />
    </div>
  );
}

export default App;
