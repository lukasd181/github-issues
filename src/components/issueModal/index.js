import React from "react";
import CommentList from "../commentList";
import { Button, Modal } from "react-bootstrap";
import ReactMarkdown from "react-markdown";

const IssueModal = ({ handleClose, handleShow, show, clickedIssue }) => {
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
          {clickedIssue && <ReactMarkdown source={clickedIssue.body} />}
        </Modal.Body>
        <Modal.Footer>
          <CommentList />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssueModal;
