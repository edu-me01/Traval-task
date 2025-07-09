// Destinations functionality using local API
// This file provides utility functions for destinations

// Save trip to localStorage (legacy function for compatibility)
function saveTrip(countryName) {
    const user = localStorage.getItem('travelPlannerUser');
    
    if (!user) {
        showAlert('Login Required', 'Please login to save trips.', 'warning');
        setTimeout(() => {
            window.location.href = 'auth.html';
        }, 1500);
        return;
    }
    
    let savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    
    // Check if already saved
    if (savedTrips.some(trip => trip.country === countryName)) {
        showAlert('Already Saved', 'This destination is already in your trips.', 'info');
        return;
    }
    
    savedTrips.push({
        country: countryName,
        dateAdded: new Date().toISOString()
    });
    
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
    showAlert('Trip Saved', `${countryName} has been added to your trips.`, 'success');
}

// Utility function to show alerts
function showAlert(title, message, type = 'info') {
    if (typeof Swal !== 'undefined') {
        Swal.fire({
            title: title,
            text: message,
            icon: type,
            confirmButtonText: 'OK'
        });
    } else {
        alert(`${title}: ${message}`);
    }
}

// Utility function to show loading state
function showLoading() {
    const loadingElements = document.querySelectorAll('.loading-spinner');
    loadingElements.forEach(element => {
        element.style.display = 'flex';
    });
}

// Utility function to hide loading state
function hideLoading() {
    const loadingElements = document.querySelectorAll('.loading-spinner');
    loadingElements.forEach(element => {
        element.style.display = 'none';
    });
}

// Format population numbers
function formatPopulation(population) {
    if (population >= 1000000) {
        return (population / 1000000).toFixed(1) + 'M';
    } else if (population >= 1000) {
        return (population / 1000).toFixed(1) + 'K';
    }
    return population.toString();
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

// Get status badge class
function getStatusBadgeClass(status) {
    switch (status) {
        case 'planned':
            return 'bg-primary';
        case 'ongoing':
            return 'bg-warning';
        case 'completed':
            return 'bg-success';
        default:
            return 'bg-secondary';
    }
}

// Get region badge class
function getRegionBadgeClass(region) {
    const regionColors = {
        'Europe': 'bg-primary',
        'Asia': 'bg-success',
        'Americas': 'bg-info',
        'Africa': 'bg-warning',
        'Oceania': 'bg-secondary'
    };
    return regionColors[region] || 'bg-secondary';
}

// Initialize destinations functionality
document.addEventListener('DOMContentLoaded', function() {
    // This file now only provides utility functions
    // The main functionality is handled by the individual HTML pages
    console.log('Destinations utility functions loaded');
});