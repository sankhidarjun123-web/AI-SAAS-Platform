import React, { useState, useEffect } from 'react';
import { Sidebar } from '../features/career-mentor/layout/Sidebar';
import { Workspace } from '../features/career-mentor/layout/Workspace';
import { useNavigate, useParams } from 'react-router-dom';

const CareerMentor: React.FC = () => {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const [currentChat, setCurrentChat] = useState<string>(chatId || '');

  useEffect(() => {
    if(currentChat.length > 0) {
      navigate(`/career-mentor/${currentChat}`);
    }
  }, [currentChat]);

  useEffect(() => {
    
    if (chatId) {
      setCurrentChat(chatId);
    } else {
      setCurrentChat('');
    }
  }, [chatId]);

  return (
    <div className="flex h-[calc(100vh-5rem)] w-full bg-[#F5F2EA] dark:bg-[#0F172A] overflow-hidden">
      <Sidebar currentChat={currentChat} setCurrentChat={setCurrentChat} />
      <Workspace currentChat={currentChat} />
    </div>
  );
};

export default CareerMentor;