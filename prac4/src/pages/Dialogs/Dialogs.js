import React from 'react';
import { useParams } from 'react-router-dom';
import DialogItem from '../../components/DialogItem/DialogItem';
import Message from '../../components/Message/Message';
import './Dialogs.css';

// Данные диалогов (в реальном приложении будут приходить с сервера)
const dialogsData = [
  { id: 1, name: "Lumine" },
  { id: 2, name: "Aether" },
  { id: 3, name: "Paimon" },
  { id: 4, name: "Zhongli" },
  { id: 5, name: "Raiden Shogun" }
];

// Данные сообщений для каждого диалога
const messagesData = {
  1: [
    { id: 1, author: "Lumine", text: "Привет! Как дела?", time: "10:30", isOwn: false },
    { id: 2, author: "Вы", text: "Привет! Всё отлично, спасибо!", time: "10:32", isOwn: true },
    { id: 3, author: "Lumine", text: "Пойдём исследовать новую локацию?", time: "10:33", isOwn: false },
    { id: 4, author: "Вы", text: "Конечно, с удовольствием!", time: "10:35", isOwn: true }
  ],
  2: [
    { id: 1, author: "Aether", text: "Ты видел новое обновление?", time: "14:20", isOwn: false },
    { id: 2, author: "Вы", text: "Да, там много интересного!", time: "14:22", isOwn: true },
    { id: 3, author: "Aether", text: "Согласен! Особенно новые персонажи", time: "14:25", isOwn: false }
  ],
  3: [
    { id: 1, author: "Paimon", text: "Paimon голодна!", time: "12:00", isOwn: false },
    { id: 2, author: "Вы", text: "Опять? Мы же только что поели", time: "12:01", isOwn: true },
    { id: 3, author: "Paimon", text: "Но Paimon уже всё переварила!", time: "12:02", isOwn: false }
  ],
  4: [
    { id: 1, author: "Zhongli", text: "Я расскажу вам историю...", time: "16:00", isOwn: false },
    { id: 2, author: "Вы", text: "С удовольствием послушаю", time: "16:05", isOwn: true }
  ],
  5: [
    { id: 1, author: "Raiden Shogun", text: "Вечность...", time: "18:30", isOwn: false },
    { id: 2, author: "Вы", text: "Что насчёт вечности?", time: "18:32", isOwn: true },
    { id: 3, author: "Raiden Shogun", text: "Это то, к чему я стремлюсь", time: "18:35", isOwn: false }
  ]
};

const Dialogs = () => {
  // Получаем параметр userId из URL (динамический путь)
  const { userId } = useParams();
  
  // Получаем сообщения для выбранного диалога
  const currentMessages = userId ? messagesData[userId] || [] : [];
  const currentDialog = dialogsData.find(d => d.id === parseInt(userId));

  return (
    <div className="dialogs">
      <div className="dialogs-list">
        <h2 className="dialogs-title">Мои диалоги</h2>
        <div className="dialogs-items">
          {dialogsData.map(dialog => (
            <DialogItem 
              key={dialog.id}
              name={dialog.name} 
              id={dialog.id} 
            />
          ))}
        </div>
      </div>
      
      <div className="messages-container">
        {userId ? (
          <>
            <div className="messages-header">
              <h2>{currentDialog ? currentDialog.name : 'Диалог'}</h2>
            </div>
            <div className="messages-list">
              {currentMessages.length > 0 ? (
                currentMessages.map(message => (
                  <Message
                    key={message.id}
                    author={message.author}
                    text={message.text}
                    time={message.time}
                    isOwn={message.isOwn}
                  />
                ))
              ) : (
                <div className="no-messages">Сообщений пока нет</div>
              )}
            </div>
            <div className="message-input-container">
              <input 
                type="text" 
                className="message-input" 
                placeholder="Введите сообщение..."
              />
              <button className="send-button">Отправить</button>
            </div>
          </>
        ) : (
          <div className="select-dialog">
            <p>Выберите диалог, чтобы начать общение</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Dialogs;
