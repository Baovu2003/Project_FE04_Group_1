import React, { useEffect, useRef, useState } from 'react';
import { Button, Input } from 'antd';
import { SendOutlined, SmileOutlined } from '@ant-design/icons';
import "./ChatBox.css"
import { useSelector } from 'react-redux';
import { io, Socket } from 'socket.io-client';
import EmojiPicker, { SkinTones } from "emoji-picker-react";
import { Account, ChatV2, Message, User } from '../../../actions/types';
import { RootState } from '../../../store/store';
import { get } from '../../../Helpers/API.helper';
import moment from 'moment';

interface ChatBoxProps {

    chat?: ChatV2;  // Chat can be undefined initially
    currentUser: string


}
interface OnlineUserReturn {
    userId: string;
    socketId: string;
    lastActiveTime?: string;
}
interface EmojiClickData {
    activeSkinTone: SkinTones;
    unified: string;
    unifiedWithoutSkinTone: string;
    emoji: string;
    names: string[];
}

const ChatBox: React.FC<ChatBoxProps> = ({ chat, currentUser }) => {
    console.log(chat)

    const socket = useRef<Socket>();


    const chatId = chat?._id
    const [messages, setMessages] = useState<Message[]>([]);
    const [newMessage, setNewMessage] = useState("");
    const [sendMessage, setSendMessage] = useState<object>({});
    const [onlineUsers, setOnlineUsers] = useState<OnlineUserReturn[]>([]);
    const [userData, setUserData] = useState<Account | User | null>(null);
    const [showPicker, setShowPicker] = useState(false);

    const user = useSelector((state: RootState) => state.UserReducer);
    // const userId = user && user.user._id ? user.user._id : "";
    const account = useSelector((state: RootState) => state.AccountReducer);
    const accountId = account && account.accountInAdmin ? account.accountInAdmin._id : "";
    const idMemberDifference = chat?.members?.find(member => member !== currentUser);

    // const [isTyping, setIsTyping] = useState<string | null>(null);
    // const [isTypingId, setIsTypingId] = useState<string | null>(null);
const notificationSound = useRef(new Audio('/sound/nhac_chuong_messenger_iphone-www_tiengdong_com.mp3'));

    const chatBody = document.querySelector(".chat-body");

        // Hàm để phát âm thanh khi người dùng nhấn vào nút
    useEffect(() => {

        if (chatBody) {
            chatBody.scrollTop = chatBody.scrollHeight;
        }
    }, [messages]);

    useEffect(() => {
        const getUserData = async () => {
            const otherMember = chat?.members.find((member: string) => member !== currentUser); // Moved outside the function

            console.log(otherMember)
            try {
                if (accountId) {
                    console.log("Vô user info")
                    const response = await get(`http://localhost:5000/user/info/${otherMember}`)

                    setUserData(response.detailUser)
                } else {
                    console.log("Vô admin")
                    const response = await get(`http://localhost:5000/admin/auth/account/${otherMember}`)
                    setUserData(response.detailAccount)
                }
            }
            catch (error) {
                console.log(error)
            }
        }

        getUserData();
    }, [idMemberDifference])
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await get(`http://localhost:5000/message/${chat?._id}`);
                console.log(response)
                setMessages(response.Message);
            } catch (error) {
                console.log(error);
            }
        };

        if (chat) fetchMessages();
    }, [chat]);

    // const handleTyping = () => {
    //     console.log("Đã vô")

    //     if (chatBody) {
    //         chatBody.scrollTop = chatBody.scrollHeight;
    //     }
    //     if (socket.current) {
    //         const senderId = userId || accountId;
    //         const accountTyping = user?.user.fullName || account?.accountInAdmin.fullName;
    //         socket.current.emit("client-typing", { senderId, accountTyping });
    //     }
    // };

    // useEffect(() => {
    //     if (socket.current) {
    //         socket.current.on("server-typing", (data, content) => {
    //             console.log(content)
    //             console.log(data)
    //             console.log(isTyping)
    //             if (content === "hidden") {
    //                 console.log("Hidden rooif mà")
    //                 setIsTyping(null);
    //                 setIsTypingId(null);
    //             } else {
    //                 console.log("show rooif mà")
    //                 setIsTyping(data.accountTyping);
    //                 setIsTypingId(data.senderId);
    //             }

    //             console.log(isTyping)
    //         });
    //     }
    //     console.log("isTyping", isTyping)
    // }, []);
    const handleSendMessage = async () => {
        if (newMessage.trim()) {
            const messageData = { chatId: chatId, senderId: currentUser, text: newMessage };
            console.log(messageData)
            setSendMessage({ ...messageData });
            setNewMessage("");
            setShowPicker(false);
        }
    };
    const onEmojiClick = (emojiData: EmojiClickData) => {
        setNewMessage(prevMessage => prevMessage + emojiData.emoji); // Append emoji to message
    };
    useEffect(() => {
        if (socket.current && sendMessage !== null) {
            socket.current.emit("send-message", sendMessage);
        }
    }, [sendMessage]);

    useEffect(() => {
        socket.current = io("ws://localhost:5000");
        socket.current.emit("new-user-add", currentUser);
        socket.current.on("get-users", (users) => {
            setOnlineUsers(users);
        });
    }, [user]);

    useEffect(() => {
        if (socket.current) {

            if (chatId) {
                socket.current.on("recieve-message", (data) => {
                    console.log(data)
                    if (data.chatId === chatId) {
                        console.log("Vô rêciver message rồi")
                        const messageData = { _id: data._id, chatId: data.chatId, senderId: data.senderId, text: data.text, createdAt: data.createdAt };
                        console.log(messageData)
                        setMessages(prevMessages => [...prevMessages, messageData]);
                        // Nếu người gửi khác người hiện tại thì thông báo
                       

                    }
                    if (data.senderId !== currentUser) {
                        notificationSound.current.play();
                      }
                });

            }
            console.log(messages)
            // socket.current.on("server-typing", (data, content) => {
            //     setIsTyping(content === "show" ? data.accountTyping : null);
            //     setIsTypingId(content === "show" ? data.senderId : null);
            // });
            return () => {
                socket?.current?.off("recieve-message");
                socket?.current?.off("server-typing");
            };
        }
    }, [idMemberDifference, chatId]);
    console.log(userData)




    const isOnline = onlineUsers.some(user => user.userId === idMemberDifference && !user.lastActiveTime); // Người dùng không có lastActiveTime thì online

    const otherMemberData = onlineUsers.find(user => user.userId === idMemberDifference);
    console.log(idMemberDifference)
    console.log(onlineUsers)
    console.log(isOnline)
    console.log(otherMemberData)

    return (
      
        // <>Chat BOX</>
        <div className="ChatBox-container">
            {/* Chat Header */}
            <div className='chat-header'>
                <div className="d-flex align-items-center">
                    <div className="avatar-container"
                        style={{ backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdo_otMFZfKfkFiOxZZyCyNnBblvng6bO-7w&s')` }}>
                        {isOnline && (
                            <span className="online-dot" />
                        )}
                    </div>

                    <br />
                    <div className="name" style={{ fontSize: '0.8rem' }}>
                        <span>{userData?.fullName}</span>
                        <br />
                        {/* <div> {otherMemberData?.lastActiveTime}</div> */}
                        {/* <span style={{ color: isOnline ? "#51e200" : "#ccc" }}>
                               
                                {isOnline ? "Online" : `Online ${timeSinceLastActive(otherMemberData?.lastActiveTime)} trước`}
                            </span> */}
                        <span style={{ color: isOnline ? "#51e200" : "#ccc" }}>
                            {isOnline ? "Online" : (otherMemberData?.lastActiveTime ? <>
                               Online  {moment(otherMemberData?.lastActiveTime).fromNow()}</> : "Offline")} 
                        </span>

                    </div>

                </div>

            </div>

            {/* Chat Body */}
            <div className="chat-body">
                {messages?.map((message, index) => (
                    <div
                        // key={message}
                        className={message?.senderId === currentUser ? "message own" : "message"}
                    >
                        <span className='message-text'>{message?.text}</span>
                        <br />

                        <div className='time'>
                     
                       
                            {index === messages.length - 1 && (
                                // <span className="message-time">
                                //     <strong>send at</strong> {new Date(message.createdAt).toLocaleTimeString()}
                                // </span>
                                <span 
                                className={message?.senderId === currentUser ? "time-sender" : "time-receiver"}
                               
                                >
                                    <strong>Send</strong> {moment(message.createdAt).fromNow()}
                                </span>
                            )}                       
                        {/* {isTyping ? <>
                        </> : <>
                            {index === messages.length - 1 && (
                                // <span className="message-time">
                                //     <strong>send at</strong> {new Date(message.createdAt).toLocaleTimeString()}
                                // </span>
                                <span 
                                className={message?.senderId === currentUser ? "time-sender" : "time-receiver"}
                               
                                >
                                    <strong>Send</strong> {moment(message.createdAt).fromNow()}
                                </span>
                            )}
                        </>
                        } */}
                        </div>
                    
                       

                    </div>

                ))}
                {/* {isTyping && (isTypingId === userId ? (<></>) : <>
                    <div className="inner-list-typing">
                        <div className="box-typing">
                            <span className="is-typing-text">{isTyping}</span>
                            <div className="inner-dots">
                                <span className="dot"></span>
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                        </div>
                    </div></>)} */}
            </div>

            {/* Chat Sender */}
            <div className="chat-sender">
                <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    // onKeyUp={handleTyping}
                    placeholder="Type a message"
                    style={{ flex: 1 }}
                />
                <Button
                    icon={<SmileOutlined />}
                    onClick={() => setShowPicker(!showPicker)}
                    type="text"
                />
                <Button
                    type="primary"
                    icon={<SendOutlined />}
                    onClick={handleSendMessage}
                >
                    Send
                </Button>
            </div>
            {showPicker && (
                <div className="emoji-picker">
                    <EmojiPicker onEmojiClick={onEmojiClick} />
                </div>
            )}
        </div>
    );
};

export default ChatBox;