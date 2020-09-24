import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./components/searchBox";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";

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

  //Goal: get search keyword and show data
  //1. get the owner and repo from keyowrd
  //2. call api
  //2.1 if there is no repo or owner, OR for some reason, api not work
  //then throw the error
  //3. show data
  //before it show result, it will show loading sign
  const handleSubmit = () => {
    console.log("keyword", keyword);
    let { owner, repo } = getOwnerRepo(keyword);
    if (!owner || !repo) {
      setError("Error");
      return;
    }
    console.log(owner);
    console.log(repo);
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
      const url = `https://api.github.com//repos/${owner}/${repo}/issues`;
      const response = await fetch(url);
      console.log("Im here");
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

  useEffect(() => {
    if (!owner || !repo) {
      return;
    }
    getIssues();
  }, [owner, repo]);

  return (
    <div>
      <h1>{keyword}</h1>
      <SearchBox setKeyword={setKeyword} handleSubmit={handleSubmit} />
      {error && (
        <Alert key={0} variant="danger">
          {error}
        </Alert>
      )}
      <div className="sweet-loading">
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      </div>

      <button type="button">Show Modal</button>
    </div>
  );
}

export default App;
