# Live Polling and Chat Application

A real-time interactive polling and chat application designed for educational settings, enabling teachers to create polls and interact with students through live chat.

## Features

### For Teachers
- Create and manage live polls with multiple-choice questions
- Set time limits for poll responses (30, 60, or 90 seconds)
- View real-time poll results with visual progress bars
- Monitor student participation
- Access poll history
- Manage student participation (kick students if needed)
- Real-time chat with students

### For Students
- Join polls using their name
- Submit answers to live polls
- View real-time poll results
- Participate in live chat
- See countdown timer for each question
- View correct answers after submission

## Tech Stack

### Frontend
- React.js
- Vite (Build tool)
- TailwindCSS (Styling)
- Socket.IO Client (Real-time communication)
- React Router (Navigation)
- React Icons

### Backend
- Node.js
- Express.js
- Socket.IO (WebSocket server)
- CORS

## Installation

1. Clone the repository

```bash
git clone <repository-url>
cd live-polling-and-chat
```

2. Install dependencies for both client and server

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Running the Application

1. Start the server

```bash
cd server
npm start
```

2. Start the client

```bash
cd client
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:4000

## Usage

### Teacher Interface
1. Access the teacher interface at `/teacher`
2. Create a new poll by:
   - Entering your question
   - Adding multiple choice options
   - Marking the correct answer
   - Setting a time limit
3. Monitor real-time results as students respond
4. Use the chat feature to communicate with students
5. View poll history to track previous questions and responses

### Student Interface
1. Access the student interface at `/student`
2. Enter your name to join
3. Wait for the teacher to start a poll
4. Submit your answer within the time limit
5. View results and correct answers
6. Participate in the class chat

## Environment Setup

The application uses environment variables for configuration. Create `.env` files in both client and server directories if needed.

### Client Environment Variables
```env
VITE_SOCKET_SERVER_URL=http://localhost:4000
```

### Server Environment Variables
```env
PORT=4000
CLIENT_URL=http://localhost:5173
```
