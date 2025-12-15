import React from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import ChatPage from './Components/ChatPage'
import TextInput from './Components/TextInput'
const App = () => {
  return (
    <div>
      <Navbar />
      <ChatPage />
      <TextInput />
    </div>
  )
}

export default App