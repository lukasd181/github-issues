import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchBox from "./components/searchBox";
import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";
import IssueModal from "./components/issueModal";
import Pagination from "react-js-pagination";
import IssuesList from "./components/issuesList";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;
function App() {
  let [keyword, setKeyword] = useState("");
  let [error, setError] = useState(null);
  let [repo, setRepo] = useState("react");
  let [owner, setOwner] = useState("Facebook");
  let [loading, setLoading] = useState(null);
  let [list, setList] = useState([]);
  let [totalPageNum, setTotalPageNum] = useState(1);
  let [page, setPage] = useState(1);

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
      const url = `https://api.github.com/repos/${owner}/${repo}/issues?page=${page}`;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        setList(data);
        console.log("data", data);

        const link = response.headers.get("link");
        console.log("link", link);
        if (link) {
          const getTotalPage = link.match(/page=(\d+)>; rel="last"/);
          if (getTotalPage) {
            console.log("getTotalpage", getTotalPage);
            setTotalPageNum(parseInt(getTotalPage[1]));
          }
        }
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
  }, [owner, repo, page]);

  // FOR MODAL
  let [clickedIssue, setClickedIssue] = useState(null);
  const selectIssue = async (id) => {
    try {
      const url = id;
      const response = await fetch(url);
      if (response.status === 200) {
        const data = await response.json();
        console.log("data", data);
        setClickedIssue(data);
      } else {
        setError("Issue: API has some problem");
      }
    } catch (err) {
      setError(`FETCH ERROR ${err.message}`);
    }
  };

  return (
    <div>
      <div className="search-div">
        <SearchBox setKeyword={setKeyword} handleSubmit={handleSubmit} />
      </div>
      {error && (
        <Alert key={0} variant="danger">
          {error}
        </Alert>
      )}
      <div className="pageBar">
        <Pagination
          activePage={page}
          itemsCountPerPage={20}
          totalItemsCount={20 * totalPageNum}
          pageRangeDisplayed={5}
          onChange={(clickedpage) => {
            setPage(clickedpage);
          }}
          itemClass="page-item"
          linkClass="page-link"
        />
      </div>

      {loading ? (
        <ClipLoader
          css={override}
          size={150}
          color={"#123abc"}
          loading={loading}
        />
      ) : (
        <IssuesList
          list={list}
          handleShow={handleShow}
          selectIssue={selectIssue}
        />
      )}

      <IssueModal
        handleClose={handleClose}
        handleShow={handleShow}
        show={show}
        clickedIssue={clickedIssue}
      />
    </div>
  );
}

export default App;
