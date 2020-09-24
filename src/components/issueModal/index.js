import React from "react";
import CommentList from "../commentList";
import { Button, Modal } from "react-bootstrap";

const IssueModal = ({ handleClose, handleShow, show }) => {
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <CommentList />
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default IssueModal;
