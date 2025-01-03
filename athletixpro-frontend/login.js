const fs = require('fs');
const path = require('path');

// ...existing code...

function loginUser(username, password) {
    const usersFilePath = path.join(__dirname, 'mock_users.json');
    const usersData = JSON.parse(fs.readFileSync(usersFilePath, 'utf8'));

    const user = usersData.find(user => user.username === username && user.password === password);

    if (user) {
        // Save username in session storage
        sessionStorage.setItem('username', username);
        // Redirect to home page
        window.location.href = '/home';
    } else {
        // Show registration popup
        alert('Utente non trovato. Si prega di registrarsi.');
    }
}

// ...existing code...
