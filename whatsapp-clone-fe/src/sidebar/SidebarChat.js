import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';


const SidebarChat = ({room}) =>{

    const [seed, setSeed] = useState("")

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    return (
        <Link to={`stanza/${room._id}`}>
        <div>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}/>
                <div className='sidebarChatInfo'>
                    <h2>Nome: {room.name}</h2>
                    <p>Messaggio</p>
                </div>
            </div>
        </div>
        </Link>
    )
}

export default SidebarChat