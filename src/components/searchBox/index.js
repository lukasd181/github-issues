import React from "react";
import { Button, Form, FormControl } from "react-bootstrap";

const SearchBox = ({ setKeyword, handleSubmit }) => {
  return (
    <div>
      <h1> Github Issues</h1>
      <Form
        inline
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          onChange={(event) => setKeyword(event.target.value)}
        />
        <Button variant="outline-success" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBox;
