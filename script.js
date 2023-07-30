var selectedRow = null;

// Show Alerts
function showAlert(message, className) {
    
    const alertDiv = document.createElement("div");
    alertDiv.className = `alert alert-${className}`;
    alertDiv.appendChild(document.createTextNode(message));

   
    const container = document.querySelector(".container");
    container.appendChild(alertDiv);
    setTimeout(() => {alertDiv.remove();}, 4000);
}

// Clear all fields
function clearFields() {
    document.querySelector("#firstName").value = "";
    document.querySelector("#lastName").value = "";
    document.querySelector("#stu-id").value = "";
}

// Add data
document.querySelector("#student-form").addEventListener("submit", (e) => {
    e.preventDefault();
    // Get form values
    const firstName = document.querySelector("#firstName").value;
    const lastName = document.querySelector("#lastName").value;
    const stuId = document.querySelector("#stu-id").value;

    // Validate
    if (firstName === "" || lastName === "" || stuId === "") {
        showAlert("Please fill in all fields", "danger");
    } else {
        if (selectedRow === null) {
            const list = document.querySelector("#student-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${stuId}</td>
                <td>Bsc.CSIT</td>
                <td>
                    <a href="#" class="btn btn-warning btn-sm edit-btn">Edit</a>
                    <a href="#" class="btn btn-danger btn-sm delete-btn">Delete</a>
                </td>
            `;
            list.appendChild(row);
            showAlert("Student Added", "success");
        } else {
            selectedRow.children[0].textContent = firstName;
            selectedRow.children[1].textContent = lastName;
            selectedRow.children[2].textContent = stuId;
            showAlert("Student Info Edited", "info");
            selectedRow = null;
        }
        clearFields();
    }
});

// Edit data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("edit-btn")) {
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#firstName").value = selectedRow.children[0].textContent;
        document.querySelector("#lastName").value = selectedRow.children[1].textContent;
        document.querySelector("#stu-id").value = selectedRow.children[2].textContent;
    }
});

// Delete data
document.querySelector("#student-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("delete-btn")) {
        const row = target.parentElement.parentElement;
        row.remove();
        showAlert("Student Data Deleted", "danger");
    }
});
