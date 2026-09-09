import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAccount } from '../context/AuthContext';
import { Sidebar } from '../features/career-mentor/layout/Sidebar';
import { Workspace } from '../features/career-mentor/layout/Workspace';
import { useParams } from 'react-router-dom';

const CareerMentor: React.FC = () => {

  const location = useLocation();
  const [newMessage, setNewMessage] =
    useState<string>('');

  const [newReply, setNewReply] =
    useState<string>('');

  const [hasMessages, setHasMessages] =
    useState<boolean>(false);

  useEffect(() => {
    if (location.state?.pendingMessage) {
      // setNewMessage(location.state.pendingMessage);
      // setHasMessages(true);

      // Send API request here if needed
    }
  }, [location.state?.pendingMessage]);
  const { chatId } = useParams();
  const { isAuthenticated } = useAccount();
  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-[#F5F2EA] dark:bg-[#0F172A] overflow-hidden">
      {isAuthenticated && <Sidebar currentChat={chatId} />}
      <Workspace currentChat={chatId} newMessage={newMessage} hasMessages={hasMessages} newReply={newReply} setNewMessage={setNewMessage} setNewReply={setNewReply} setHasMessages={setHasMessages} />
    </div>
  );
};

export default CareerMentor;