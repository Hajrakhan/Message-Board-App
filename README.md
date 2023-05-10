## Message Board Application
This is a web application that allows users to post messages on a message board. The application includes a register/login module and features that allow users to create, read, update, and delete their own posts. 
The application is implemented using Angular for the frontend and Spring Boot with H2 database for the backend.
## Installation
To install and run this application on your local machine, follow the steps below:
1. Clone the repository from GitHub:
git clone -b message-board-frontend https://github.com/Hajrakhan/Message-Board-App.git
2. Change into the project directory:
cd message-board-app
3. Install the necessary dependencies for the frontend:
npm install --force
4. Start the frontend:
ng serve --open
5. for backend Clone the repository from GitHub:
git clone -b message-board-backend https://github.com/Hajrakhan/Message-Board-App.git2
2. Import the project in STS as maven existing project
3. Run the project as spring boot project.
4. The frontend will be accessible at the backend will be accessible at `http://localhost:9090`.
The frontend will be accessible at `http://localhost:4200` and the backend will be accessible at `http://localhost:9090`.
## Usage
### Register/Login Module
The register and login modules can be accessed by clicking on the "Register" and "Login" buttons respectively on the homepage.
### Post Creation
To create a post, click on the "New Post" button on the homepage. Enter your message in the input field and click on the "Post" button to submit the message.
### Post Editing/Deletion
Users can edit or delete their own posts by clicking on the "Edit" or "Delete" buttons respectively next to their post on the homepage.
### Viewing All Posts
All posts can be viewed on the homepage.
