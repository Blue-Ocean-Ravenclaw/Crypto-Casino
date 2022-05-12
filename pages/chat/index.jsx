import { useEffect, useState, useRef } from "react";
import MsgDisplay from "../../components/chatMsg.jsx";
import io from "socket.io-client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let socket;

const Chat = () => {
  const [msg, setMsg] = useState("");
  const [username, setUsername] = useState("");
  const [usernameColor, setUsernameColor] = useState({});
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [msgList, setMsgList] = useState([]);
  const [userId, setUserId] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    return socketInitializer();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [msgList]);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();
    socket.on("connect", () => {
      setUserId(socket.id);
    });

    socket.on("send-msg", (msgObj) => {
      if (!usernameColor[msgObj.username]) {
        const color = randomColor();
        const currentUser = msgObj.username;
        const newUsernameColor = usernameColor;
        newUsernameColor[currentUser] = color;
        setUsernameColor(newUsernameColor);
      }
      setMsgList((msgList) => [...msgList, msgObj]);
    });
  };

  const onChangeHandler = (e) => {
    setMsg(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msgObj = { username, msg, userId };
    setMsgList((msgList) => [...msgList, msgObj]);
    socket.emit("send-msg", msgObj);
    setMsg("");
  };
  const handleUsername = (e) => {
    e.preventDefault();
    setUserSubmitted(true);
  };
  const onChangeHandlerUserName = (e) => {
    setUsername(e.target.value);
  };

  const randomColor = () => {
    let hex = Math.floor(Math.random() * 0xffffff);
    let color = "#" + hex.toString(16);
    return color;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          fontSize: "1rem",
          mb: 10,
          position: "sticky",
        }}
      >
        <h1>Chat Room</h1>

        <div
          // className="msgBox"
          style={{
            width: "85vw",
            height: "70vh",
            overflow: "scroll",
          }}
        >
          {MsgDisplay(msgList, messagesEndRef, userId, usernameColor)}
        </div>
        {userSubmitted ? (
          <form onSubmit={handleSubmit}>
            <input
              autoFocus
              style={{
                width: "80vw",
                fontSize: "1rem",
              }}
              placeholder="Start chatting"
              value={msg}
              onChange={onChangeHandler}
            />
          </form>
        ) : (
          <form onSubmit={handleUsername}>
            <input
              autoFocus
              style={{
                width: "50vw",
                fontSize: "1rem",
              }}
              placeholder="Enter your name"
              value={username}
              onChange={onChangeHandlerUserName}
            />
            <Button
              variant="contained"
              sx={{
                height: 25,
                margin: 1,
              }}
              onClick={handleUsername}
            >
              Submit
            </Button>
          </form>
        )}
      </Box>
    </>
  );
};

export default Chat;
