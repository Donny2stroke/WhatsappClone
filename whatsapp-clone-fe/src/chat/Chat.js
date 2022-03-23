import React from 'react'
import './Chat.css'
import {Avatar, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AttachFile from '@mui/icons-material/AttachFile';
import MoreVert from '@mui/icons-material/MoreVert';
import InsertEmoticon from '@mui/icons-material/InsertEmoticon';

const Chat = () =>{
    return(
        <div className='chat'>
            <div className='chatHeader'>
                <Avatar/>
                <div className='chatHeaderInfo'>
                    <h3>Nome</h3>
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
                <p className='chatMessage'>
                    <span className='chatNome'>
                        NOME
                    </span>
                    Messaggio
                    <span className='chatTimestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className='chatMessage chatMessaggioInviato'>
                    <span className='chatNome'>
                        NOME
                    </span>
                    Messaggio
                    <span className='chatTimestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
                <p className='chatMessage'>
                    <span className='chatNome'>
                        NOME
                    </span>
                    Messaggio
                    <span className='chatTimestamp'>
                        {new Date().toUTCString()}
                    </span>
                </p>
            </div>
            <div className='chatFooter'>
                <IconButton>
                    <InsertEmoticon></InsertEmoticon>
                </IconButton>
                <form>
                    <input type="text" placeholder='Scrivi un messaggio'/>
                    <button type='submit'>Invia un messaggio</button>
                </form>
            </div>
        </div>
    )
}

export default Chat