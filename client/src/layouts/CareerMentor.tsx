
import React, { useState, useEffect } from 'react';
import { useLocation, useOutletContext, useParams } from 'react-router-dom';

import { useAccount } from '../context/AuthContext';
import { Sidebar } from '../features/career-mentor/layout/Sidebar';
import { Workspace } from '../features/career-mentor/layout/Workspace';

interface ChatAreaProps {
  openHistory: boolean;
  mobileWidth: boolean;
  isAuthenticated: boolean;
  chatId?: string;
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  hasMessages: boolean;
  setHasMessages: React.Dispatch<React.SetStateAction<boolean>>;
  newReply: string;
  setNewReply: React.Dispatch<React.SetStateAction<string>>;
}

const ChatArea: React.FC<ChatAreaProps> = ({
  openHistory,
  mobileWidth,
  isAuthenticated,
  chatId,
  newMessage,
  setNewMessage,
  hasMessages,
  setHasMessages,
  newReply,
  setNewReply,
}) => {
  if (mobileWidth) {
    return (
      <>
        {openHistory ? (
          isAuthenticated ? <Sidebar currentChat={chatId} /> : null
        ) : (
          <Workspace
            currentChat={chatId}
            newMessage={newMessage}
            hasMessages={hasMessages}
            newReply={newReply}
            setNewMessage={setNewMessage}
            setNewReply={setNewReply}
            setHasMessages={setHasMessages}
          />
        )}
      </>
    );
  }

  return (
    <>
      {isAuthenticated && <Sidebar currentChat={chatId} />}

      <Workspace
        currentChat={chatId}
        newMessage={newMessage}
        hasMessages={hasMessages}
        newReply={newReply}
        setNewMessage={setNewMessage}
        setNewReply={setNewReply}
        setHasMessages={setHasMessages}
      />
    </>
  );
};

const CareerMentor: React.FC = () => {
  const location = useLocation();

  const {
    openHistory,
    mobileWidth,
  } = useOutletContext<{
    openHistory: boolean;
    setOpenHistory: React.Dispatch<React.SetStateAction<boolean>>;
    mobileWidth: boolean;
  }>();

  const [newMessage, setNewMessage] = useState<string>('');
  const [newReply, setNewReply] = useState<string>('');
  const [hasMessages, setHasMessages] = useState<boolean>(false);

  const { chatId } = useParams();
  const { isAuthenticated } = useAccount();

  useEffect(() => {
    if (location.state?.pendingMessage) {
      setNewMessage(location.state.pendingMessage);
      setHasMessages(true);
    }
  }, [location.state?.pendingMessage]);

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-[#F5F2EA] dark:bg-[#0F172A] overflow-hidden">
      <ChatArea
        openHistory={openHistory}
        mobileWidth={mobileWidth}
        isAuthenticated={isAuthenticated}
        chatId={chatId}
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        hasMessages={hasMessages}
        setHasMessages={setHasMessages}
        newReply={newReply}
        setNewReply={setNewReply}
      />
    </div>
  );
};

export default CareerMentor;
