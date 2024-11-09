import io from "socket.io-client";

// Ensure this URL is correct
const socket = io("http://localhost:5000");

export default socket;
