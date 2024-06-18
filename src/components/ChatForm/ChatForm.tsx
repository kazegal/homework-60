import React, {useState} from 'react';

const ChatForm: React.FC = () => {
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');

    const formSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const url = 'http://146.185.154.90:8000/messages';
        const data = new URLSearchParams();
        data.set('message', message);
        data.set('author', author);

        await fetch(url, {
            method: 'POST',
            body: data,
        });

        setMessage('');
        setAuthor('');

    };

    return (
        <form className="card p-3 m-5 d-flex flex-row justify-content-around" onSubmit={formSubmit}>
            <input className="m-2"
                   required
                   type="text"
                   placeholder="Author"
                   value={author}
                   onChange={(event) => setAuthor(event.target.value)}
            />
            <input className="m-2 w-50"
                   required
                   type="text"
                   placeholder="Message"
                   value={message}
                   onChange={(event) => setMessage(event.target.value)}
            />
            <button className="btn btn-success" type="submit">Send</button>
        </form>
    );
};

export default ChatForm;
