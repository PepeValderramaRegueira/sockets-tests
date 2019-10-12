import io from "socket.io-client";
const socket = io("http://localhost:5001");

const emitData = (data) => {
  socket.emit("message", data);
}

const listen = () => {
  socket.on("message", data => {
    console.log("DATA REVIEVED", data);
  });
}

export { listen, emitData }
