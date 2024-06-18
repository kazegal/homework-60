import Chat from "../../components/Chat/Chat";
import ChatForm from "../../components/ChatForm/ChatForm";
import '../../App.css';

const AppChat = () => {

    return (
        <div className="text-bg-secondary">
            <div id="preloader">
                <div className="loader">Loading...</div>
            </div>
            <h1 className="text-center text-warning">Chat</h1>
            <ChatForm />
            <Chat />
        </div>
    );
};

export default AppChat;