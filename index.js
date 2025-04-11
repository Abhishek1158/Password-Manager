document.getElementById('togglePassword').addEventListener('click', function() {
    const password = document.getElementById('password');
    const toggleButton = document.getElementById('togglePassword');
    if (password.type === 'password') {
        password.type = 'text';
        toggleButton.textContent = 'Hide';
    } else {
        password.type = 'password';
        toggleButton.textContent = 'Show';
    }
});

function searchPasswords() {
    const input = document.getElementById('searchBar').value.toLowerCase();
    const passwordEntries = document.querySelectorAll('.password-entry'); // Assuming each password entry has this class
    
    passwordEntries.forEach(entry => {
        const name = entry.querySelector('.entry-name').textContent.toLowerCase(); // Assuming each entry has a name element
        if (name.includes(input)) {
            entry.style.display = ''; // Show matching entry
        } else {
            entry.style.display = 'none'; // Hide non-matching entry
        }
    });
}

function generatePassword(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return password;
}

function updatePassword() {
    const passwordLength = document.getElementById('passwordLength').value;
    document.getElementById('rangeValue').textContent = passwordLength; // Update range value display

    const newPassword = generatePassword(passwordLength);
    document.getElementById('password').value = newPassword;
}

function savePassword() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    if (username && password) {
        // Retrieve existing passwords from local storage
        let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
        passwordHistory.push({ username, password }); // Add the new password to the history
        localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory)); // Save updated history

        alert(`Password saved for ${username}! Password: ${password}`);
        displayPasswordHistory(); // Update the displayed history
    } else {
        alert('Enter a username and generate a password first.');
    }
}

function deletePassword(index) {
    let passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    passwordHistory.splice(index, 1); // Remove the password at the specified index
    localStorage.setItem('passwordHistory', JSON.stringify(passwordHistory)); // Save updated history
    displayPasswordHistory(); // Update the displayed history
}

function displayPasswordHistory() {
    const passwordHistory = JSON.parse(localStorage.getItem('passwordHistory')) || [];
    const historyList = document.getElementById('passwordHistory');
    historyList.innerHTML = ''; // Clear existing list

    passwordHistory.forEach(({ username, password }, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${username}: ${password}`;

        // Create a delete button
        const deleteButton = document.createElement('span');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-button';
        deleteButton.onclick = () => deletePassword(index); // Set the delete function with the index

        listItem.appendChild(deleteButton);

        historyList.appendChild(listItem);
    });
}

window.onload = displayPasswordHistory; // event handler 
// //  This is a property of the window object that allows you to assign a function to be called when the window has fully loaded.





// document.getElementById('generatePassword').addEventListener('click', function() {
//     const password = generateRandomPassword(12);
//     document.getElementById('password').value = password;
// });

// document.getElementById('togglePassword').addEventListener('click', function() {
//     const passwordField = document.getElementById('password');
//     const toggleButton = document.getElementById('togglePassword');
//     if (passwordField.type === 'password') {
//         passwordField.type = 'text';
//         toggleButton.textContent = 'Hide';
//     } else {
//         passwordField.type = 'password';
//         toggleButton.textContent = 'Show';
//     }
// });

// document.getElementById('credentialForm').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const website = document.getElementById('website').value;
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;

//     addCredentialToList(website, username, password);
//     this.reset();
// });

// function generateRandomPassword(length) {
//     const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
//     let password = "";
//     for (let i = 0; i < length; i++) {
//         const randomIndex = Math.floor(Math.random() * charset.length);
//         password += charset[randomIndex];
//     }
//     return password;
// }

// function addCredentialToList(website, username, password) {
//     const credentialList = document.getElementById('credentialList');
//     const listItem = document.createElement('li');
//     listItem.textContent = `Website: ${website}, Username: ${username}, Password: ${password}`;
    
//     const copyButton = document.createElement('button');
//     copyButton.textContent = 'Copy Password';
//     copyButton.addEventListener('click', function() {
//         navigator.clipboard.writeText(password).then(() => {
//             alert('Password copied to clipboard!');
//         });
//     });

//     listItem.appendChild(copyButton);
//     credentialList.appendChild(listItem);
// }