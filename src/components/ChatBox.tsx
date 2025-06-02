
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MessageSquare } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'partner';
  timestamp: Date;
}

const ChatBox = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'I love how we can share our memories here 💕',
      sender: 'partner',
      timestamp: new Date(Date.now() - 3600000)
    },
    {
      id: '2',
      text: 'Me too! This is our special place ✨',
      sender: 'me',
      timestamp: new Date(Date.now() - 1800000)
    },
    {
      id: '3',
      text: 'That photo from our coffee date still makes me smile 😊',
      sender: 'partner',
      timestamp: new Date(Date.now() - 900000)
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        text: newMessage,
        sender: 'me',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-romantic p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 via-rose-500 to-purple-600 bg-clip-text text-transparent mb-2 flex items-center justify-center gap-2">
            <MessageSquare className="w-8 h-8 text-pink-500" />
            Our Private Chat
          </h1>
          <p className="text-muted-foreground">Just for us two 💑</p>
        </div>

        {/* Chat Container */}
        <Card className="glass-effect h-[600px] flex flex-col">
          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id}
                className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[70%] p-3 rounded-2xl animate-fade-in ${
                    message.sender === 'me' 
                      ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white' 
                      : 'bg-white border border-pink-200 text-gray-800'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.sender === 'me' ? 'text-pink-100' : 'text-gray-500'
                  }`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-pink-200">
            <div className="flex gap-2">
              <Input
                placeholder="Send a sweet message... 💕"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1 border-pink-200 focus:border-pink-400"
              />
              <Button 
                onClick={sendMessage}
                className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600"
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ChatBox;
