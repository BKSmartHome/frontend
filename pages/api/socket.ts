import http from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";

let io: Server;

export const config = {
  api: {
    bodyParser: false,
  },
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (!io) {
    const server = http.createServer((_, response) => {
      response.writeHead(200);
      response.end("socket.io");
    });
    io = new Server(server);
    server.listen(3001);
  }

  io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("message", (message) => {
      console.log(message);
    });
    socket.on("temperature", (payload) => {
      console.log(payload);
    });
    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });

  res.statusCode = 200;
  res.end();
};
