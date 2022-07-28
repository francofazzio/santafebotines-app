
import express from "express";
const app = express();
import http from "http";
import cors from "cors";


import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import rutas from "./routes/index.routes.js";


import dotenv from "dotenv";
dotenv.config();
const puerto = process.env.PORT;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(express.static(path.join(__dirname, "../public")));


import { Server } from "socket.io";
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
  },
});


import Mensajes from "./utils/mensages.utils.js";
const dbMsg = new Mensajes();




app.use("/api", rutas);
app.use("/*", (req, res) => {
  res.status(404).send({
    error: -2,
    descripcion: `Ruta ${req.url} con método ${req.method} aún no implementada`,
  });
});


io.on("connection", async (socket) => {
  
  console.log("Se conectó el cliente con id: ", socket.id);
  
  let arrayMensajes = await dbMsg.getAllMsgs();
  socket.emit("server:msgs", arrayMensajes);
  socket.on("client:msg", async (msgInfo) => {
    await dbMsg.addMsgToDB(msgInfo);
    arrayMensajes = await dbMsg.getAllMsgs();
    io.emit("server:msgs", arrayMensajes);
  });
  
  socket.on("disconnect", () => {
    console.log(`Se deconectó el cliente ${socket.id}`);
  });
});


server.listen(puerto, (error) => {
  try {
    console.log("El servidor está escuchando el puerto: ", puerto);
  } catch {
    console.log("Error al iniciar el server: ", error);
  }
});