class UI {
  constructor() {
    this.post = document.querySelector("#posts");
    this.nameInput = document.querySelector("#name");
    this.emailInput = document.querySelector("#email");
    this.genderInput = document.querySelector("#gender");
    this.statusInput = document.querySelector("#status");
    this.idInput = document.querySelector("#id");
    this.postSubmit = document.querySelector(".post-submit");
    this.forState = "add";
  }

  // Show all posts
  showPosts(posts) {
    let output = "";

    posts.forEach((post) => {
      output += `
        <div class="card mb-3">
          <div class="card-body">
            <h4 class="card-title">${post.name}</h4>
            <p class="card-text">${post.email}</p>
            <p class="card-text">${post.gender}</p>
            <p class="card-text">${post.status}</p>
            <a href="#" class="edit card-link" data-id="${post.id}"><i class="fa fa-edit"></i></a>
            <a href="#" class="delete card-link" data-id="${post.id}"><i class="fa fa-trash-alt"></i></a>
          </div>
        </div>
      `;
    });

    this.post.innerHTML = output;
  }

  // Show alert message
  showAlert(message, className) {
    this.clearAlert();

    // Create div
    const div = document.createElement("div");
    // Add classes
    div.className = className;
    // Add text
    div.appendChild(document.createTextNode(message));
    // Get parent
    const container = document.querySelector(".postsContainer");
    // Get posts
    const posts = document.querySelector("#posts");
    // Insert alert div
    container.insertBefore(div, posts);

    // Timeout
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }

  // Clear alert message
  clearAlert() {
    const currentAlert = document.querySelector(".alert");

    if (currentAlert) {
      currentAlert.remove();
    }
  }

  // Clear all fields
  clearFields() {
    this.nameInput.value = "";
    this.emailInput.value = "";
    this.genderInput.value = "";
    this.statusInput.value = "";
  }

  // Fill form to edit
  fillForm(data) {
    this.nameInput.value = data.name;
    this.emailInput.value = data.email;
    this.genderInput.value = data.gender;
    this.statusInput.value = data.status;
    this.idInput.value = data.id;

    this.changeFormState("edit");
  }

  // Clear ID hidden value
  clearIdInput() {
    this.idInput.value = "";
  }

  // Change form state
  changeFormState(type) {
    if (type === "edit") {
      this.forState = "update";
      this.postSubmit.textContent = "Update";
      this.postSubmit.className = "post-submit btn btn-warning btn-block";

      // Create cancel button
      const cancelButton = document.createElement("button");
      cancelButton.className = "post-cancel btn btn-light btn-block mt-2";
      cancelButton.appendChild(document.createTextNode("Cancel"));
      // Get parent
      const cardForm = document.querySelector(".card-form");
      // Get element to insert before
      const formEnd = document.querySelector(".form-end");
      // Insert cancel button
      cardForm.insertBefore(cancelButton, formEnd);
    } else {
      this.forState = "add";
      this.postSubmit.textContent = "Add";
      this.postSubmit.className = "post-submit btn btn-primary btn-block";

      // Remove cancel button
      if (document.querySelector(".post-cancel")) {
        document.querySelector(".post-cancel").remove();
      }

      // Clear ID from hidden field
      this.clearIdInput();
      // Clear text
      this.clearFields();
    }
  }
}

export const ui = new UI();
