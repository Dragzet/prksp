import React from 'react';
import { Link } from 'react-router-dom';
import './DialogItem.css';

// Компонент для отдельного элемента диалога
const DialogItem = (props) => {
  let path = "/dialogs/" + props.id;
  
  return (
    <div className="dialog-item">
      <div className="dialog-avatar">
        {props.name.charAt(0).toUpperCase()}
      </div>
      <Link to={path} className="dialog-name">
        {props.name}
      </Link>
    </div>
  );
}

export default DialogItem;
