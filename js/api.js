// API Service for Travel Planner
class TravelAPI {
    constructor() {
        this.baseURL = './api/data.json';
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Generic fetch method with caching
    async fetchData(endpoint = '') {
        const cacheKey = endpoint || 'all';
        const cached = this.cache.get(cacheKey);
        
        if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
            return cached.data;
        }

        try {
            const response = await fetch(this.baseURL);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            
            // Cache the data
            this.cache.set(cacheKey, {
                data: data,
                timestamp: Date.now()
            });
            
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }

    // Get all data
    async getAllData() {
        return await this.fetchData();
    }

    // Get all users
    async getUsers() {
        const data = await this.fetchData();
        return data.users;
    }

    // Get user by ID
    async getUserById(userId) {
        const users = await this.getUsers();
        return users.find(user => user.id === userId);
    }

    // Get all destinations
    async getDestinations() {
        const data = await this.fetchData();
        return data.destinations;
    }

    // Get destination by ID
    async getDestinationById(destinationId) {
        const destinations = await this.getDestinations();
        return destinations.find(dest => dest.id === destinationId);
    }

    // Get destination by name (for URL parameters)
    async getDestinationByName(name) {
        const destinations = await this.getDestinations();
        const normalizedName = name.toLowerCase().replace(/-/g, ' ');
        return destinations.find(dest => 
            dest.name.toLowerCase().includes(normalizedName) ||
            normalizedName.includes(dest.name.toLowerCase())
        );
    }

    // Get all trips
    async getTrips() {
        const data = await this.fetchData();
        return data.trips;
    }

    // Get trips by user ID
    async getTripsByUserId(userId) {
        const trips = await this.getTrips();
        return trips.filter(trip => trip.userId === userId);
    }

    // Get trip by ID
    async getTripById(tripId) {
        const trips = await this.getTrips();
        return trips.find(trip => trip.id === tripId);
    }

    // Get trips by status
    async getTripsByStatus(status) {
        const trips = await this.getTrips();
        return trips.filter(trip => trip.status === status);
    }

    // Get trips by region
    async getTripsByRegion(region) {
        const trips = await this.getTrips();
        return trips.filter(trip => trip.region === region);
    }

    // Get statistics
    async getStatistics() {
        const data = await this.fetchData();
        return data.statistics;
    }

    // Search destinations
    async searchDestinations(query, region = '') {
        const destinations = await this.getDestinations();
        const normalizedQuery = query.toLowerCase();
        
        return destinations.filter(dest => {
            const matchesQuery = dest.name.toLowerCase().includes(normalizedQuery) ||
                                dest.country.toLowerCase().includes(normalizedQuery) ||
                                dest.description.toLowerCase().includes(normalizedQuery);
            
            const matchesRegion = !region || dest.region === region;
            
            return matchesQuery && matchesRegion;
        });
    }

    // Get featured destinations (first 3)
    async getFeaturedDestinations() {
        const destinations = await this.getDestinations();
        return destinations.slice(0, 3);
    }

    // Get destinations by region
    async getDestinationsByRegion(region) {
        const destinations = await this.getDestinations();
        return destinations.filter(dest => dest.region === region);
    }

    // Get unique regions
    async getRegions() {
        const destinations = await this.getDestinations();
        return [...new Set(destinations.map(dest => dest.region))];
    }

    // Calculate trip statistics
    async getTripStatistics() {
        const trips = await this.getTrips();
        const total = trips.length;
        const planned = trips.filter(trip => trip.status === 'planned').length;
        const ongoing = trips.filter(trip => trip.status === 'ongoing').length;
        const completed = trips.filter(trip => trip.status === 'completed').length;

        return {
            total,
            planned,
            ongoing,
            completed
        };
    }

    // Calculate destination statistics
    async getDestinationStatistics() {
        const destinations = await this.getDestinations();
        const total = destinations.length;
        const regions = await this.getRegions();
        const totalPopulation = destinations.reduce((sum, dest) => {
            const population = parseInt(dest.population.replace(/,/g, ''));
            return sum + (isNaN(population) ? 0 : population);
        }, 0);

        return {
            total,
            regions: regions.length,
            totalPopulation: totalPopulation.toLocaleString()
        };
    }

    // Simulate adding a new trip
    async addTrip(tripData) {
        // In a real application, this would be a POST request
        // For now, we'll just return success
        console.log('Adding new trip:', tripData);
        return {
            success: true,
            message: 'Trip added successfully',
            tripId: Date.now() // Generate a temporary ID
        };
    }

    // Simulate updating a trip
    async updateTrip(tripId, tripData) {
        // In a real application, this would be a PUT request
        console.log('Updating trip:', tripId, tripData);
        return {
            success: true,
            message: 'Trip updated successfully'
        };
    }

    // Simulate deleting a trip
    async deleteTrip(tripId) {
        // In a real application, this would be a DELETE request
        console.log('Deleting trip:', tripId);
        return {
            success: true,
            message: 'Trip deleted successfully'
        };
    }

    // Simulate user authentication
    async authenticateUser(email, password) {
        const users = await this.getUsers();
        const user = users.find(u => u.email === email);
        
        if (user) {
            // In a real application, you would verify the password
            // For demo purposes, we'll accept any password
            return {
                success: true,
                user: user,
                message: 'Login successful'
            };
        } else {
            return {
                success: false,
                message: 'Invalid email or password'
            };
        }
    }

    // Simulate user registration
    async registerUser(userData) {
        // In a real application, this would be a POST request
        console.log('Registering new user:', userData);
        return {
            success: true,
            message: 'Registration successful',
            userId: Date.now() // Generate a temporary ID
        };
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
    }

    // Refresh data (clear cache and fetch fresh data)
    async refreshData() {
        this.clearCache();
        return await this.fetchData();
    }
}

// Create a global instance
const travelAPI = new TravelAPI();

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = TravelAPI;
} 