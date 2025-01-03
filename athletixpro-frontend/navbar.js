// ...existing code...

document.addEventListener('DOMContentLoaded', () => {
    const username = sessionStorage.getItem('username');
    const loginButton = document.getElementById('loginButton');
    const navbar = document.getElementById('navbar');

    if (username) {
        // Replace login button with logout button
        const logoutButton = document.createElement('button');
        logoutButton.textContent = 'Logout';
        logoutButton.id = 'logoutButton';
        logoutButton.addEventListener('click', () => {
            sessionStorage.removeItem('username');
            window.location.href = '/login';
        });
        navbar.replaceChild(logoutButton, loginButton);
    }
});

// ...existing code...
