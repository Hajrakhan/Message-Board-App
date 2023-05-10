# Message Board Application

This is a message board application that allows users to post messages and view other users' messages. Users can register and login to the application and can edit and delete their own posts.

## Technologies Used
- Spring Boot for backend development
- H2 database for data storage
## Installation
To install and run this application on your local machine, follow the steps below:
1. Clone the repository from GitHub:

           git clone -b message-board-backend https://github.com/Hajrakhan/Message-Board-App.git2

2. Import the project in STS as maven existing project
3. Run the project as spring boot project.
4. The frontend will be accessible at the backend will be accessible at `http://localhost:9090`.
## Usage
## Features
- User registration and login
- Add, edit and delete messages
- View all messages
- Real-time updates without page refresh implemented for addPost only.
## API Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login to the application
- `GET /api/post/getAllPost` - Get all messages
- `PUT /api/ post /updatePost/{id}` - Update an existing message
- `DELETE / post /deletePostById/{id}` - Delete a message
- `POST / post /addPost` - Add a new message
## Tests
- Unit tests for the backend application are available in the `src/test/java` directory
