import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import db from '../firebase';
import { Link } from 'react-router-dom';

function SidebarChat({ id, name, addNewChat }) {
    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState('');

    useEffect(() => {
        if (id) {
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot((snapshot) => 
                setMessages(snapshot.docs.map((doc) =>
                doc.data()))
            
            );
        }
    }, [id])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
    }, [])

    const createNewChat = () => {
        const roomName = prompt("Enter a chatroom name");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    };

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
             <div className="sidebarChat">
            <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`} />
            <div className="chatInfo">
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
       
    ) : (
        <div onClick={createNewChat} className="sidebarChat">
            <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat
