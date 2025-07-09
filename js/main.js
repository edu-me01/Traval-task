// Utility functions
function showLoading() {
    document.body.classList.add('loading');
}

function hideLoading() {
    document.body.classList.remove('loading');
}

function showAlert(title, text, icon) {
    Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: 'OK'
    });
}

// Check if user is logged in
function checkAuth() {
    const user = localStorage.getItem('travelPlannerUser');
    const authLinks = document.querySelectorAll('.auth-link');
    
    authLinks.forEach(link => {
        if (user) {
            if (link.id === 'logoutBtn') {
                link.style.display = 'block';
            } else {
                link.style.display = 'none';
            }
        } else {
            if (link.id === 'logoutBtn') {
                link.style.display = 'none';
            } else {
                link.style.display = 'block';
            }
        }
    });
}

// Logout function
function logout() {
    localStorage.removeItem('travelPlannerUser');
    showAlert('Logged Out', 'You have been successfully logged out.', 'success');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 1500);
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    checkAuth();
    
    // Add logout event listener if logout button exists
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', logout);
    }
});