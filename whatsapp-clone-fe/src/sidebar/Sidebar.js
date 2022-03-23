import React from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import SearchIcon from '@mui/icons-material/Search';
import {Avatar, IconButton } from '@mui/material';
import SidebarChat from './SidebarChat';

const Sidebar = () =>{
    return(
        <div className='Sidebar'>
            <div className='sidebarHeader'>
                <div className='sidebarHeaderLeft'>
                    <IconButton>
                        <Avatar src="https://www.sapereambiente.it/wp-content/uploads/2020/05/Bradipo-gigante.jpeg"/>
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
                <SidebarChat valore="1"/>
                <SidebarChat valore="2"/>
                <SidebarChat valore="3"/>
            </div>
        </div>
    )
}

export default Sidebar