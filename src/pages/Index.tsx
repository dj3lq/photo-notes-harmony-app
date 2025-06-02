
import React, { useState } from 'react';
import PhotoGallery from '@/components/PhotoGallery';
import ChatBox from '@/components/ChatBox';
import MusicSection from '@/components/MusicSection';
import Navigation from '@/components/Navigation';

const Index = () => {
  const [activeTab, setActiveTab] = useState('gallery');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'gallery':
        return <PhotoGallery />;
      case 'chat':
        return <ChatBox />;
      case 'music':
        return <MusicSection />;
      default:
        return <PhotoGallery />;
    }
  };

  return (
    <div className="min-h-screen">
      {renderActiveComponent()}
      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default Index;
