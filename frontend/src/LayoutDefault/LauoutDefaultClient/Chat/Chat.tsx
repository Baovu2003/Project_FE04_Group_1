import React, { useEffect, useState } from 'react';
import { Input, Button, List, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import axios from 'axios'; // Import axios for API calls
import socket from "../Chat/socket"; // Assuming socket is exported from this file
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

function Chat() {
  const [messages, setMessages] = useState<any[]>([]); // Store messages with user info
  const [newMessage, setNewMessage] = useState<string>(''); // Track new message input
  const user = useSelector((state: RootState) => state.UserReducer);

  const userId = user && user.user._id;

  const fetchMessages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/chat', {
        withCredentials: true // This allows Axios to send cookies with the request
      });
      
      setMessages(response.data.chat); // Assuming the API returns { chat: [...] }
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const messageData = { content: newMessage, userId }; // Prepare message data
      setMessages((prevMessages) => [...prevMessages, messageData]); // Add message to the list
      socket.emit("CLIENT_SENDING_DATA", messageData); // Emit message to server
      setNewMessage(''); // Clear input after sending
    }
  };

  useEffect(() => {
    fetchMessages(); // Fetch messages from API on mount

    // Listen for messages from the server
    socket.on("SERVER_SENDING_DATA", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]); // Add received message
    });

    // Clean up socket event listeners on unmount
    return () => {
      socket.off("SERVER_SENDING_DATA");
    };
  }, []);

  return (
    <Card
      style={{ width: 400, height: 500, margin: '0 auto' }}
      title="Chat Room"
      bordered={false}
    >
      <div style={{ height: 300, overflowY: 'auto', marginBottom: 16 }}>
        <List
          dataSource={messages}
          renderItem={(msg, index) => (
            <List.Item key={index}>
              <Card style={{ width: '100%' }}>
                <p><strong>{msg.inforUser?.fullName || 'Guest'}:</strong> {msg.content}</p>
              </Card>
            </List.Item>
          )}
        />
      </div>
      
      <Input.Group compact>
        <Input
          style={{ width: 'calc(100% - 80px)' }}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button
          type="primary"
          icon={<SendOutlined />}
          onClick={handleSendMessage}
          style={{ width: '80px' }}
        >
          Send
        </Button>
      </Input.Group>
    </Card>
  );
}

export default Chat;
