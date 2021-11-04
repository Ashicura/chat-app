import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile } from '@material-ui/icons';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import React, { useState, useEffect } from 'react';
import './Chat.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import { useStateValue } from './../StateProvider';
import firebase from 'firebase/compat/app';


function Chat() {
    const [input, setInput] = useState('');
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{user}, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        console.log('you typed >>> ', input);

        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('');
    };

    return (
        <div className="chat">
            <div className="chatHead">
               <Avatar src={`https://avatars.dicebear.com/api/bottts/${seed}.svg`}/>
               <div className="headInfo">
                    <h3>{roomName}</h3>
                    <p> last seen {' '}
                        {new Date(messages[messages.length -1]?.timestamp?.toDate()).toUTCString()}
                    </p>
               </div>
               <div className="headRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
               </div>
            </div>
            <div className="chatBody">
                {messages.map(message => (
                     <p className={`chatMessage ${message.name === user.displayName && 'chatReciever'}`}>
                     <span className="chatName">{message.name}</span>
                     {message.message}
                     <span className="chatTimestamp">
                        {new Date(message.timestamp?.toDate()).toUTCString()}    
                     </span>                 
                 </p>
                ))}
               
            </div>
            <div className="chatFooter">
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text" />
                    <button onClick={sendMessage} type="submit">Send</button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
