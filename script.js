// Get elements

const contactForm = document.getElementById("contactForm");

const fullNameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");
const emailInput = document.getElementById("email");
const addressInput = document.getElementById("address");
const categoryInput = document.getElementById("category");

const submitButton = document.getElementById("submitButton");
const cancelButton = document.getElementById("cancelButton");

const contactTableBody = document.getElementById("contactTableBody");

const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");

const contactCount = document.getElementById("contactCount");

const clearAllButton = document.getElementById("clearAllButton");

const themeToggle = document.getElementById("themeToggle");


// Load contacts from localStorage

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];


// Store index of contact being edited

let editingIndex = -1;


// Display contacts

function displayContacts() {

    let filteredContacts = contacts.filter(function(contact) {

        const searchText = searchInput.value.toLowerCase();

        return (
            contact.fullName.toLowerCase().includes(searchText) ||
            contact.phone.includes(searchText) ||
            contact.email.toLowerCase().includes(searchText)
        );

    });


    // Sorting

    if (sortSelect.value === "asc") {

        filteredContacts.sort(function(a, b) {
            return a.fullName.localeCompare(b.fullName);
        });

    } else if (sortSelect.value === "desc") {

        filteredContacts.sort(function(a, b) {
            return b.fullName.localeCompare(a.fullName);
        });

    }


    // Clear table

    contactTableBody.innerHTML = "";


    // No contacts message

    if (filteredContacts.length === 0) {

        contactTableBody.innerHTML = `
            <tr>
                <td colspan="7" class="no-contact">
                    No contacts found
                </td>
            </tr>
        `;

        contactCount.textContent = contacts.length;

        return;
    }


    // Generate table rows

    filteredContacts.forEach(function(contact, index) {

        const originalIndex = contacts.indexOf(contact);

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${contact.fullName}</td>
            <td>${contact.phone}</td>
            <td>${contact.email}</td>
            <td>${contact.address}</td>
            <td>${contact.category}</td>
            <td>
                <button
                    class="update-btn"
                    onclick="editContact(${originalIndex})"
                >
                    Update
                </button>

                <button
                    class="delete-btn"
                    onclick="deleteContact(${originalIndex})"
                >
                    Delete
                </button>
            </td>
        `;

        contactTableBody.appendChild(row);

    });


    // Update contact count

    contactCount.textContent = contacts.length;
}


// Add or Update contact

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();


    const fullName = fullNameInput.value.trim();
    const phone = phoneInput.value.trim();
    const email = emailInput.value.trim();
    const address = addressInput.value.trim();
    const category = categoryInput.value;


    // Check duplicate phone number

    const duplicatePhone = contacts.some(function(contact, index) {

        return (
            contact.phone === phone &&
            index !== editingIndex
        );

    });


    if (duplicatePhone) {

        alert("A contact with this phone number already exists.");

        return;
    }


    // Create contact object

    const contact = {

        fullName: fullName,
        phone: phone,
        email: email,
        address: address,
        category: category

    };


    // Update existing contact

    if (editingIndex !== -1) {

        contacts[editingIndex] = contact;

        editingIndex = -1;

        submitButton.textContent = "Add Contact";

    } else {

        // Add new contact

        contacts.push(contact);

    }


    // Save to localStorage

    localStorage.setItem(
        "contacts",
        JSON.stringify(contacts)
    );


    // Reset form

    contactForm.reset();


    // Refresh table

    displayContacts();

});


// Edit contact

function editContact(index) {

    const contact = contacts[index];


    // Load data into form

    fullNameInput.value = contact.fullName;
    phoneInput.value = contact.phone;
    emailInput.value = contact.email;
    addressInput.value = contact.address;
    categoryInput.value = contact.category;


    // Store editing index

    editingIndex = index;


    // Change button text

    submitButton.textContent = "Update Contact";


    // Scroll to form

    window.scrollTo({

        top: 0,
        behavior: "smooth"

    });

}


// Delete contact

function deleteContact(index) {

    const confirmation = confirm(
        "Are you sure you want to delete this contact?"
    );


    if (confirmation) {

        contacts.splice(index, 1);


        // Save updated array

        localStorage.setItem(
            "contacts",
            JSON.stringify(contacts)
        );


        // Refresh table

        displayContacts();

    }

}


// Cancel update

cancelButton.addEventListener("click", function() {

    contactForm.reset();

    editingIndex = -1;

    submitButton.textContent = "Add Contact";

});


// Search contacts

searchInput.addEventListener("input", function() {

    displayContacts();

});


// Sort contacts

sortSelect.addEventListener("change", function() {

    displayContacts();

});


// Clear all contacts

clearAllButton.addEventListener("click", function() {

    if (contacts.length === 0) {

        alert("There are no contacts to delete.");

        return;
    }


    const confirmation = confirm(
        "Are you sure you want to delete all contacts?"
    );


    if (confirmation) {

        contacts = [];


        localStorage.removeItem("contacts");


        displayContacts();

    }

});


// Dark mode

themeToggle.addEventListener("click", function() {

    document.body.classList.toggle("dark-mode");


    if (document.body.classList.contains("dark-mode")) {

        themeToggle.textContent = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.textContent = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");

    }

});


// Load saved theme

function loadTheme() {

    const savedTheme = localStorage.getItem("theme");


    if (savedTheme === "dark") {

        document.body.classList.add("dark-mode");

        themeToggle.textContent = "☀️ Light Mode";

    }

}


// Load application

loadTheme();

displayContacts();