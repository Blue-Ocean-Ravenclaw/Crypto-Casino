import { useEffect, useState } from "react";
import io from "Socket.IO-client";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

let socket;

const Home = () => {
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [userSubmitted, setUserSubmitted] = useState(false);
  const [msgList, setMsgList] = useState([]);

  useEffect(() => socketInitializer(), []);

  const socketInitializer = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("connected");
    });

    socket.on("send-msg", (msgObj) => {
      setMsgList((msgList) => [...msgList, msgObj]);
    });
  };

  const onChangeHandler = (e) => {
    setInput(e.target.value);
    // socket.emit("send-msg", e.target.value);
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    const msg = input;
    const msgObj = { username, msg };
    setMsgList((msgList) => [...msgList, msgObj]);
    socket.emit("send-msg", msgObj);
  };
  const handleUsername = (e) => {
    setUserSubmitted(true);
  };
  const onChangeHandlerUserName = (e) => {
    setUsername(e.target.value);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Chat History</h1>
      {msgList.map((msgObj) => (
        <div>
          <div>{msgObj.username}</div>
          <div>{msgObj.msg}</div>
        </div>
      ))}
      <form>
        <input
          placeholder="Type something"
          value={input}
          onChange={onChangeHandler}
        />
        <Button variant="contained" onClick={handleSubmit}>
          Submit
        </Button>
      </form>
      {userSubmitted ? (
        <div>Hello {username}</div>
      ) : (
        <form>
          <input
            placeholder="Tell us your name"
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
