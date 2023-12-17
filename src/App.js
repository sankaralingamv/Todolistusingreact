import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import React, { useState } from "react";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [posts, setPosts] = useState([]);
  const [errorMsg, setErrorMsg] = useState("");
  const [editMode, setEditMode] = useState({});

  const handleInputChange = (e) => {
    debugger;
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (e) => {
    debugger;
    e.preventDefault();

    if (inputValue.trim() === "") {
      alert("Post cannot be blank");
      return;
    }

    const newPost = { text: inputValue };
    setPosts([...posts, newPost]);
    setInputValue("");
    setErrorMsg("");
  };

  const deletePost = (index) => {
    debugger;
    const updatedPosts = [...posts];
    updatedPosts.splice(index, 1);
    setPosts(updatedPosts);
  };

  const editPost = (index) => {
    debugger;
    setEditMode({ ...editMode, [index]: true });
  };

  // Add a new state variable to track edited text for each post in edit mode
  const [editedText, setEditedText] = useState({});

  const saveEditedPost = (index, newText) => {
    debugger;
    const updatedPosts = [...posts];
    updatedPosts[index].text = newText;
    setPosts(updatedPosts);
    setEditMode({ ...editMode, [index]: false });
    // Clear the edited text for this post
    setEditedText({ ...editedText, [index]: "" });
  };

  return (
    <div className="App">
      <header className="App-header">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <img
          src={require("../src/images/sticky-note.png")}
          alt="Todo list"
          height={"60px"}
          width={"60px"}
        />
        <h1>React - Todo List</h1>
        <h5>Social Media App</h5>
      </header>
      <div className="container">
        <div className="left mt-3">
          <form onSubmit={handleFormSubmit}>
            <h5 htmlFor="post" className="form-label">
              Write your post here
            </h5>
            <textarea
              name="post"
              className="form-control"
              value={inputValue}
              onChange={handleInputChange}
              cols="30"
              rows="10"
            ></textarea>
            <div id="msg">{errorMsg}</div>
            <button type="submit" className="btn btn-success mt-3 mb-2">
              Post
            </button>
          </form>
        </div>
        <div className="right mt-3">
          <h4>Your posts here..</h4>
          <div id="posts">
            {posts.map((post, index) => (
              <div key={index} className="post">
                {editMode[index] ? (
                  <div>
                    <textarea
                      name="post"
                      className="form-control"
                      value={editedText[index] || post.text}
                      onChange={(e) => {
                        const newText = e.target.value;
                        setEditedText({ ...editedText, [index]: newText });
                      }}
                    />
                    <span className="options">
                      <button
                        onClick={() =>
                          saveEditedPost(index, editedText[index] || post.text)
                        }
                        className="btn btn-success btn-sm"
                      >
                        Save
                      </button>
                    </span>
                  </div>
                ) : (
                  <div>
                    <p>{post.text}</p>
                    <span className="options">
                      <i
                        onClick={() => editPost(index)}
                        className="fas fa-edit text-primary"
                      ></i>
                      <i
                        onClick={() => deletePost(index)}
                        className="fas fa-trash-alt text-danger"
                      ></i>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;