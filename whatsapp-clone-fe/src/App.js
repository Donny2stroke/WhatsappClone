import './App.css';
import Sidebar from './sidebar/Sidebar';
import Chat from './chat/Chat';
import Pusher from 'pusher-js'
import { useEffect, useState } from 'react';
import axios from "./axios"
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

function App() {
  const [messages, setMessages] = useState([])


  useEffect(() =>{
    axios.get("/api/v1/messages/sync").then(response =>{
      setMessages(response.data)
    })
  }, [])

  useEffect(() =>{
    var pusher = new Pusher('4d8d1056a1b8902a2444', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });
    return()=>{
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])
  return (
    <div className="app">
      <div className="body">
        <Router>
          <Sidebar/>
          <Routes>
            <Route path="/stanza/:roomId" element={
              <>
              <Chat messages={messages}/>
              </>
            }/>
            <Route path="/" element={<h1>DASHBOARD</h1>}/>
          </Routes>
        </Router>
        
      </div>
    </div>
  );
}

export default App;
