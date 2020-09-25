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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
      if (response.status === 200) {
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

  useEffect(() => {
    if (!owner || !repo) {
      return;
    }
    getIssues();
  }, [owner, repo]);

  // FOR MODAL TEST ONLY
  // let [clickedIssue, setClickedIssue] = useState(null);
  // const testGetIssues = async () => {
  //   const url = `https://api.github.com/repos/facebook/react/issues/19851`;
  //   const response = await fetch(url);
  //   const data = await response.json();
  //   console.log("data", data);
  //   setClickedIssue(data);
  // };
  // useEffect(() => {
  //   testGetIssues();
  // }, []);
  // FOR MODAL TEST ONLY

  return (
    <div>
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
        // clickedIssue={clickedIssue}
      />
    </div>
  );
}

export default App;
