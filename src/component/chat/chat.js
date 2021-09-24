// import { process } from "../../store/action/index"
import React, { useState, useEffect, useRef } from "react"
// import { useDispatch } from "react-redux"

import "./chat.scss"

function Chat({ username, roomname, socket }) {
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  // const dispatch = useDispatch()

  useEffect(() => {
    socket.on("message", (data) => {
      // dispatch(process(data.text))
      let temp = messages
      temp.push({
        userId: data.userId,
        username: data.username,
        text: data.text,
      })
      setMessages([...temp])
    })
  }, [socket])

  const sendData = () => {
    if (text !== "") {
      socket.emit("chat", text)
      setText("")
    }
  }
  const messagesEndRef = useRef(null)
  useEffect(() => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  console.log(messages, "mess")

  return (
    <div className="chat">
      <div className="user-name">
        <h2>
          {username} <span style={{ fontSize: "0.7rem" }}>in {roomname}</span>
        </h2>
      </div>
      <div className="chat-message">
        {messages.map((i, index) => {
          if (i.username === username) {
            return (
              <div className="message" key={index}>
                <p>{i.text}</p>
                <span>{i.username}</span>
              </div>
            )
          } else {
            return (
              <div className="message mess-right" key={index}>
                <p>{i.text} </p>
                <span>{i.username}</span>
              </div>
            )
          }
        })}
        <div ref={messagesEndRef} />
      </div>
      <div className="send">
        <input
          placeholder="enter your message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              sendData()
            }
          }}
        ></input>
        <button onClick={sendData}>Send</button>
      </div>
    </div>
  )
}

export default Chat
