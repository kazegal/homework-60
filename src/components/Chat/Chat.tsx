import React, { useEffect, useState } from 'react';
import "../../App.css"

interface Message {
    _id: string;
    message: string;
    author: string;
    datetime: string;
}

const Chat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchMessages().catch(error => console.error(error));
    }, []);

    useEffect(() => {
        setInterval(async ()=>{
            fetchMessages().catch(error => console.error(error));
        }, 3000)
    }, []);


    const fetchMessages = async () => {
        setLoading(true);
        const url = 'http://146.185.154.90:8000/messages';
            const response = await fetch(url);
            const responseData = await response.json();
            responseData.reverse();
            setMessages(responseData);
        setLoading(false);
    };



    return (
        <div className="card m-5 p-2">
            <h4 className="text-center">Chat</h4>
            {loading ? (
                <div id="preloader">
                    <div className="loader">Loading...</div>
                </div>
            ) : (
                messages.map(message => (
                    <div className="card p-2 m-4 text-bg-info" key={message._id}>
                        <p className="fw-bold">{message.author}:</p> <p>{message.message}</p>
                        <span className="text-danger ms-auto">{message.datetime}</span>
                    </div>
                ))
            )}
        </div>
    );
};

export default Chat;
