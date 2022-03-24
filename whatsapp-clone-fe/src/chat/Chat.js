import React, { useEffect } from 'react'
import './Chat.css'
import {Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import { useState } from 'react';
import axios from "../axios"
import { useParams } from 'react-router-dom';

const Chat = ({messages}) =>{
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [input, setInput]= useState("")

    useEffect(()=>{
        if(roomId){
           axios.get(`/api/v1/rooms/${roomId}`).then((res)=>{
              let room = res.data.room
              setRoomName(room && room.name)
           })
        }
    }, [roomId])

    const sendMessage = async (e) =>{
        e.preventDefault();
        await axios.post("/api/v1/messages", {
            message :input,
            name : "Claudio",
            timestamp : "Now",
            received : true
        }).then()
        setInput("")
    }

    return(
        <div className='chat'>
            <div className='chatHeader'>
                <Avatar/>
                <div className='chatHeaderInfo'>
                    <h3>Nome: {roomName}</h3>
                    <p>ultima volta online</p>
                </div>
                <div className='chatHeaderRight'>
                    <IconButton>
                        <SearchIcon/>
                    </IconButton>
                    <IconButton>
                        <AttachFile/>
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>
            <div className='chatBody'>
                {messages.map((message) => {
                    return(
                        <p key={message._id} className={`chatMessage ${message.received && "chatMessaggioInviato"}`}>
                            <span className='chatNome'>
                                {message.name}
                            </span>
                            {message.message}
                            <span className='chatTimestamp'>
                                {message.timestamp}
                            </span>
                        </p>
                    )
                })}

            </div>
            <div className='chatFooter'>
                <IconButton>
                    <InsertEmoticon></InsertEmoticon>
                </IconButton>
                <form>
                    <input value={input} onChange={(e)=> setInput(e.target.value)} type="text" placeholder='Scrivi un messaggio'/>
                    <button onClick={sendMessage} type='submit'>Invia un messaggio</button>
                </form>
            </div>
        </div>
    )
}

export default Chat