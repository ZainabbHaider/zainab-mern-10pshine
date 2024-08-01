# NoteIt - A Note Taking Website

## Overview
**NoteIt** is a web-based application for taking and organizing notes. It is built using the MERN stack (MongoDB, Express, React, Node.js) as part of an internship project with 10Pearls.

## Features
- User Authentication (Register, Login, Logout)
- Dashboard (List of Notes)
- Create, Read, Update, Delete operations for notes
- User Profile with Logout

## Getting Started

### Prerequisites
- Node.js (v12 or higher)
- MongoDB (local or cloud)
- Git

### Installation

1. **Clone the repository**:
    ```sh
    git clone https://github.com/your-username/noteit.git
    cd noteit
    ```

2. **Install server dependencies**:
    ```sh
    cd ../Backend
    npm install
    ```

3. **Install client dependencies**:
    ```sh
    cd ../Frontend
    npm install
    ```

### Setting Up Environment Variables

1. **Create a `.env` file for the backend**:
    ```sh
    cd ../Backend
    touch .env.development
    ```

2. **Open the `.env` file and fill in the required values**:
    ```plaintext
    MONGO_URL=your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    PORT=5000
    ```

### Running the Application

1. **Start the backend server**:
    ```sh
    cd ../Backend
    npm start
    ```

2. **Start the frontend development server**:
    ```sh
    cd ../Frontend
    npm start
    ```

3. **Open your browser and navigate to**:
    ```
    http://localhost:5173
    ```

### Running Tests

1. **Run frontend tests**:
    ```sh
    cd ../Frontend
    npm test
    ```

2. **Run backend tests**:
    ```sh
    cd ../Backend
    npm test
    ```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

**NoteIt** is developed as an internship project with [10Pearls](https://10pearls.com/).
