import { useEffect, useState, useRef } from "react";
import io from "Socket.IO-client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

let socket;

const Home = () => {
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
      // console.log(socket.id);
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

  const generateMsgDisplay = () => {
    const msgDisplay = [];
    msgList.forEach((msgObj, index) => {
      // handle when msg is from client
      if (msgObj.userId === userId) {
        msgDisplay.push(
          <div key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                flexDirection: "row",
                pr: 3,
              }}
            >
              <Box
                sx={{
                  pl: 3,
                }}
              >
                {msgObj.msg}
              </Box>
              <Typography
                align="left"
                color={usernameColor[msgObj.username]}
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  margin: " 0rem 0rem 0rem 0.5rem",
                }}
              >
                {msgObj.username}
              </Typography>
            </Box>
          </div>
        );
      } else {
        // handle when msg is from others
        msgDisplay.push(
          <div key={index}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                flexDirection: "row",
                pl: 3,
              }}
            >
              <Typography
                align="left"
                color={usernameColor[msgObj.username]}
                style={{
                  fontWeight: 600,
                  fontSize: "1rem",
                  margin: " 0rem 0.5rem 0rem 0rem",
                }}
              >
                {msgObj.username}
              </Typography>
              <Box
                sx={{
                  pr: 3,
                }}
              >
                {msgObj.msg}
              </Box>
            </Box>
          </div>
        );
      }
    });
    // add a dummy node for autoscroll
    msgDisplay.push(<div key="dummy" ref={messagesEndRef} />);
    return msgDisplay;
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: 2,
          fontSize: "1rem",
        }}
      >
        <h1>Chat Room</h1>
        <div
          style={{
            width: "375px",
            height: "420px",
            overflow: "scroll",
          }}
        >
          {generateMsgDisplay()}
        </div>
        {!userSubmitted ? (
          ""
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              style={{
                width: "320px",
              }}
              placeholder="Start chatting"
              value={msg}
              onChange={onChangeHandler}
            />
          </form>
        )}
        {userSubmitted ? (
          ""
        ) : (
          <form onSubmit={handleUsername}>
            <input
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

export default Home;
