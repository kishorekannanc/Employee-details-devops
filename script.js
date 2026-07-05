// ==========================================
// Employee Management System
// script.js
// ==========================================

// Change this to your Application Server IP
const API_URL = "http://3.90.144.28:8080";

// ==============================
// Search Employee
// ==============================
function searchEmployee() {

    const employeeId = document.getElementById("employeeId").value.trim();

    if (employeeId === "") {
        alert("Please enter Employee ID");
        return;
    }

    fetch(`${API_URL}/employee/${employeeId}`)

    .then(response => {

        if (response.status === 404) {

            document.getElementById("result").innerHTML = `
                <div class="error">
                    <h3>Employee Not Found</h3>

                    <br>

                    <a href="add-employee.html?id=${employeeId}">
                        <button class="add-btn">
                            Add Employee
                        </button>
                    </a>

                </div>
            `;

            return null;
        }

        return response.json();

    })

    .then(data => {

        if (!data) return;

        document.getElementById("result").innerHTML = `

            <table>

                <tr>
                    <th>Employee ID</th>
                    <td>${data.id}</td>
                </tr>

                <tr>
                    <th>Name</th>
                    <td>${data.name}</td>
                </tr>

                <tr>
                    <th>Age</th>
                    <td>${data.age}</td>
                </tr>

                <tr>
                    <th>Department</th>
                    <td>${data.department}</td>
                </tr>

                <tr>
                    <th>Role</th>
                    <td>${data.role}</td>
                </tr>

            </table>

        `;

    })

    .catch(error => {

        console.error(error);

        document.getElementById("result").innerHTML = `
            <div class="error">
                Unable to connect to Application Server.
            </div>
        `;

    });

}

// ==============================
// Auto Fill Employee ID
// ==============================

window.onload = function () {

    const idBox = document.getElementById("id");

    if (idBox) {

        const params = new URLSearchParams(window.location.search);

        const id = params.get("id");

        if (id) {
            idBox.value = id;
        }

    }

};

// ==============================
// Save Employee
// ==============================

function saveEmployee() {

    const employee = {

        id: document.getElementById("id").value.trim(),
        name: document.getElementById("name").value.trim(),
        age: document.getElementById("age").value.trim(),
        department: document.getElementById("department").value.trim(),
        role: document.getElementById("role").value.trim()

    };

    if (
        employee.id === "" ||
        employee.name === "" ||
        employee.age === "" ||
        employee.department === "" ||
        employee.role === ""
    ) {

        alert("Please fill all fields.");

        return;
    }

    fetch(`${API_URL}/employee`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(employee)

    })

    .then(response => response.json())

    .then(data => {

        const message = document.getElementById("message");

        message.innerHTML = `
            <span class="success">
                ${data.message}
            </span>
        `;

        setTimeout(() => {

            window.location.href = "index.html";

        }, 1500);

    })

    .catch(error => {

        console.error(error);

        document.getElementById("message").innerHTML = `
            <span class="error">
                Failed to add employee.
            </span>
        `;

    });

}

// ==============================
// Clear Form
// ==============================

function clearForm() {

    document.getElementById("id").value = "";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
    document.getElementById("department").value = "";
    document.getElementById("role").value = "";

    const message = document.getElementById("message");

    if (message) {
        message.innerHTML = "";
    }

}
