const express = require('express');
const http = require('http');

const cors = require('cors');
const socketIo = require('socket.io');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  },
});

let currQues = null;
let students = [];


let correctAnswer = '';
let pollResults = {};


io.on('connection', (socket) => {
  console.log('User connected');


  socket.on('setName', (name) => {
    students.push({ id: socket.id, name });
    io.emit('students', students.map(student => student.name));
  });


  socket.on('submitQuestion', (questionData) => {
    currQues = questionData;
    correctAnswer = questionData.correctOption;
    pollResults = questionData.options.reduce((acc, option) => {
      acc[option] = 0;
      return acc;
    }, {});
    io.emit('question', questionData);
  });


  socket.on('submitAnswer', (answer) => {
    if (pollResults.hasOwnProperty(answer)) {
      pollResults[answer]++;
    }
    io.emit('pollResults', pollResults);
  });




  socket.on('kickStudent', (studentName) => {
    const student = students.find(s => s.name === studentName);
    if (student) {
      io.to(student.id).emit('kicked');
      students = students.filter(s => s.id !== student.id);
      io.emit('students', students.map(student => student.name));
    }
  });


  
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
    students = students.filter(s => s.id !== socket.id);
    io.emit('students', students.map(student => student.name));
  });

  setInterval(() => {
    if (currQues) {
      io.emit('correctAnswer', correctAnswer);
    }
  }, 60000); 
});

server.listen(4000, () => 
  console.log('!!Server is live on port 4000!!')
);
