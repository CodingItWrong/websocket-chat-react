import React, {useState} from 'react';
import useWebSocket from './useWebSocket';

const url = 'ws://localhost:3000';

export default function App() {
  const [messages, setMessages] = useState([]);
  const [newMessageText, setNewMessageText] = useState('');

  function onMessageReceived(newMessage) {
    setMessages([...messages, newMessage]);
  }
  const send = useWebSocket({url, onMessageReceived});

  function handleSend(e) {
    e.preventDefault();
    send(newMessageText);
    setNewMessageText('');
  }

  return (
    <>
      <form onSubmit={handleSend}>
        <input
          type="text"
          value={newMessageText}
          onChange={e => setNewMessageText(e.target.value)}
          placeholder="Enter message and press return"
        />
      </form>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </>
  );
}
