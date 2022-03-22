import React from 'react'
import './Sidebar.css'
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DonutLargeIcon from '@mui/icons-material/DonutLarge'
import {Avatar, IconButton } from '@mui/material';

const Sidebar = () =>{
    return(
        <div className='Sidebar'>
            <div className='sidebarHeader'>
                <div className='sidebarHeaderLeft'>
                    <Avatar src="https://www.sapereambiente.it/wp-content/uploads/2020/05/Bradipo-gigante.jpeg"/>
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
        </div>
    )
}

export default Sidebar