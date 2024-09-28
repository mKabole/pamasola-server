
---

### **Server App (Node.js + SQLite)**

```markdown
# Customer Authentication Server (Node.js + SQLite)

This is the backend for the customer authentication app. It provides REST API endpoints for user registration and login. The app uses **SQLite** for storage, **bcryptjs** for password hashing, and **JWT** for user authentication.

## Features
- User registration and login functionality.
- Passwords are hashed using **bcryptjs**.
- JWT tokens are issued upon successful authentication.
- In-memory **SQLite** database for storing user data.

## Technologies Used
- **Node.js**: Backend runtime environment.
- **Express.js**: Web framework for Node.js.
- **SQLite**: In-memory database for simplicity and speed.
- **bcryptjs**: For hashing user passwords.
- **jsonwebtoken (JWT)**: For generating tokens for user sessions.
- **CORS**: To allow cross-origin resource sharing between the client and server.

## Setup Instructions

### Prerequisites
- **Node.js** and **npm** installed on your machine.

### 1. Clone the repository
```bash
git clone <repository-url>
cd customer-auth-backend
