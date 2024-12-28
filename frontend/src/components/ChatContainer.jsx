import { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore.js"
import MessageInput from "./MessageInput.jsx";
import ChatHeader from "./ChatHeader.jsx";
import MessageSkeleton from "./skeletons/MessageSkeleton.jsx";
import { useAuthStore } from "../store/useAuthStore.js";


const ChatContainer = () => {

  const { 
    selectedUser, 
    getMessages, 
    messages, 
    isMessagesLoading, 
    subscribeToMessages, 
    unsubscribeToMessages 
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Fetch and subscribe to messages when the selected user changes
  useEffect(() => {
    
      getMessages(selectedUser._id);
      subscribeToMessages();
      return () => unsubscribeToMessages();
    
  }, [selectedUser._id, getMessages, subscribeToMessages, unsubscribeToMessages]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isSameDay = date.toDateString() === now.toDateString();

    const options = {
      hour: '2-digit',
      minute: '2-digit',
    };

    if (!isSameDay) {
      options.day = '2-digit';
      options.month = 'short';
    }

    return date.toLocaleString('en-US', options);
  };

  if (isMessagesLoading) {
    return (
      <div className="flex-1">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4">
      {Array.isArray(messages) ? (
          messages.map((message) => (
            <div key={message.id} className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img
                    src={message.senderId === authUser._id ? authUser.profilePic || '/avatar.png' : selectedUser.profilePic || '/avatar.png'}
                    alt="profile picture"
                    onError={(e) => { e.target.onerror = null; e.target.src = '/avatar.png'; }} // Fallback to default avatar
                  />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">{formatTimestamp(message.createdAt)}</time>
              </div>
              <div className="chat-bubble flex flex-col">
                {message.image && (
                  <img
                    className="sm:max-w-[200px] rounded-md mb-2"
                    src={message.image}
                    alt="attachment"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
            </div>
          ))
        ) : (
          <p>No messages to display</p>
        )}
        {/* This element ensures scrolling to the bottom */}
        <div ref={messagesEndRef}></div>
      </div>
      <div className="p-4">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;