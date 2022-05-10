import { useEffect, useState } from "react";
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

  useEffect(() => socketInitializer(), []);

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

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
        flexDirection: "column",
        padding: 2,
        fontSize: "0.8rem",
      }}
    >
      <h1>Chat History</h1>
      {msgList.map((msgObj) => (
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            // justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Typography
            align="left"
            color={usernameColor[msgObj.username]}
            style={{
              fontWeight: 600,
              fontSize: "0.8rem",
              margin: " 0rem 0.5rem 0rem 0rem",
            }}
          >
            {msgObj.username}
          </Typography>
          <Box>{msgObj.msg}</Box>
        </Box>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Start chatting"
          value={msg}
          onChange={onChangeHandler}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      {userSubmitted ? (
        <div>Hello {username}</div>
      ) : (
        <form onSubmit={handleUsername}>
          <input
            placeholder="Tell us your display"
            value={username}
            onChange={onChangeHandlerUserName}
          />
          <Button variant="contained" onClick={handleUsername}>
            Submit
          </Button>
        </form>
      )}
    </Box>
  );
};

export default Home;
