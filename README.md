# Social Networking Platform API

This is a social networking platform that allows users to register, login, send and accept friend requests, and manage their profiles. The platform also offers friend recommendations based on mutual friends and common interests.

## Features

### 1. **User Authentication**
- **Sign Up**: Users can create an account with a unique username and password.
- **Login**: Secure login functionality using JWT tokens.
- **Authentication**: User sessions are protected using JWT (JSON Web Tokens).

### 2. **Home Page**
- Display the list of all users.
- A search bar to search for users and friends.
- Option to unfriend users.

### 3. **Friend Management**
- **Search Users**: Users can search for other registered users.
- **Send Friend Requests**: Users can send and receive friend requests.
- **Accept/Reject Requests**: Users can accept or reject incoming friend requests.
- **Friend List**: Display a list of friends added with an option to unfriend them.

### 4. **Friend Recommendation System**
- **Mutual Friends**: Suggest friends based on mutual connections.
- **Common Interests (Optional)**: Recommendations can be based on common interests.
- **Recommendations**: Show recommended friends on the user’s dashboard.

---

## API Routes

### Authentication Routes (`/api/v1/auth`)
- **POST `/signup`**: Register a new user with a unique username and password.
- **POST `/login`**: Log in an existing user and provide a JWT token.
- **GET `/logout`**: Log out the user (invalidate the JWT token).
- **GET `/me`**: Get the profile details of the authenticated user.

### Profile Management Routes (`/api/v1/profile`)
- **GET `/me`**: Get the profile of the authenticated user.
- **GET `/:id`**: Get a user's profile by ID.
- **PUT `/update/:id`**: Update the user’s profile, including username, bio, interests, and profile picture.
- **DELETE `/delete/:id`**: Delete the user profile.

### Friend Request Routes (`/api/v1/friend-request`)
- **GET `/requests`**: Get all incoming friend requests.
- **GET `/sent-requests`**: Get all sent friend requests.

### Friend Management Routes (`/api/v1/friend-management`)
- **POST `/send-request`**: Send a friend request to another user.
- **POST `/accept-request`**: Accept a friend request.
- **POST `/reject-request`**: Reject a friend request.
- **GET `/friend-list`**: Get the list of friends.
- **DELETE `/unfriend`**: Remove a friend (unfriend).

### Friend Recommendation Routes (`/api/v1/friend-recommendation`)
- **GET `/recommendations`**: Get friend recommendations based on mutual friends and common interests.

### User Management Routes (`/api/v1/user`)
- **GET `/`**: Get the list of all users.
- **GET `/:id`**: Get a user’s profile by ID.

---


### Prerequisites
- Node.js (v14 or above)
- MongoDB (Local or Cloud database)
- Postman or any API testing tool to test routes

<img width="1470" alt="Screenshot 2025-01-11 at 11 04 06 PM" src="https://github.com/user-attachments/assets/65899eb4-5d8f-4fe5-b3fe-3e921f68655c" />
<img width="1462" alt="Screenshot 2025-01-11 at 11 03 37 PM" src="https://github.com/user-attachments/assets/26b60b30-d934-4086-913f-0da882129000" />
<img width="1470" alt="Screenshot 2025-01-11 at 11 03 00 PM" src="https://github.com/user-attachments/assets/7820e84f-729c-48bc-9f92-83e07c730930" />
<img width="1465" alt="Screenshot 2025-01-11 at 11 01 57 PM" src="https://github.com/user-attachments/assets/e2e7e07a-e7e0-4a79-986a-f99afbf46617" />


<img width="1466" alt="Screenshot 2025-01-11 at 11 01 27 PM" src="https://github.com/user-attachments/assets/3a3567b2-9240-4219-95dd-e35f83980cbc" />


 

