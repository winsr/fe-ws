import React, { useState } from "react"
import "./home.scss"
import { Link } from "react-router-dom"

function HomePage({ socket }) {
  const [username, setUsername] = useState("")
  const [roomname, setRoomname] = useState("")

  const sendData = () => {
    if (username !== "" && roomname !== "") {
      socket.emit("joinRoom", { username, roomname })
    }
  }

  return (
    <div className="homepage">
      <h1>Welcome to ChatApp</h1>
      <input
        className="form-username"
        autoFocus
        placeholder="Input your user name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        className="form-room"
        placeholder="Input the room name"
        value={roomname}
        onChange={(e) => setRoomname(e.target.value)}
      ></input>
      <Link to={`/chat/${roomname}/${username}`}>
        <button className="form-button" onClick={sendData}>
          Join
        </button>
      </Link>
    </div>
  )
}

export default HomePage
