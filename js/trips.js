// Trips functionality using local API
// This file provides utility functions for trips

// Display saved trips (legacy function for compatibility)
function displaySavedTrips() {
    const savedTrips = JSON.parse(localStorage.getItem('savedTrips')) || [];
    const container = document.getElementById('savedTripsGrid');
    const noTripsAlert = document.getElementById('noTripsAlert');
    
    if (savedTrips.length === 0) {
        if (noTripsAlert) noTripsAlert.style.display = 'block';
        if (container) container.innerHTML = '';
        return;
    }
    
    if (noTripsAlert) noTripsAlert.style.display = 'none';
    if (container) container.innerHTML = '';
    
    savedTrips.forEach(trip => {
        const card = document.createElement('div');
        card.className = 'col';
        card.innerHTML = `
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${trip.country}</h5>
                    <p class="card-text">Saved on ${new Date(trip.dateAdded).toLocaleDateString()}</p>
                    <a href="trip-details.html?country=${trip.country}" class="btn btn-primary me-2">View</a>
                    <button class="btn btn-outline-danger remove-trip-btn" data-country="${trip.country}">Remove</button>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
    
    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-trip-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const countryName = this.getAttribute('data-country');
            removeTrip(countryName);
        });
    });
}

// Remove trip from saved trips
function removeTrip(countryName) {
    let savedTrips = JSON.parse(localStorage.getItem('savedTrips') || '[]');
    savedTrips = savedTrips.filter(trip => trip.country !== countryName);
    localStorage.setItem('savedTrips', JSON.stringify(savedTrips));
    showAlert('Trip Removed', `${countryName} has been removed from your trips.`, 'success');
    displaySavedTrips();
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

// Calculate trip duration
function calculateTripDuration(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Format currency
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

// Initialize trips functionality
document.addEventListener('DOMContentLoaded', function() {
    // This file now only provides utility functions
    // The main functionality is handled by the individual HTML pages
    console.log('Trips utility functions loaded');
});