# EmployWise User Management System

## Project Overview
This React application integrates with the Reqres API to perform basic user management functions, including authentication, user listing, and CRUD operations on users.

## Features
### Level 1: Authentication Screen
- Users can log in using the following credentials:
  - **Email**: eve.holt@reqres.in
  - **Password**: cityslicka
- On successful login, the token is stored in local storage and the user is redirected to the Users List page.
- API Endpoint: `POST /api/login`

### Level 2: List All Users
- Displays a paginated list of users fetched from the Reqres API.
- Users are displayed with their first name, last name, and avatar.
- Supports pagination or lazy loading.
- API Endpoint: `GET /api/users?page=1`

### Level 3: Edit, Delete, and Update Users
- **Edit**: Opens a form pre-filled with the user’s data to update their first name, last name, and email.
  - API Endpoint: `PUT /api/users/{id}`
- **Delete**: Removes a user from the list.
  - API Endpoint: `DELETE /api/users/{id}`
- Displays success or error messages based on API responses.

## Technologies Used
- **Frontend Framework**: ReactJS
- **State Management**: React Hooks (useState, useEffect, useContext) / Redux (Optional)
- **UI Styling**: Custom CSS
- **HTTP Requests**: Axios / Fetch API
- **Routing**: React Router
- **Persistence**: Local Storage / Session Storage

## Installation and Setup
### Prerequisites
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- npm or yarn

### Steps to Run the Project
1. **Clone the repository**
   ```sh
   git clone https://github.com/iaryasharma/employwise-user-management.git
   cd employwise-user-management
   ```
2. **Install dependencies**
   ```sh
   npm install
   # or
   yarn install
   ```
3. **Start the development server**
   ```sh
   npm start
   # or
   yarn start
   ```
4. **Access the application**
   - Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure
```
/employwise-user-management
│── src/
│   ├── components/    # Reusable React components
│   │   ├── Login.js
│   │   ├── UserCard.js
│   │   ├── UserList.js
│   │   ├── UserModal.js
│   ├── services/      # API calls using Axios
│   │   ├── api.js
│   │   ├── authService.js
│   ├── styles/        # CSS files for components
│   │   ├── Login.css
│   │   ├── UserCard.css
│   │   ├── UserList.css
│   │   ├── UserModal.css
│   ├── App.js         # Main application component
│   ├── index.js       # Entry point
│── public/            # Static assets
│── package.json       # Project dependencies
│── README.md          # Documentation
```

## Assumptions and Considerations
- The authentication flow assumes that a successful login returns a token, which is stored in local storage.
- Error handling is implemented to display meaningful error messages to users.
- The user list is fetched using pagination to optimize performance.
- The edit and delete operations assume that the API responds with appropriate success or error messages.
- React Router is used for navigation between Login, User List, and Edit User pages.

## Error Handling
- Displays meaningful error messages for API failures.
- Validates user input in login and edit screens.
- Redirects to login if the token is missing or expired.

## Additional Enhancements (Bonus Features)
- **Client-side search and filtering** for the users list.
- **Navigation using React Router** (Login, User List, Edit User).

## Deployment
To deploy the application:
```sh
npm run build
# Deploy to Vercel, Netlify, or GitHub Pages
```



