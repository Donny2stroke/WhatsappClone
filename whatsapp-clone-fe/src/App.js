import './App.css'
import Sidebar from './sidebar/Sidebar'
import Chat from './chat/Chat'
import Login from './auth/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useStateValue } from './StateProvider'
import {Avatar } from '@mui/material';
import { loadFromLocalStorage } from './localStore'

function App() {
  const [{user}] = useStateValue()

  return (
    <div className="app">

      {!user ? (
        <Login></Login>
      ) : (
        <div className="body">
          <Router>
            <Routes>
              <Route path="/stanza/:roomId" element={
                <>
                <Sidebar/>
                <Chat />
                </>
              }/>
              <Route path="/" element={
                <>
                <Sidebar/>
                <div className='infoCenter'>
                    <div className='infoCenterItem'>
                      <Avatar src={loadFromLocalStorage("user")?.photoURL}/>
                    </div>
                    <div className='infoCenterItem'>
                      <h3>{loadFromLocalStorage("user")?.displayName}</h3>
                    </div>
                    <div className='infoCenterItem'>
                      Seleziona una Chat
                    </div>
                </div>
                </>
              }/>
            </Routes>
          </Router>
          
        </div>
      )}
    </div>
  );
}

export default App;
