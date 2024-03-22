import React, { useState } from "react";
import {
  Card,
  CardContent,
  Collapse,
  Typography,
} from "@mui/material";
import { messageType } from "@/pages/Chat";
import "@/style/pages/Chat.css";

interface MessageItemProps {
  message: messageType;
  isOwnMessage: boolean;
}

const MessageItem: React.FC<MessageItemProps> = ({ message, isOwnMessage }) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Card sx={{
        marginLeft: isOwnMessage ? 'auto' : null,
        marginRight: isOwnMessage ? null : 'auto',
        }}
        className="message-item"
      >
        <div onClick={handleExpandClick} style={{ cursor: "pointer" }}>
          <CardContent>
            <Typography variant="h6">{message.title}</Typography>
          </CardContent>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography>{message.content}</Typography>
            </CardContent>
          </Collapse>
        </div>
      </Card>
      <Typography style={{textAlign: isOwnMessage ? "right" : "left"}} variant="body2" color="textSecondary">
        {message.userName}
      </Typography>
    </>
  );
};

export default MessageItem;
