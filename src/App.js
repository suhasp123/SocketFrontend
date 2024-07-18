import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'

import './App.css'



const socket = io.connect("http://localhost:3001");
const App = () => {
   const [message,sendMessage]= useState();
   const Message=()=>{
    console.log("sending")
            socket.emit("message",message)
   }


   useEffect(()=>{
    socket.on("recieved", (data) => {
      alert(data);
    });
   },[socket])
  return (
    <div>
    
       <input placeholder='Message' onChange={(e)=>sendMessage(e.target.value)}/>
       <button onClick={Message}>Send Message</button>
    </div>
  )
}

export default App