import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import Modal from "./components/Modal";


function App() {
  const [viewCompletedTasks, setViewCompletedTasks] = useState(false);
  const [todoList, setTodoList] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [activeItem, setActiveItem] = useState({
    title: "",
    description: "",
    completed: false
  });

  useEffect(() => {
    refreshList();
  }, []);

  function refreshList() {
    axios
      .get("/api/todos/")
      .then((res) => setTodoList(res.data))
      .catch((err) => console.log(err));
  };
  function toggleModal() {
    setModalShow(!modalShow);
  };
  function handleSubmit(item) {
    toggleModal();
    
    if (item.id) {
      axios
        .put(`/api/todos/${item.id}/`, item)
        .then((res) => refreshList());
      return;
    }
    axios
      .post("/api/todos/", item)
      .then((res) => refreshList());
  };
  function handleDelete(item) {
    axios
      .delete(`/api/todos/${item.id}/`)
      .then((res) => refreshList());
  };
  function createItem() {
    const item = { title: "", description: "", completed: false };
    setActiveItem(item);
    toggleModal();
  };
  function editItem(item) {
    setActiveItem(item)
    toggleModal();
  };

  function renderTabItems() {
    return (
      <div className="nav nav-tabs">
        <span
          className={viewCompletedTasks ? "nav-link active" : "nav-link"}
          onClick={() => setViewCompletedTasks(true)}
        >
          Complete
        </span>
        <span
          className={viewCompletedTasks ? "nav-link" : "nav-link active"}
          onClick={() => setViewCompletedTasks(false)}
        >
          Incomplete
        </span>
      </div>
    );
  };

  function renderItems() {
    const filteredTodoList = todoList.filter(
      (item) => item.completed === viewCompletedTasks
    )
    return filteredTodoList.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        <span
          className={`todo-title mr-2 ${
            viewCompletedTasks ? "completed-todo" : ""
          }`}
          title={item.description}
        >
          {item.title}
        </span>
        <span>
          <button
            className="btn btn-secondary mr-2"
            onClick={() => editItem(item)}>
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDelete(item)}>
            Delete
          </button>
        </span>
      </li>
    ));
  }

  return (
    <main className="container">
      <h1 className="text-white text-uppercase text-center my-4">Todo app</h1>
      <div className="row">
        <div className="col-md-6 col-sm-10 mx-auto p-0">
          <div className="card p-3">
            <div className="mb-4">
              <button
                className="btn btn-primary"
                onClick={createItem}
              >
                Add task
              </button>
            </div>
            {renderTabItems()}
            <ul className="list-group list-group-flush border-top-0">
              {renderItems()}
            </ul>
          </div>
        </div>
      </div>
      {modalShow ? (
          <Modal
            activeItem={activeItem}
            show={modalShow}
            onHide={() => setModalShow(false)}
            onSave={handleSubmit}
          />
        ) : null}
    </main>
  );
}

export default App;
