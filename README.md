# MERN Authentication Template

This is a MERN (MongoDB, Express.js, React, Node.js) authentication template that demonstrates how user authentication works in a MERN stack application using JWT (JSON Web Tokens) and bcryptjs for password hashing. This template provides a basic structure and functionality for user registration, login, authentication and profile update, which you can use as a starting point for building your own secure web applications.

## Features

- User registration with validation.
- User login with authentication and JWT token generation.
- Secure password hashing using bcryptjs.
- MongoDB integration for storing user data.
- React frontend with form validation and error handling (To be added...)

## Prerequisites

Before getting started, ensure you have the following dependencies installed on your system:

- Node.js and npm: Make sure you have Node.js and npm installed on your machine. You can download them from [nodejs.org](https://nodejs.org/).

- MongoDB: You should have MongoDB installed and running. You can download and install MongoDB from [mongodb.com](https://www.mongodb.com/).

## Getting Started

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/harsh661/mern-auth.git
   ```
2. Change into project directory

    ```bash
    cd mern-auth
    ```
3. Install dependencies

    ```bash
    npm install
    ```
4. Rename .env-example to .env and add following content:

    ```js
    NODE_ENV=development
    PORT=5000
    MONGODB_URI=your-mongodb-connection-string
    JWT_SECRET=your-secret-key
    ```
5. Start server:

    ```bash
    npm run devStart
    ```

