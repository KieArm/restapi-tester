import { http } from "./http";
import { ui } from "./ui";

// Get posts on DOM load
document.addEventListener("DOMContentLoaded", getPosts);

// Listen for add post
document.querySelector(".post-submit").addEventListener("click", submitPost);

// Listen for delete
document.querySelector("#posts").addEventListener("click", deletePost);

// Listen for edit state
document.querySelector("#posts").addEventListener("click", enableEdit);

// Listen for cancel
document.querySelector(".card-form").addEventListener("click", cancelEdit);

// gorest.co.in URL and access token
const restUrl = "https://gorest.co.in/public/v2/";
const token = "daab4bfaf8a073effad836328c592faa6a0aa8b31f4e0c6be400596141afec4a";

// Get Posts
function getPosts() {
  http
    .get(`${restUrl}users`)
    .then((data) => ui.showPosts(data))
    .catch((err) => console.log(err));
}

// Submit Post
function submitPost() {
  const name = document.querySelector("#name").value;
  const email = document.querySelector("#email").value;
  const gender = document.querySelector("#gender").value;
  const status = document.querySelector("#status").value;
  const id = document.querySelector("#id").value;

  const data = {
    name,
    email,
    gender,
    status,
  };

  // Validate input
  if (name === "" || email === "" || gender === "" || status === "") {
    ui.showAlert("Please fill in all fields", "alert alert-danger");
  } else {
    // Check for ID
    if (id === "") {
      // Create Post
      http
        .post(`${restUrl}users?access-token=${token}`, data)
        .then((data) => {
          ui.showAlert("Added", "alert alert-success");
          ui.clearFields();
          getPosts();
        })
        .catch((err) => console.log(err));
    } else {
      // Update post
      http
        .put(`${restUrl}users/${id}?access-token=${token}`, data)
        .then((data) => {
          ui.showAlert("Updated", "alert alert-success");
          ui.changeFormState("add");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

// Delete Post
function deletePost(e) {
  if (e.target.parentElement.classList.contains("delete")) {
    const id = e.target.parentElement.dataset.id;
    if (confirm("Are you sure?")) {
      http
        .delete(`${restUrl}users/${id}?access-token=${token}`)
        .then((data) => {
          ui.showAlert("Removed", "alert alert-success");
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
  e.preventDefault();
}

// Enable Edit State
function enableEdit(e) {
  if (e.target.parentElement.classList.contains("edit")) {
    const id = e.target.parentElement.dataset.id;
    const name =
      e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling
        .textContent;
    const email =
      e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent;
    const gender = e.target.parentElement.previousElementSibling.previousElementSibling.textContent;
    const status = e.target.parentElement.previousElementSibling.textContent;

    const data = {
      id,
      name,
      email,
      gender,
      status,
    };

    // Fill form with current post
    ui.fillForm(data);
  }

  e.preventDefault();
}

// Cancel edit state
function cancelEdit(e) {
  if (e.target.classList.contains("post-cancel")) {
    ui.changeFormState("add");
  }

  e.preventDefault();
}
