import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import authRouter from "./routes/auth.js";
import uploadRouter from "./routes/upload.js";
import projectRouter from "./routes/project.js";
import { Server } from 'socket.io';
import http from 'http';

mongoose.set('strictQuery', false);

dotenv.config();
const app = express();
app.use(express.json());
// app.use(helmet());
// app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/api", authRouter);
app.use("/api", uploadRouter);
app.use("/api", projectRouter);
app.use('/api/files', express.static('public/uploads'));


const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

