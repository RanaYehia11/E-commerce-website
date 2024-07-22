document.addEventListener('DOMContentLoaded', function() {
    // Get Data From local storage
    let getuserName = localStorage.getItem('userName');
    let getemail = localStorage.getItem('email');

    // Variables
    let userInput = document.getElementById('changeName');
    let userEmailInput = document.getElementById('changeEmail');
    let editform = document.getElementById('editProfileForm');

    // Ensure elements exist before using them
    if (userInput && userEmailInput && editform ) {
        // Setting values of input fields
        userInput.value = getuserName || '';  // Provide a default empty string if null
        userEmailInput.value = getemail || '';  // Provide a default empty string if null

        // Events
        editform.addEventListener('submit', editProfileData);
       
    } else {
        console.error('One or more elements not found');
    }

    function editProfileData(e) {
        e.preventDefault();
        localStorage.setItem('userName', userInput.value);
        localStorage.setItem('email', userEmailInput.value);
        window.location = 'profile.html';  // Redirect to profile page after saving
    }

    
});
