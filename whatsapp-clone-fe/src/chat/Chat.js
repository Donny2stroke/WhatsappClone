import React, { useEffect } from 'react'
import './Chat.css'
import {Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';
import { useState } from 'react';
import axios from "../axios"
import { useNavigate, useParams } from 'react-router-dom';
import { useStateValue } from '../StateProvider'
import Pusher from 'pusher-js'
import { actionTypes } from '../reducer';

const Chat = () =>{
    const {roomId} = useParams()
    const [roomName, setRoomName] = useState("")
    const [lastSeen, setLastSeen] = useState("")

    const [lastMessage, setLastMessage] = useState("")
    const [messages, setMessages] = useState([])


    const [input, setInput]= useState("")
    const [{user, rooms}, dispatch] = useStateValue()
    const history = useNavigate()

    useEffect(() =>{
        var pusher = new Pusher('4d8d1056a1b8902a2444', {
        cluster: 'eu'
        });

        var channel = pusher.subscribe(`room_${roomId}`);
        channel.bind('inserted', function(newMessage) {
        setMessages([...messages, newMessage])
        });
        return()=>{
        channel.unbind_all()
        channel.unsubscribe()
        }
    }, [messages])

    useEffect(()=>{
        if(roomId){
           axios.get(`/api/v1/rooms/${roomId}`).then((res)=>{
              let room = res.data.room
              setRoomName(room && room.name)
              axios.get(`api/v1/rooms/${roomId}/messages`).then((res)=>{
                  setMessages(res.data)
              })
              let lastMessage = messages[messages.length -1]
              setLastSeen(lastMessage?.timestamp)

              dispatch({
                  type: actionTypes.SET_ROOM,
                  _id: room._id,
                  name: room.name,
                  notify: 0,
                  lastMessage: lastMessage
                })

           }).catch((err)=>{
               setLastSeen("")
               setRoomName("")
               history("/")
           })
        }
    }, [roomId])

    const sendMessage = async (e) =>{
        e.preventDefault();
        console.log(new Date())
        await axios.post(`/api/v1/rooms/${roomId}/messages`, {
            message :input,
            name : user?.displayName,
            timestamp : new Date(),
            uid : user?.uid
        }).then()
        setInput("")
    }

    return(
        <div className='chat' key={roomId}>
            <div className='chatHeader'>
                <Avatar/>
                <div className='chatHeaderInfo'>
                    <h3>Nome: {roomName}</h3>
                    <p>Ultimo messaggio il: {lastMessage?.timestamp ? new Date(lastMessage?.timestamp ).toLocaleString() : ""}</p>
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
                        <p key={message._id} className={`chatMessage ${message.uid === user?.uid && "chatMessaggioInviato"}`}>
                            <span className='chatNome'>
                                {message.name}
                            </span>
                            {message.message}
                            <span className='chatTimestamp'>
                                {new Date(message.timestamp).toLocaleString()}
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