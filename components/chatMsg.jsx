import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function MsgDisplay(
  msgList,
  messagesEndRef,
  userId,
  usernameColor
) {
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
  // dummy node for autoscroll
  msgDisplay.push(<div key="dummy" ref={messagesEndRef} />);
  return msgDisplay;
}
