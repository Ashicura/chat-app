
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import React, { useState, useEffect } from 'react';
import './Sidebar.css';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';
import db from '../firebase';
import { useStateValue } from './../StateProvider';



function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot((snapshot) =>       //db.collection may be causeing a problem check later
            setRooms(
                snapshot.docs.map((doc) => ({
                id: doc.id,
                data: doc.data(),
            }))
        )
    );

    
     return () => {
         unsubscribe();
     };
        
}, []);

    return (
        <div className="sidebar">
            <div className="sidebarHead">
                <Avatar src={user?.photoURL} />
                <div className="headRight">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="sidebarSearch">     
                <div className="searchContainer">
                    <SearchOutlined />
                    <input placeholder="Search or start chat" type="text" />
                </div>
            </div>
            
            <div className="sidebarChats">
               <SidebarChat addNewChat />
               {rooms.map(room => (
                   <SidebarChat 
                   key={room.id} 
                   id={room.id}
                   name={room.data.name} 
                   />
               ))}
                
            </div>
            
        </div>
    )
}

export default Sidebar
