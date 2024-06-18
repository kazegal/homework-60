import React, { useEffect, useState } from 'react';
import "../../App.css";

interface MessageInterface {
    _id: string;
    message: string;
    author: string;
    datetime: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<MessageInterface[]>([]);
    const [lastDataMessage, setLastDataMessage] = useState<string | undefined>(undefined);

    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const newMessages = await fetch(`http://146.185.154.90:8000/messages?datetime=${encodeURIComponent(lastDataMessage || '')}`);

                if (newMessages.ok) {
                    const listMessages = await newMessages.json() as MessageInterface[];
                    if (listMessages.length > 0) {
                        setMessages(prevState => [...listMessages, ...prevState]);
                        const lastMessage = listMessages[listMessages.length - 1];
                        setLastDataMessage(lastMessage.datetime);
                    }
                } else {
                    console.error('Ошибка получения нового сообщения');
                }
            } catch (e) {
                console.error('Ошибка получения нового сообщения', e);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [lastDataMessage]);

    return (
        <div className="card m-5 p-2">
            <h4 className="text-center">Chat</h4>
            {messages.map(message => (
                <div className="card p-2 m-4 text-bg-info" key={message._id}>
                    <p className="fw-bold">{message.author}:</p>
                    <p>{message.message}</p>
                    <span className="text-danger ms-auto">{message.datetime}</span>
                </div>
            ))}
        </div>
    );
};

export default Chat;
