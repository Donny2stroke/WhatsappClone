import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';
import axios from "../axios"
import { useStateValue } from '../StateProvider'

const Sidebar = () =>{

    const [rooms, setRooms] = useState([])

    const [{user}, dispatch] = useStateValue()

    useEffect(()=>{
        axios.get("/api/v1/rooms/sync").then((response) =>{
            setRooms(response.data)
        })
    },[])

    const createChat = async () =>{
        const roomName = prompt("Inserisci un nome per il canale")

        if(roomName){
            await axios.post("/api/v1/rooms", {
                name:roomName
            }).then((response) =>{
                setRooms([...rooms, response.data])
            })
        }
    }

    return(
        <div className='Sidebar'>
            <div className='sidebarHeader'>
                <div className='sidebarHeaderLeft'>
                    <IconButton>
                        <Avatar src={user.photoURL}/>
                    </IconButton>
                </div>
                <div className='sidebarHeaderRight'> 
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </div>
            </div>
            <div className='sidebarSearch'>
                <div className='sidebarSearchContainer'>
                    <SearchIcon/>
                    <input type="text" placeholder='Cerca o inizia una nuova chat'/>
                </div>
            </div>
            <div className='sidebarChatBody'>
                <div className='sidebarChat' onClick={createChat} >
                    <h3>Aggiungi nuova chat</h3>
                </div>
                {rooms.map((room, index)=>{
                    return <SidebarChat key={index} room={room}/>
                })}
            </div>
        </div>
    )
}

export default Sidebar