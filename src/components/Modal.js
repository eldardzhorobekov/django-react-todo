import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
} from "react-bootstrap";

export default function CustomModal(props) {
  const {activeItem, show, onHide, onSave} = props;
  const [item, setItem] = useState(Object.assign({}, activeItem));

  function handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setItem({
      ...item,
      [name]: value
    })
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>Todo Item</Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTodoTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={item.title}
              onChange={handleChange}
              placeholder="Enter Todo Title"
            />
          </Form.Group>
          <Form.Group controlId="formTodoDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="description"
              value={item.description}
              onChange={handleChange}
              placeholder="Enter Todo description"
            />
          </Form.Group>
          <Form.Group controlId="formTodoCompleted">
            <Form.Check
              name="completed"
              checked={item.completed}
              onChange={handleChange}
              label="Completed"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          color="success"
          onClick={() => onSave(item)}
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}