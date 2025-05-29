# Library Management System

This project is a Library Management System built with Node.js, TypeScript, GraphQL (Apollo Server), and RESTful APIs (Express.js). It uses MongoDB for data storage and Redis for caching to improve performance.

## Features

* **GraphQL API:**
    * Provides a flexible and efficient way to manage teachers, students, and books.
    * Includes queries and mutations for creating, reading, updating, and deleting data.
    * Implements caching using Redis for frequently accessed data.
* **RESTful API:**
    * Offers traditional REST endpoints for managing teachers, students, and books.
    * Supports standard HTTP methods (GET, POST, PUT, DELETE).
* **Data Storage:**
    * Uses MongoDB to store data persistently.
    * Mongoose is used for interacting with MongoDB.
* **Caching:**
    * Implements Redis caching for frequently requested data to reduce database load and improve response times.
* **Version Control:**
    * Uses Git and GitHub for version control and collaboration.

## Technologies Used

* **Node.js:** JavaScript runtime environment.
* **TypeScript:** Statically typed superset of JavaScript.
* **Express.js:** Web application framework for Node.js.
* **Apollo Server:** GraphQL server.
* **GraphQL:** Query language for APIs.
* **MongoDB:** NoSQL database.
* **Mongoose:** MongoDB object modeling tool.
* **Redis:** In-memory data structure store used for caching.
* **dotenv:** Loads environment variables from a `.env` file.
* **Git & GitHub:** Version control and repository hosting.

## Setup

1.  **Clone the Repository:**

    ```bash
    git clone <your-github-repository-url>
    cd library-management-system
    ```

2.  **Install Dependencies:**

    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**

    * Create a `.env` file in the root directory.
    * Add your MongoDB and Redis connection strings:

    ```
    MONGODB_URI=mongodb://localhost:27017/library
    REDIS_URL=redis://127.0.0.1:6379
    ```

4.  **Run the Application:**

    ```bash
    npm run dev
    ```

    * This will start the server on `http://localhost:4000`.

5.  **Build the application for production**

    ```bash
    npm run build
    ```

6.  **Run the production build**

    ```bash
    node dist/server.js
    ```

## API Endpoints

### GraphQL

* Access the GraphQL playground at `http://localhost:4000/graphql`.
* Use the GraphQL playground to explore the schema and execute queries and mutations.

### RESTful API

* **Teachers:**
    * `GET /teachers`: Retrieve all teachers.
    * `GET /teachers/students`: Retrieve all students of a teacher.
* **Students:**
    * Similar endpoints for students.
* **Books:**
    * `GET /books/:id`: Retrieve a book by ID.
    * `GET /books/student`: Retrieve all books of a student.
    * `POST /books`: Create a new book.
    * `PUT /books/:id`: Update a book by ID.
    * `DELETE /books/:id`: Delete a book by ID.

## Caching

* Redis is used to cache frequently requested data to improve performance.
* GraphQL queries and RESTful GET endpoints are cached.

## Deployment

* The Application is configured to be deployed on <a href="[https://library-management-system-mxof.onrender.com/api-docs/#/]" target="_blank">[Render]</a>
* Ensure the Render environment variables match the .env variables.
* The start command on render is `node dist/server.js`.
* The root directory on render should be the root of the project.

## Contributing

* Feel free to contribute to this project by submitting pull requests.
