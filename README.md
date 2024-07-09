Instructions to Run the Applications

Backend (NestJS Application)
1. Clone the Repository
git clone <repository_url>

2. Install Dependencies
npm install

3. Set Up Environment Variables

Create a .env file in the root directory of the project and add the following environment variables:

DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=yourusername
DB_PASSWORD=yourpassword
DB_NAME=taskdb

4. Run the PostgreSQL Database
Ensure you have PostgreSQL installed and running. Create a database
CREATE DATABASE taskdb;

5. Start the NestJS Application
npm run start

API Endpoints

GET /tasks: Retrieve all tasks.
GET /tasks/:id: Retrieve a task by ID.
POST /tasks: Create a new task.
PUT /tasks/:id: Update a task by ID.
DELETE /tasks/:id: Delete a task by ID.


Frontend (Next.js Application)
1. Clone the Repository
git clone <repository_url>

2. Install Dependencies
npm install

3. Run the Next.js Application
npm run dev


Pages and Routes

/ : Display all tasks.
/create : Form to create a new task.
/update/[id] : Form to update an existing task.



Database Schema Design and Optimization
1. Create table
CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
2. Implement Indexes
CREATE INDEX idx_tasks_status ON tasks (status);
CREATE INDEX idx_tasks_created_at ON tasks (created_at);

3. Fetch Tasks with Pagination and Sorting
SELECT *
FROM tasks
ORDER BY status ASC, created_at DESC
LIMIT 10 OFFSET 0;
