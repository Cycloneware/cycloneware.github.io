// Initialize Google API
function onSignIn(googleUser) {
    try {
        const profile = googleUser.getBasicProfile();
        console.log("Logged in as: " + profile.getName());

        if (profile) {
            // Update UI on successful login
            document.getElementById('login-button').style.display = 'none';
            document.getElementById('logout-button').style.display = 'block';
            document.getElementById('user-info').textContent = `Welcome, ${profile.getName()}!`;
            document.getElementById('user-info').style.display = 'block';

            // Save user information to session storage
            sessionStorage.setItem('userName', profile.getName());
            sessionStorage.setItem('userEmail', profile.getEmail());

            // Redirect to the dashboard
            window.location.href = 'dashboard.html';
        } else {
            throw new Error('Profile data is null.');
        }
    } catch (error) {
        console.error('Login failed: ', error);
        alert('Login failed. Please try again.');
    }
}

// Logout function
function signOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');

        // Update UI for logout
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';
        document.getElementById('user-info').textContent = '';
        document.getElementById('user-info').style.display = 'none';

        // Clear session storage
        sessionStorage.clear();
    });
}

// Check login state on page load
window.onload = function () {
    const userName = sessionStorage.getItem('userName');
    if (userName) {
        // User is logged in
        document.getElementById('login-button').style.display = 'none';
        document.getElementById('logout-button').style.display = 'block';
        document.getElementById('user-info').textContent = `Welcome, ${userName}!`;
        document.getElementById('user-info').style.display = 'block';
    } else {
        // User is not logged in
        document.getElementById('login-button').style.display = 'block';
        document.getElementById('logout-button').style.display = 'none';
        document.getElementById('user-info').style.display = 'none';
    }
};
