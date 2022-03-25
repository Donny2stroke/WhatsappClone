import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import {Avatar, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';


const SidebarChat = ({room}) =>{

    const [seed, setSeed] = useState("")
    const [ultimoMessaggio, setUltimoMessaggio] = useState("")

    useEffect(()=>{
        let ultimoMessaggio = (room?.messages 
            && room.messages[room.messages.length -1]
            && room.messages[room.messages.length -1].message || "-")
        let messaggioTroncato = ultimoMessaggio.length > 20 ? `${ultimoMessaggio.substr(0,5)}...` : ultimoMessaggio
        setUltimoMessaggio(messaggioTroncato)
    },[])
    
    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    return (
        <Link to={`stanza/${room._id}`}>
        <div className='sidebarChat'>
            <div className='sidebarChatLeft'>
                <Avatar src={`https://avatars.dicebear.com/api/adventurer/${seed}.svg`}/>
                <div className='sidebarChatInfo'>
                    <h2>Nome: {room.name}</h2>
                    <p>{ultimoMessaggio}</p>
                </div>
            </div>
            {/*<div className='sidebarChatRight'>
                <p>1</p>
            </div> */}
        </div>
        </Link>
    )
}

export default SidebarChat