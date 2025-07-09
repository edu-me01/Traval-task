# Travel Planner - API Integration

This travel planning web application now uses a JSON API to fetch and display real data across all pages.

## API Structure

The application uses a JSON file (`api/data.json`) that contains:

### Users Array
- **id**: Unique user identifier
- **name**: User's full name
- **email**: User's email address
- **avatar**: Profile picture URL
- **joinDate**: When the user joined
- **totalTrips**: Number of trips created by the user

### Destinations Array
- **id**: Unique destination identifier
- **name**: Destination name (e.g., "Paris, France")
- **region**: Geographic region (Europe, Asia, Americas, Africa, Oceania)
- **country**: Country name
- **population**: City population
- **capital**: Capital city
- **area**: Area in square kilometers
- **description**: Detailed description
- **image**: High-quality image URL
- **weather**: Current weather information
- **attractions**: Array of top attractions
- **bestTime**: Best time to visit
- **currency**: Local currency
- **language**: Primary language

### Trips Array
- **id**: Unique trip identifier
- **userId**: Links to user who created the trip
- **destinationId**: Links to destination
- **name**: Trip name
- **destination**: Destination name
- **region**: Destination region
- **status**: Trip status (planned, ongoing, completed)
- **startDate**: Trip start date
- **endDate**: Trip end date
- **duration**: Trip duration
- **budget**: Trip budget
- **notes**: Trip notes
- **image**: Destination image
- **createdAt**: When trip was created

### Statistics Object
- **totalUsers**: Total number of users
- **totalDestinations**: Total number of destinations
- **totalTrips**: Total number of trips
- **totalRegions**: Number of regions covered
- **totalPopulation**: Combined population of all destinations
- **averageTripDuration**: Average trip duration
- **mostPopularRegion**: Most popular region
- **mostPopularDestination**: Most popular destination

## API Service (js/api.js)

The application includes a comprehensive API service class that provides:

### Data Fetching Methods
- `getAllData()` - Get all data
- `getUsers()` - Get all users
- `getUserById(userId)` - Get specific user
- `getDestinations()` - Get all destinations
- `getDestinationById(destinationId)` - Get specific destination
- `getDestinationByName(name)` - Get destination by name
- `getTrips()` - Get all trips
- `getTripsByUserId(userId)` - Get user's trips
- `getTripById(tripId)` - Get specific trip
- `getStatistics()` - Get statistics

### Search and Filter Methods
- `searchDestinations(query, region)` - Search destinations
- `getFeaturedDestinations()` - Get featured destinations
- `getDestinationsByRegion(region)` - Filter by region
- `getRegions()` - Get unique regions
- `getTripsByStatus(status)` - Filter trips by status
- `getTripsByRegion(region)` - Filter trips by region

### CRUD Operations
- `addTrip(tripData)` - Add new trip
- `updateTrip(tripId, tripData)` - Update trip
- `deleteTrip(tripId)` - Delete trip
- `authenticateUser(email, password)` - User login
- `registerUser(userData)` - User registration

### Utility Methods
- `getTripStatistics()` - Calculate trip statistics
- `getDestinationStatistics()` - Calculate destination statistics
- `clearCache()` - Clear API cache
- `refreshData()` - Refresh all data

## Features by Page

### Homepage (index.html)
- Displays featured destinations from API
- Shows real statistics from API
- Animated counters with real data

### Destinations (destinations.html)
- Lists all destinations from API
- Search functionality with API integration
- Filter by region (dynamically loaded)
- Real-time statistics

### Trip Details (trip-details.html)
- Shows detailed destination information
- Displays attractions and travel info
- Weather information
- Add to trips functionality

### My Trips (my-trips.html)
- Lists user's saved trips
- Filter by status and region
- Sort by various criteria
- Delete trip functionality
- Real-time statistics

### Authentication (auth.html)
- Login with API validation
- Registration with API integration
- Demo login functionality
- Form validation

## Demo Credentials

You can test the login functionality with these demo accounts:

1. **Ahmed Hassan**
   - Email: ahmed.hassan@email.com
   - Password: demo123

2. **Fatima Ali**
   - Email: fatima.ali@email.com
   - Password: demo123

3. **Omar Khalil**
   - Email: omar.khalil@email.com
   - Password: demo123

Or use the "Try Demo Login" button to automatically fill credentials.

## How to Run

1. Open any HTML file in a web browser
2. The application will automatically fetch data from the API
3. Navigate between pages to see different features
4. Try the demo login to test authentication

## Data Relationships

- Each trip belongs to a user (via `userId`)
- Each trip is linked to a destination (via `destinationId`)
- Destinations are categorized by regions
- Statistics are calculated from the actual data

## Error Handling

The application includes comprehensive error handling:
- Network errors are caught and displayed
- Loading states are shown during API calls
- User-friendly error messages
- Retry functionality for failed requests

## Caching

The API service includes intelligent caching:
- Data is cached for 5 minutes
- Reduces unnecessary API calls
- Improves performance
- Can be manually cleared if needed

## Future Enhancements

This API structure can be easily extended to include:
- Real backend integration
- User authentication tokens
- Real-time updates
- Image upload functionality
- Social features
- Booking integration 