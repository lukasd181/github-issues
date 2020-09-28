import React from "react";
import CommentList from "../commentList";
import { Modal, Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import CodeBlock from "./CodeBlock";

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
