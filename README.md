
# Fitness Backend API

![Node.js](https://img.shields.io/badge/Node.js-v14.17.0-green)
![Express](https://img.shields.io/badge/Express-v4.17.1-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-v4.4.6-green)

## 📚 Overview

The **Fitness Backend API** is a simple authentication system built using **Node.js**, **Express**, and **MongoDB**. This backend handles user registration and login functionality, which will eventually serve as the foundation for managing workouts, exercises, and fitness tracking in the future.

Currently, it provides user authentication using **JWT** (JSON Web Tokens). Additional features such as workout management, progress tracking, and more are open for contributions.

## 🚀 Features

- **User Registration**: Allows users to register with their details.
- **User Login**: Users can log in to receive a JWT token for authenticated access.
- **JWT Authentication**: Securely handles access to protected routes.

## 🛠️ Technologies Used

- **Node.js**: JavaScript runtime for server-side logic.
- **Express.js**: Minimal web framework for building the API.
- **MongoDB**: NoSQL database to store user data.
- **Mongoose**: MongoDB object data modeling (ODM) for Node.js.
- **JWT**: Used for secure token-based authentication.

## ⚙️ Setup and Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14.17.0 or higher)
- [MongoDB](https://www.mongodb.com/) (local or cloud instance)

### Steps to Run the Project

1. **Clone the repository**:

   ```bash
   git clone https://github.com/zaid-commits/Fitness-Backend.git
   cd Fitness-Backend
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Create a `.env` file** with the following environment variables:

   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the server**:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:5000`.

## 📂 API Endpoints

Here are the available API endpoints for authentication:

### Authentication

- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Log in a user.

Example of a response on successful login:
```json
{
  "token": "your_jwt_token"
}
```

Protected routes can be accessed using this token for future functionalities.

## 🏗️ Future Enhancements

Currently, this project only handles user authentication. Here are some features that can be added:

- **Workouts**: CRUD operations for workout tracking.
- **Exercises**: Manage exercises related to the user's fitness goals.
- **Progress Tracking**: Visualize user progress over time.
- **Goal Setting**: Allow users to set and track fitness goals.

Feel free to contribute by implementing any of the above features!

## 🤝 Contributing

Contributions are welcome! If you would like to enhance this project with additional features, please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/new-feature`).
3. Commit your changes (`git commit -m 'Add feature X'`).
4. Push to the branch (`git push origin feature/new-feature`).
5. Open a pull request for review.

## 📄 License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.
