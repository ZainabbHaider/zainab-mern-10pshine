# NoteIt - A Note Taking Website

## Tech Stack

### Frontend
- React
- React Router
- Axios
- Jest (Testing Framework)

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- Pino (Logger)
- Mocha/Chai (Testing Framework)

## Third-Party Services
- MongoDB Atlas
  
## Environment Variables

- `MONGO_URL`: Connection string for MongoDB
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Port number for the backend server

## Running the Project

### Backend

1. Navigate to the backend directory:
    ```sh
    cd Backend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the frontend directory:
    ```sh
    cd Frontend
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the frontend development server:
    ```sh
    npm start
    ```

## Running Tests

### Backend Tests

1. Navigate to the backend directory:
    ```sh
    cd Backend
    ```

2. Run the tests:
    ```sh
    npm test
    ```

### Frontend Tests

1. Navigate to the frontend directory:
    ```sh
    cd Frontend
    ```

2. Run the tests:
    ```sh
    npm test
    ```

## Additional Features and Information

- User Profile with Logout
  
#### Information:
There are three `.env` files used in the Backend for different environments:
- `.env`: Contains `PORT` and `JWT_SECRET`
- `.env.development`: Contains `MONGO_URL` for the development database
- `.env.test`: Contains `MONGO_URL` for the test database
