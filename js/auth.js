// Handle login form submission
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Simple validation
    if (!email || !password) {
        showAlert('Error', 'Please fill in all fields', 'error');
        return;
    }
    
    // In a real app, you would validate against a backend
    localStorage.setItem('travelPlannerUser', JSON.stringify({
        email,
        name: 'Test User' // Normally you'd get this from your backend
    }));
    
    showAlert('Login Successful', 'You are now logged in.', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});

// Handle registration form submission
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    // Simple validation
    if (!name || !email || !password) {
        showAlert('Error', 'Please fill in all fields', 'error');
        return;
    }
    
    if (password.length < 6) {
        showAlert('Error', 'Password must be at least 6 characters', 'error');
        return;
    }
    
    // In a real app, you would send this to a backend
    localStorage.setItem('travelPlannerUser', JSON.stringify({
        email,
        name
    }));
    
    showAlert('Registration Successful', 'You are now registered and logged in.', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
});