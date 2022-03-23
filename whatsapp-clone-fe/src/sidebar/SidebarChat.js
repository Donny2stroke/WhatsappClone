import React from 'react'
import './SidebarChat.css'
import {Avatar, IconButton } from '@mui/material';

const SidebarChat = ({valore}) =>{
    return(
        <div>
            <div className='sidebarChat'>
                <Avatar/>
                <div className='sidebarChatInfo'>
                    <h2>Nome {valore}</h2>
                    <p>Messaggio</p>
                </div>
            </div>
        </div>
    )
}

export default SidebarChat