import React from 'react';
import './Message.css';

// Компонент для отображения сообщения
const Message = (props) => {
  return (
    <div className={`message ${props.isOwn ? 'message-own' : 'message-other'}`}>
      <div className="message-content">
        <div className="message-author">{props.author}</div>
        <div className="message-text">{props.text}</div>
        <div className="message-time">{props.time}</div>
      </div>
    </div>
  );
}

export default Message;
