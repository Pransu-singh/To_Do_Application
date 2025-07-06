# MERN Stack Todo Application

A full-stack Todo application built with MongoDB, Express.js, React.js, and Node.js (MERN stack). Features include user authentication, CRUD operations for todos, and deployment configuration for Render.

## Features

- User authentication (signup/login)
- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Responsive Material-UI design
- Protected routes for authenticated users

## Prerequisites

- Node.js (v14 or higher)
- MongoDB Atlas account
- npm or yarn package manager

## Project Structure

```
├── backend/             # Backend server
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── middleware/     # Custom middleware
│   └── server.js       # Server entry point
├── frontend/           # React frontend
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── contexts/   # Context providers
│   │   └── services/   # API services
│   └── package.json
└── package.json        # Root package.json
```

## Setup Instructions

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Configure environment variables:

   Backend (.env):
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_atlas_connection_string
   JWT_SECRET=your_jwt_secret
   NODE_ENV=development
   ```

   Frontend (.env):
   ```
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. Start the development servers:
   ```bash
   # From the root directory
   npm run dev
   ```

## Deployment to Render

1. Create a new account on Render (https://render.com)

2. Connect your GitHub repository to Render

3. Create two web services:
   - Backend service (Web Service)
   - Frontend service (Static Site)

4. Configure environment variables in Render dashboard:
   - Backend:
     - `MONGODB_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: A secure random string
     - `NODE_ENV`: production

   - Frontend:
     - `REACT_APP_API_URL`: Your backend service URL

5. Deploy both services using the provided `render.yaml` configuration

## API Endpoints

### Authentication
- POST `/api/auth/signup` - Register a new user
- POST `/api/auth/login` - Login user

### Todos
- GET `/api/todos` - Get all todos for authenticated user
- POST `/api/todos` - Create a new todo
- PATCH `/api/todos/:id` - Update a todo
- DELETE `/api/todos/:id` - Delete a todo

## Development

- Backend runs on: http://localhost:5000
- Frontend runs on: http://localhost:3000

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.