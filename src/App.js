import React from "react"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import io from "socket.io-client"

import Chat from "./component/chat/chat"
import Home from "./component/home/home"

import "./App.scss"

const socket = io.connect("/")

function Appmain(props) {
  return (
    <>
      <div className="right">
        <Chat
          username={props.match.params.username}
          roomname={props.match.params.roomname}
          socket={socket}
        />
      </div>
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} /> {/* ROOT PATH */}
          </Route>
          <Route path="/chat/:roomname/:username" component={Appmain} />
        </Switch>
      </div>
    </Router>
  )
}

export default App
