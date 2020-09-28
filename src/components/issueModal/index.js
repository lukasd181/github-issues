import React from "react";
import CommentList from "../commentList";
import { Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

<<<<<<< HEAD
const IssueModal = ({ handleClose, show, clickedIssue }) => {
=======
import styles from "./issueModal.module.css";

const IssueModal = ({
  handleClose,
  handleShow,
  show,
  clickedIssue,
  commentList,
  handleMoreComment,
  loadingComment,
  ifOutOfPage,
}) => {
>>>>>>> 6440ab90991751e4caa824f3848a0a6962b70cdf
  console.log("modal", clickedIssue);
  return (
    <div>
      <Modal size="xl" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          {clickedIssue && (
            <Modal.Title>
              #{clickedIssue.number} {clickedIssue.title}
            </Modal.Title>
          )}
        </Modal.Header>
        <Modal.Body>
          {clickedIssue && (
            <ReactMarkdown
              source={clickedIssue.body}
              renderers={{ code: CodeBlock }}
            />
          )}
        </Modal.Body>
        <Modal.Footer className={styles.commentSection}>
          <CommentList
            commentList={commentList}
            handleMoreComment={handleMoreComment}
            loadingCommen={loadingComment}
          />
          <div>
            {ifOutOfPage() ? (
              <></>
            ) : (
              <Button onClick={handleMoreComment}>Show More</Button>
            )}
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssueModal;
