import io from "socket.io-client";

// Ensure this URL is correct
const socket = io("http://localhost:5000",{
    withCredentials: true,
    transports: ['websocket'], // Optional but ensures websocket is used
});

export default socket;
