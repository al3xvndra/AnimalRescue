
## Animal Rescue

Animal Rescue is a web application designed to help families reunite with their lost pets. Users can report lost or found animals, browse existing reports, and participate in discussion threads about pet care and safety. The purpose of this project is to create a supportive community space where neighbors can help each other and pets can safely return home.

## Deployment

To deploy this project, enter the backend folder and run

```bash
docker-compose up --build
```
The backend runs on http://localhost:8080, and the frontend runs on http://localhost:5173.

## CRUD Operations

- Create: Users can submit reports for lost or found animals and create discussion threads.

- Read: All users can view reports, threads, and comments.

- Update: Users can modify reports or threads.

- Delete: Users can remove reports, threads, or comments.

## Features

Lost & Found Reports: Submit details about lost or found pets, including location, color, status, and message.

Searchable Database: Browse reports by lost or found status to help locate pets.

Threads & Comments: Discuss pet care, adoption tips, and community advice.

Responsive Design: Optimized layout for desktop and mobile screens.

## Architecture

Utilizes a relational MySQL database with tables for reports, threads, and comments. The web application's architecture facilitates efficient HTTP request handling between the React frontend and Express backend.

## Technologies

Animal Rescue was built using:

- Frontend: React, React Router, Sass

- Backend: Node.js, Express

- Database: MySQL

- Development Tools: Vite

- Packages: cors, mysql2, dotenv

## Security

The application incorporates basic security measures to handle potential vulnerabilities:

- Input validation for reports, threads, and comments to prevent empty or malformed entries.

- CORS configuration to allow requests only from the frontend URL.

- Sanitization of user-provided text to prevent simple injection attacks.
